"""Render 2D structures for the homepage quiz and the team's favorite molecules.

Writes one SVG per molecule to public/images/molecules/<slug>.svg,
cropped to the drawing so it fills its box on the page.
Reference them in lib/content/*.ts as structure("<slug>").

Usage:
    pip install rdkit
    python scripts/render-structures.py

SMILES are from PubChem unless noted. To add a molecule, add a line below and rerun.
"""

import math
import re
from itertools import combinations
from pathlib import Path

from rdkit import Chem
from rdkit.Geometry import Point3D
from rdkit.Chem import rdDepictor
from rdkit.Chem.Draw import rdMolDraw2D

MOLECULES = {
    "creatine": "CN(CC(=O)O)C(=N)N",
    "lac-phe": "C[C@@H](C(=O)N[C@@H](CC1=CC=CC=C1)C(=O)O)O",
    "melatonin": "CC(=O)NCCC1=CNC2=C1C=C(C=C2)OC",
    "taurine": "C(CS(=O)(=O)O)N",
    "cholesterol": "C[C@H](CCCC(C)C)[C@H]1CC[C@@H]2[C@@]1(CC[C@H]3[C@H]2CC=C4[C@@]3(CC[C@@H](C4)O)C)C",
    "uric-acid": "C12=C(NC(=O)N1)NC(=O)NC2=O",
    "tmao": "C[N+](C)(C)[O-]",
    "homocysteine": "C(CS)[C@@H](C(=O)O)N",
    "resveratrol": "C1=CC(=CC=C1/C=C/C2=CC(=CC(=C2)O)O)O",
    "quercetin": "C1=CC(=C(C=C1C2=C(C(=O)C3=C(C=C(C=C3O2)O)O)O)O)O",
    "urolithin-a": "C1=CC2=C(C=C1O)C(=O)OC3=C2C=CC(=C3)O",
    "capsaicin": "CC(C)/C=C/CCCCC(=O)NCC1=CC(=C(C=C1)O)OC",
    "metformin": "CN(C)C(=N)N=C(N)N",
    "aspirin": "CC(=O)OC1=CC=CC=C1C(=O)O",
    "ibuprofen": "CC(C)CC1=CC=C(C=C1)C(C)C(=O)O",
    "levodopa": "C1=CC(=C(C=C1C[C@@H](C(=O)O)N)O)O",
    "glucose": "C([C@@H]1[C@H]([C@@H]([C@H](C(O1)O)O)O)O)O",
    "beta-hydroxybutyrate": "C[C@H](CC(=O)O)O",
    "alanine": "C[C@@H](C(=O)O)N",
    "palmitic-acid": "CCCCCCCCCCCCCCCC(=O)O",
    # Team favorite molecules
    "cholesterol-phosphoethanolamine": "C[C@H](CCCC(C)C)[C@H]1CC[C@@H]2[C@@]1(CC[C@H]3[C@H]2CC=C4[C@@]3(CC[C@@H](C4)OP(=O)(O)OCCN)C)C",  # CID 24802051
    "pfbs": "C(C(C(F)(F)S(=O)(=O)O)(F)F)(C(F)(F)F)(F)F",
    "oxytocin": "CC[C@H](C)[C@H]1C(=O)N[C@H](C(=O)N[C@H](C(=O)N[C@@H](CSSC[C@@H](C(=O)N[C@H](C(=O)N1)CC2=CC=C(C=C2)O)N)C(=O)N3CCC[C@H]3C(=O)N[C@@H](CC(C)C)C(=O)NCC(=O)N)CC(=O)N)CCC(=O)N",
    "nad": "C1=CC(=C[N+](=C1)[C@H]2[C@@H]([C@@H]([C@H](O2)COP(=O)([O-])OP(=O)(O)OC[C@@H]3[C@H]([C@H]([C@@H](O3)N4C=NC5=C(N=CN=C54)N)O)O)O)O)C(=O)N",
    "phenethyl-alcohol": "C1=CC=C(C=C1)CCO",
    "dopamine": "C1=CC(=C(C=C1CCN)O)O",
}

# A 2D drawing of C60 from SMILES is unreadable, so it is drawn as a cage instead.
FULLERENE = "buckminsterfullerene"

# Large canvas so no molecule is shrunk; each SVG is cropped afterwards.
WIDTH, HEIGHT = 1400, 900
CROP_MARGIN = 3

# Site ink for carbon/bonds, softened CPK colors for heteroatoms.
ATOM_COLORS = {
    1: (0.125, 0.125, 0.114),
    6: (0.125, 0.125, 0.114),
    7: (0.18, 0.37, 0.65),
    8: (0.75, 0.22, 0.17),
    9: (0.2, 0.52, 0.3),
    15: (0.8, 0.42, 0.06),
    16: (0.72, 0.53, 0.04),
}
INK = "#1F1F1D"
SAGE = "#58766C"

OUTPUT_DIR = Path(__file__).resolve().parent.parent / "public" / "images" / "molecules"


# Fixed layouts for ring systems people expect in a set orientation. Atom-map numbers
# follow steroid numbering; coordinates are in bond lengths (y up).
STEROID_CORE = (
    "[#6:1]1~[#6:2]~[#6:3]{c3}~[#6:4]~[#6:5]2~[#6:6]~[#6:7]~[#6:8]3~[#6:9]"
    "(~[#6:11]~[#6:12]~[#6:13]4~[#6:17]~[#6:16]~[#6:15]~[#6:14]~3~4)~[#6:10]~1~2"
)
STEROID_COORDS = {
    1: (0, 1), 2: (-0.866, 0.5), 3: (-0.866, -0.5), 4: (0, -1), 5: (0.866, -0.5), 6: (1.732, -1),
    7: (2.598, -0.5), 8: (2.598, 0.5), 9: (1.732, 1), 10: (0.866, 0.5), 11: (1.732, 2), 12: (2.598, 2.5),
    13: (3.464, 2), 14: (3.464, 1), 15: (4.415, 0.691), 16: (5.003, 1.5), 17: (4.415, 2.309),
}
# Ring-fusion H directions (8-beta up, 5/9/14-alpha down). The three ring bonds around
# these carbons leave no open side, so RDKit would otherwise place the H arbitrarily.
STEROID_HYDROGENS = {5: (0, -1), 8: (0, 1), 9: (0, -1), 14: (0, -1)}
# 3-O-phosphoethanolamine pointing left from ring A.
PHOSPHOETHANOLAMINE = "(-[#8:18]-[#15:19](=[#8:20])(-[#8;H1:21])-[#8:22]-[#6:23]-[#6:24]-[#7:25])"
PHOSPHOETHANOLAMINE_COORDS = {
    18: (-1.732, -1), 19: (-2.598, -0.5), 20: (-3.464, 0), 21: (-2.098, 0.366), 22: (-3.098, -1.366),
    23: (-3.964, -0.866), 24: (-4.83, -1.366), 25: (-5.696, -0.866),
}


def template(smarts: str, coords: dict[int, tuple[float, float]]) -> Chem.Mol:
    query = Chem.MolFromSmarts(smarts)
    query.UpdatePropertyCache(strict=False)
    conf = Chem.Conformer(query.GetNumAtoms())
    for atom in query.GetAtoms():
        x, y = coords[atom.GetAtomMapNum()]
        conf.SetAtomPosition(atom.GetIdx(), Point3D(x * 1.5, y * 1.5, 0))
    query.AddConformer(conf, assignId=True)
    return query


# Most specific first.
TEMPLATES = [
    template(STEROID_CORE.format(c3=PHOSPHOETHANOLAMINE), STEROID_COORDS | PHOSPHOETHANOLAMINE_COORDS),
    template(STEROID_CORE.format(c3=""), STEROID_COORDS),
]

PATH_DATA = re.compile(r"\sd='([^']*)'", re.S)
NUMBER = re.compile(r"-?\d+(?:\.\d+)?")
SIZE = re.compile(r"width='[^']*' height='[^']*' viewBox='[^']*'")


def lay_flat(mol: Chem.Mol) -> None:
    # Turn the drawing in 30 degree steps (keeps ring bonds straight) to its
    # flattest orientation, so it fills the wide option boxes.
    conf = mol.GetConformer()
    points = [(position[0], position[1]) for position in conf.GetPositions()]

    def height(angle: float) -> float:
        ys = [x * math.sin(angle) + y * math.cos(angle) for x, y in points]
        return max(ys) - min(ys)

    angle = min((math.radians(degrees) for degrees in range(0, 180, 30)), key=height)
    if height(angle) > 0.9 * height(0):
        return

    for index, (x, y) in enumerate(points):
        conf.SetAtomPosition(
            index,
            Point3D(x * math.cos(angle) - y * math.sin(angle), x * math.sin(angle) + y * math.cos(angle), 0),
        )


def crop(svg: str) -> str:
    # RDKit writes every bond and glyph as a path of absolute x,y pairs.
    xs: list[float] = []
    ys: list[float] = []
    for data in PATH_DATA.findall(svg):
        numbers = [float(number) for number in NUMBER.findall(data)]
        xs += numbers[0::2]
        ys += numbers[1::2]

    left = min(xs) - CROP_MARGIN
    top = min(ys) - CROP_MARGIN
    width = max(xs) + CROP_MARGIN - left
    height = max(ys) + CROP_MARGIN - top
    size = f"width='{width:.0f}px' height='{height:.0f}px' viewBox='{left:.1f} {top:.1f} {width:.1f} {height:.1f}'"
    return SIZE.sub(size, svg, count=1)


def place_steroid_hydrogens(mol: Chem.Mol, layout: Chem.Mol) -> None:
    # mol already has its chiral Hs (from PrepareMolForDrawing); move them, then redo the wedges.
    match = dict(zip((atom.GetAtomMapNum() for atom in layout.GetAtoms()), mol.GetSubstructMatch(layout)))
    conf = mol.GetConformer()
    bond_length = (conf.GetAtomPosition(match[8]) - conf.GetAtomPosition(match[9])).Length()
    for number, (dx, dy) in STEROID_HYDROGENS.items():
        carbon = mol.GetAtomWithIdx(match[number])
        for neighbor in carbon.GetNeighbors():
            if neighbor.GetAtomicNum() == 1:
                position = conf.GetAtomPosition(carbon.GetIdx())
                conf.SetAtomPosition(
                    neighbor.GetIdx(), Point3D(position.x + dx * bond_length, position.y + dy * bond_length, 0)
                )

    for bond in mol.GetBonds():
        bond.SetBondDir(Chem.BondDir.NONE)
    Chem.WedgeMolBonds(mol, conf)


def render(smiles: str) -> str:
    mol = Chem.MolFromSmiles(smiles)
    layout = next((query for query in TEMPLATES if mol.HasSubstructMatch(query)), None)
    if layout:
        rdDepictor.GenerateDepictionMatching2DStructure(mol, layout, refPatt=layout)
    else:
        rdDepictor.Compute2DCoords(mol)
        lay_flat(mol)

    mol = rdMolDraw2D.PrepareMolForDrawing(mol)
    if layout:
        place_steroid_hydrogens(mol, layout)

    drawer = rdMolDraw2D.MolDraw2DSVG(WIDTH, HEIGHT)
    options = drawer.drawOptions()
    options.clearBackground = False
    options.fixedBondLength = 44
    options.bondLineWidth = 2
    options.padding = 0.08
    options.minFontSize = 15
    options.updateAtomPalette(ATOM_COLORS)
    options.prepareMolsBeforeDrawing = False

    drawer.DrawMolecule(mol)
    drawer.FinishDrawing()
    return crop(drawer.GetDrawingText())


def render_fullerene() -> str:
    # Truncated icosahedron (edge length 2): cyclic permutations of these points.
    phi = (1 + 5**0.5) / 2
    vertices = set()
    for base in [(0, 1, 3 * phi), (1, 2 + phi, 2 * phi), (phi, 2, phi**3)]:
        for signs in [(a, b, c) for a in (1, -1) for b in (1, -1) for c in (1, -1)]:
            point = [value * sign for value, sign in zip(base, signs)]
            for shift in range(3):
                vertices.add(tuple(round(point[(index + shift) % 3], 6) for index in range(3)))
    vertices = sorted(vertices)
    edges = [(i, j) for i, j in combinations(range(60), 2) if abs(math.dist(vertices[i], vertices[j]) - 2) < 1e-3]
    assert len(vertices) == 60 and len(edges) == 90

    # Pentagons sit around the 12 icosahedron directions (cyclic permutations of (0, +-1, +-phi)).
    directions = set()
    for b in (1, -1):
        for c in (phi, -phi):
            for shift in range(3):
                directions.add(tuple([0, b, c][(index + shift) % 3] for index in range(3)))

    # Face a pentagon toward the viewer, then tilt so the cage reads as 3D.
    def rotate(point, axis, angle):
        x, y, z = point
        cos, sin = math.cos(angle), math.sin(angle)
        if axis == "x":
            return (x, y * cos - z * sin, y * sin + z * cos)
        return (x * cos + z * sin, y, -x * sin + z * cos)

    def view(point):
        point = rotate(point, "x", math.atan2(1, phi))
        point = rotate(point, "x", math.radians(-18))
        return rotate(point, "y", math.radians(14))

    projected = [view(vertex) for vertex in vertices]
    scale = 13
    xy = [(x * scale, -y * scale) for x, y, _ in projected]
    depth = [z for _, _, z in projected]

    back, front = [], []
    for i, j in edges:
        line = f"M {xy[i][0]:.1f},{xy[i][1]:.1f} L {xy[j][0]:.1f},{xy[j][1]:.1f}"
        (front if depth[i] + depth[j] > 0 else back).append(line)

    pentagons = []
    for direction in directions:
        center = view(direction)
        if center[2] <= 0.2:
            continue
        ring = sorted(range(60), key=lambda index: -sum(a * b for a, b in zip(vertices[index], direction)))[:5]
        cx = sum(xy[index][0] for index in ring) / 5
        cy = sum(xy[index][1] for index in ring) / 5
        ring.sort(key=lambda index: math.atan2(xy[index][1] - cy, xy[index][0] - cx))
        pentagons.append("M " + " L ".join(f"{xy[index][0]:.1f},{xy[index][1]:.1f}" for index in ring) + " Z")

    left = min(x for x, _ in xy) - CROP_MARGIN
    top = min(y for _, y in xy) - CROP_MARGIN
    width = max(x for x, _ in xy) + CROP_MARGIN - left
    height = max(y for _, y in xy) + CROP_MARGIN - top
    return "\n".join(
        [
            f"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='{width:.0f}px' height='{height:.0f}px' viewBox='{left:.1f} {top:.1f} {width:.1f} {height:.1f}'>",
            f"<path d='{' '.join(back)}' style='fill:none;stroke:{INK};stroke-opacity:0.2;stroke-width:1.5px;stroke-linecap:round' />",
            f"<path d='{' '.join(pentagons)}' style='fill:{SAGE};fill-opacity:0.22;stroke:none' />",
            f"<path d='{' '.join(front)}' style='fill:none;stroke:{INK};stroke-width:2px;stroke-linecap:round;stroke-linejoin:round' />",
            "</svg>",
            "",
        ]
    )


def main() -> None:
    rdDepictor.SetPreferCoordGen(True)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    for slug, smiles in MOLECULES.items():
        (OUTPUT_DIR / f"{slug}.svg").write_text(render(smiles))
        print(f"wrote {slug}.svg")

    (OUTPUT_DIR / f"{FULLERENE}.svg").write_text(render_fullerene())
    print(f"wrote {FULLERENE}.svg")


if __name__ == "__main__":
    main()

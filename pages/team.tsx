import { ArrowRight, CalendarDays, Mail, UserPlus } from "lucide-react";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { optimize } from "svgo";
import { FavoriteMolecule, MoleculeDialog } from "@/components/FavoriteMolecule";
import { PageIntro } from "@/components/PageIntro";
import { PersonAvatar } from "@/components/PersonAvatar";
import { ProfileLinkIcon } from "@/components/ProfileLinkIcon";
import { members, type Member, type ProfileEntry, type ProfileLink } from "@/lib/content";
import { staticPageHref } from "@/lib/site-paths";

const groups = ["Postdocs", "PhD Students", "Master's Students", "Undergraduate Students", "Alumni"] as const;

type MoleculePreviews = Record<string, string>;

// Embed only the structures used on this page so the first hover needs no network request.
export async function getStaticProps() {
  const previews: MoleculePreviews = {};
  for (const member of members) {
    const src = member.favoriteMolecule?.structure;
    if (!src?.startsWith("/images/molecules/") || !src.endsWith(".svg") || previews[src]) continue;
    const svg = await readFile(path.join(process.cwd(), "public", src), "utf8");
    previews[src] = "data:image/svg+xml," + encodeURIComponent(optimize(svg).data);
  }
  return { props: { previews } };
}

function MemberContactLinks({
  email,
  links,
  className = ""
}: {
  email?: string;
  links?: ProfileLink[];
  className?: string;
}) {
  if (!email && !links?.length) {
    return null;
  }

  return (
    <div className={`mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 ${className}`}>
      {email ? (
        <a
          href={`mailto:${email}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-fudan transition hover:text-ink"
        >
          <Mail aria-hidden="true" size={16} />
          {email}
        </a>
      ) : null}
      {links?.slice(0, 4).map((link) => {
        const isInternal = link.href.startsWith("/");
        const linkClassName = "inline-flex items-center gap-2 text-sm font-semibold text-fudan transition hover:text-ink";
        const linkContent = (
          <>
            {!isInternal ? <ProfileLinkIcon label={link.label} /> : null}
            {link.label}
          </>
        );

        return (
          <a key={link.href} href={staticPageHref(link.href)} className={linkClassName}>
            {linkContent}
          </a>
        );
      })}
    </div>
  );
}

function CareerSummary({ entries }: { entries?: ProfileEntry[] }) {
  if (!entries?.length) {
    return null;
  }

  return (
    <div className="grid gap-3 text-left">
      {entries.map((entry) => (
        <article key={`${entry.period}-${entry.institution}`} className="border-l-2 border-line pl-3">
          <p className="text-xs font-semibold tabular-nums text-muted">{entry.period}</p>
          <p className="mt-0.5 text-sm leading-5">
            <span className="font-semibold text-ink">{entry.title}</span>
            <span className="text-muted">, {entry.institution}</span>
          </p>
        </article>
      ))}
    </div>
  );
}

// A reserved seat in a group that is still recruiting (isOpenPosition in team.ts).
function OpenPosition({ member }: { member: Member }) {
  const link = member.links?.[0];

  return (
    <article className="grid gap-7 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-8">
      <div className="flex justify-center sm:justify-start">
        <div className="flex size-32 items-center justify-center rounded-full border-2 border-dashed border-[color-mix(in_srgb,var(--color-fudan)_35%,var(--color-line))] bg-white text-fudan">
          <UserPlus aria-hidden="true" size={36} strokeWidth={1.75} />
        </div>
      </div>
      <div className="flex min-w-0 flex-col items-center text-center sm:items-start sm:text-left">
        <h3 className="text-2xl font-semibold tracking-normal text-ink">{member.name}</h3>
        {member.role ? (
          <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[color-mix(in_srgb,var(--color-fudan)_9%,white)] px-2.5 py-1 text-xs font-semibold text-fudan">
            <span className="size-1.5 animate-pulse rounded-full bg-fudan" aria-hidden="true" />
            {member.role}
          </p>
        ) : null}
        {member.bio ? <p className="mt-3 text-sm leading-6 text-muted">{member.bio}</p> : null}
        {link ? (
          <a
            href={staticPageHref(link.href)}
            className="mt-4 inline-flex shrink-0 items-center gap-1.5 rounded-full border border-fudan bg-fudan px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[color-mix(in_srgb,var(--color-fudan)_85%,black)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fudan"
          >
            {link.label}
            <ArrowRight aria-hidden="true" size={14} />
          </a>
        ) : null}
      </div>
    </article>
  );
}

function MemberProfile({ member, previews, compact = false }: { member: Member; previews: MoleculePreviews; compact?: boolean }) {
  return (
    <article
      className={`grid gap-7 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-8 ${
        compact ? "" : "lg:grid-cols-[8rem_17rem_minmax(0,1fr)]"
      }`}
    >
      <div className="flex justify-center sm:justify-start">
        <PersonAvatar name={member.name} image={member.image} size="xl" priority={member.group === "Principal Investigator"} />
      </div>
      <div
        className={`flex min-w-0 flex-col items-center text-center sm:items-start sm:text-left ${
          member.careerSummary?.length || compact ? "" : "lg:col-span-2"
        }`}
      >
        <h3 className="text-2xl font-semibold tracking-[-0.015em] text-ink">
          {member.name}
          {member.chineseName ? (
            <span lang="zh-Hans" className="font-cjk ml-3 text-lg font-normal text-muted">
              {member.chineseName}
            </span>
          ) : null}
        </h3>
        {member.role ? <p className="mt-2 text-sm font-medium leading-6 text-muted">{member.role}</p> : null}
        {member.joinedLabel || member.joinedDate || member.favoriteMolecule ? (
          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 sm:justify-start">
            {member.joinedLabel || member.joinedDate ? (
              <p className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-muted">
                <CalendarDays aria-hidden="true" size={14} className="text-fudan" />
                {member.joinedLabel ?? `Joined ${member.joinedDate}`}
              </p>
            ) : null}
            {member.favoriteMolecule && (
              <FavoriteMolecule molecule={member.favoriteMolecule} owner={member.name} preview={previews[member.favoriteMolecule.structure]} />
            )}
          </div>
        ) : null}
        {member.bio ? <p className="mt-3 text-sm leading-6 text-muted">{member.bio}</p> : null}
        <MemberContactLinks
          email={member.email}
          links={member.links}
          className="justify-center sm:justify-start"
        />
        {member.profileHref ? (
          <a
            href={staticPageHref(member.profileHref)}
            className="editorial-link group mt-5 shrink-0"
          >
            <span>View full profile</span>
            <ArrowRight aria-hidden="true" size={14} className="transition group-hover:translate-x-1" />
          </a>
        ) : null}
      </div>
      {member.careerSummary?.length ? (
        <div className="sm:col-span-2 lg:col-span-1">
          <CareerSummary entries={member.careerSummary} />
        </div>
      ) : null}
    </article>
  );
}

export default function MembersPage({ previews }: { previews: MoleculePreviews }) {
  return (
    <>
      <PageIntro
        eyebrow="Our Team"
        title="All Members"
        description="We aim to build a diverse group of researchers working across metabolomics/exposomics, computation, and biochemistry."
      />

      <section className="mx-auto max-w-7xl px-5 pb-12 pt-8 sm:px-8 lg:pb-16 lg:pt-10">
        <div className="grid gap-12">
          {members
            .filter((member) => member.group === "Principal Investigator")
            .map((member) => (
              <section key={member.name}>
                <div className="flex items-center gap-4">
                  <h2 className="shrink-0 text-2xl font-semibold tracking-[-0.015em] text-ink">Principal Investigator</h2>
                  <span className="h-px flex-1 bg-line" />
                </div>
                <div className="mt-6 w-full max-w-5xl">
                  <MemberProfile member={member} previews={previews} />
                </div>
              </section>
            ))}

          {groups.map((group) => {
            const groupMembers = members.filter((member) => member.group === group);
            const isStudentGroup = group.endsWith("Students");

            if (groupMembers.length === 0) {
              return null;
            }

            return (
              <section key={group}>
                <div className="flex items-center gap-4">
                  <h2 className="shrink-0 text-2xl font-semibold tracking-[-0.015em] text-ink">{group}</h2>
                  <span className="h-px flex-1 bg-line" />
                </div>
                <div className={`mt-6 grid gap-10 ${isStudentGroup ? "lg:grid-cols-2" : ""}`}>
                  {groupMembers.map((member, index) =>
                    member.isOpenPosition ? (
                      <OpenPosition key={`${member.group}-${member.name}-${index}`} member={member} />
                    ) : (
                      <MemberProfile
                        key={`${member.group}-${member.name}-${index}`}
                        member={member}
                        previews={previews}
                        compact={isStudentGroup}
                      />
                    )
                  )}
                </div>
              </section>
            );
          })}

          <MoleculeDialog />
        </div>
      </section>
    </>
  );
}

export const config = { runtime: "nodejs", unstable_runtimeJS: false };

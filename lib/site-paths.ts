const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string) {
  if (!basePath || !path.startsWith("/") || path === basePath || path.startsWith(`${basePath}/`)) {
    return path;
  }

  if (path === "/") {
    return basePath;
  }

  return `${basePath}${path}`;
}

export function withoutBasePath(path: string) {
  if (!basePath) {
    return path;
  }

  if (path === basePath) {
    return "/";
  }

  if (path.startsWith(`${basePath}/`)) {
    return path.slice(basePath.length);
  }

  return path;
}

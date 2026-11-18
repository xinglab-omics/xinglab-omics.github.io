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

export const labMarkSrc = withBasePath("/images/branding/xing-lab-mark.svg");

// Exported pages are directories. Request their canonical URL in a single round trip.
export function staticPageHref(href: string) {
  if (!href.startsWith("/") || href.startsWith("//")) {
    return href;
  }

  const suffixIndex = href.search(/[?#]/);
  const path = suffixIndex < 0 ? href : href.slice(0, suffixIndex);
  const suffix = suffixIndex < 0 ? "" : href.slice(suffixIndex);
  const sitePath = withBasePath(path);
  return (/\/[^/]+\.[^/]+$/.test(path) ? sitePath : sitePath.replace(/\/?$/, "/")) + suffix;
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

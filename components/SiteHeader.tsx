import { Fragment } from "react";
import { SiteImage } from "@/components/SiteImage";
import { ChevronDown, Menu, X } from "lucide-react";
import { navigation, type NavigationItem } from "@/lib/content/navigation";
import { labMarkSrc, staticPageHref } from "@/lib/site-paths";

// Native page links can be used while React is still downloading.
const navigationFeedback = `{
  const status = document.getElementById("page-navigation-status");
  const header = status.closest("header");
  function closeMenus(event) {
    if (event.type === "keydown" && event.key !== "Escape") return;
    for (const menu of header.querySelectorAll("details[open]")) {
      if (event.type === "pointerdown" && menu.contains(event.target)) continue;
      if (event.type === "keydown" && menu.contains(document.activeElement)) {
        menu.querySelector("summary")?.focus();
      }
      menu.open = false;
    }
  }
  document.addEventListener("pointerdown", closeMenus);
  document.addEventListener("keydown", closeMenus);
  let timeout;
  function clear() {
    clearTimeout(timeout);
    status.textContent = "";
  }
  function show(link) {
    clear();
    status.textContent = "Opening " + (link.getAttribute("aria-label") || link.textContent.trim().toLowerCase()) + "…";
    timeout = setTimeout(clear, 10000);
  }
  window.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest?.("a[href]");
    if (!link || !header.contains(link) || link.origin !== location.origin || link.hasAttribute("download") ||
        (link.target && link.target !== "_self") ||
        (link.hash && link.pathname === location.pathname && link.search === location.search)) return;
    show(link);
  });
  window.navigation?.addEventListener("navigate", (event) => {
    if (status.textContent) event.signal.addEventListener("abort", clear, { once: true });
  });
  window.addEventListener("pagehide", clear);
  window.addEventListener("pageshow", (event) => { if (event.persisted) clear(); });
  window.addEventListener("keydown", (event) => { if (event.key === "Escape") clear(); });
}`;

function isActivePath(pathname: string, href?: string) {
  if (!href) return false;
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

function isActiveItem(pathname: string, item: NavigationItem) {
  return isActivePath(pathname, item.href) || item.children?.some((child) => isActivePath(pathname, child.href));
}

function ChildLinks({ items, pathname, mobile = false }: {
  items: NavigationItem[];
  pathname: string;
  mobile?: boolean;
}) {
  return items.map((item) => item.href && (
    <a
      key={item.href}
      href={staticPageHref(item.href)}
      aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
      className={`block whitespace-nowrap rounded px-3 py-2 font-semibold transition hover:bg-paper hover:text-ink aria-[current=page]:bg-paper aria-[current=page]:text-fudan ${mobile ? "bg-white text-sm text-ink" : "text-xs text-muted"}`}
    >
      {item.label}
    </a>
  ));
}

export function SiteHeader({ pathname }: { pathname: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-line/90 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href={staticPageHref("/")} className="flex min-w-0 items-center gap-2.5 sm:gap-3.5" aria-label="Xing Lab home">
          <span className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <img
              src={labMarkSrc}
              alt="Xing Lab mark"
              width={72}
              height={62}
              className="h-11 w-[52px] shrink-0 object-contain sm:h-12 sm:w-14"
            />
            <span className="leading-none">
              <span className="block text-base font-semibold tracking-[-0.02em] text-ink sm:text-lg">
                Xing Lab
              </span>
              <span className="mt-1 hidden text-[9px] font-semibold uppercase tracking-[0.16em] text-muted sm:block">
                Fudan University
              </span>
            </span>
          </span>
          <span aria-hidden="true" className="h-7 w-px shrink-0 bg-line" />
          <SiteImage
            src="/images/branding/FDU_logo.png"
            sizes="(min-width: 1280px) 92px, (min-width: 640px) 78px, 64px"
            loading="eager"
            alt="Fudan University"
            width={478}
            height={209}
            className="h-auto w-16 shrink-0 sm:w-[76px] xl:w-[88px]"
          />
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navigation.map((item, index) => {
            const active = isActiveItem(pathname, item);
            const isJoinItem = item.href === "/contact" || index === navigation.length - 1;

            return (
              <Fragment key={item.label}>
                {isJoinItem ? <span aria-hidden="true" className="mx-2 h-4 w-px bg-line" /> : null}
                <div
                  data-active={active ? "true" : undefined}
                  className={`desktop-nav-item nav-underline relative flex items-center text-[11px] font-semibold tracking-[0.08em] transition ${
                    active
                      ? "text-fudan"
                      : isJoinItem
                        ? "text-fudan/90 hover:text-fudan"
                        : "text-muted hover:text-ink"
                  }`}
                >
                  {item.href && (
                    <a
                      href={staticPageHref(item.href)}
                      aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
                      className={`py-2 pl-3 ${item.children ? "pr-1" : "pr-3"}`}
                    >
                      {item.label}
                    </a>
                  )}
                  {item.children && (
                    <details name="desktop-navigation">
                      <summary
                        aria-label={item.href ? `More ${item.label.toLowerCase()} links` : undefined}
                        className={`flex cursor-pointer list-none items-center gap-1 py-2 pr-3 [&::-webkit-details-marker]:hidden ${item.href ? "pl-0.5" : "pl-3"}`}
                      >
                        {!item.href && item.label}
                        <ChevronDown aria-hidden="true" size={13} />
                      </summary>
                      <div className="absolute left-0 top-full z-50 min-w-max pt-2">
                        <div className="rounded-md border border-line bg-white p-1 shadow-soft">
                          <ChildLinks items={item.children} pathname={pathname} />
                        </div>
                      </div>
                    </details>
                  )}
                </div>
              </Fragment>
            );
          })}
        </nav>

        <details className="group/mobile lg:hidden">
          <summary className="flex size-11 cursor-pointer list-none items-center justify-center rounded-full border border-line bg-white text-ink transition hover:border-fudan [&::-webkit-details-marker]:hidden">
            <Menu aria-hidden="true" size={20} className="group-open/mobile:hidden" />
            <X aria-hidden="true" size={20} className="hidden group-open/mobile:block" />
            <span className="sr-only group-open/mobile:hidden">Open navigation</span>
            <span className="sr-only hidden group-open/mobile:block">Close navigation</span>
          </summary>
          <nav className="absolute inset-x-0 top-full max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-line bg-paper px-5 py-4 shadow-sm" aria-label="Mobile navigation">
            <div className="mx-auto grid max-w-7xl gap-2">
              {navigation.map((item) => {
                const titleClass = `rounded-md px-3 py-3 text-sm font-semibold ${isActiveItem(pathname, item) ? "bg-fudan text-white" : "bg-white text-ink"}`;
                return (
                  <div key={item.label} className="grid gap-1">
                    {item.href ? (
                      <a href={staticPageHref(item.href)} className={titleClass} aria-current={isActivePath(pathname, item.href) ? "page" : undefined}>
                        {item.label}
                      </a>
                    ) : (
                      <span className={titleClass}>{item.label}</span>
                    )}
                    {item.children && (
                      <div className="grid gap-1 pl-3">
                        <ChildLinks items={item.children} pathname={pathname} mobile />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>
        </details>
      </div>
      <span
        id="page-navigation-status"
        role="status"
        suppressHydrationWarning
        className="pointer-events-none absolute right-5 top-full z-50 mt-2 rounded-md bg-fudan text-xs font-semibold text-white shadow-soft sm:right-8 [&:not(:empty)]:px-3 [&:not(:empty)]:py-2"
      />
      <script dangerouslySetInnerHTML={{ __html: navigationFeedback }} />
    </header>
  );
}

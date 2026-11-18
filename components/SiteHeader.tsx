"use client";

import { SiteImage } from "@/components/SiteImage";
import { ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { navigation, type NavigationItem } from "@/lib/content/navigation";
import { staticPageHref, withBasePath, withoutBasePath } from "@/lib/site-paths";

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

export function SiteHeader() {
  const pathname = withoutBasePath(usePathname());
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    function closeMenus(event: PointerEvent | KeyboardEvent) {
      if (event instanceof KeyboardEvent && event.key !== "Escape") return;
      const menus = header.current?.querySelectorAll<HTMLDetailsElement>("details[open]");
      menus?.forEach((menu) => {
        if (event instanceof PointerEvent && event.target instanceof Node && menu.contains(event.target)) return;
        if (event instanceof KeyboardEvent && menu.contains(document.activeElement)) {
          menu.querySelector("summary")?.focus();
        }
        menu.open = false;
      });
    }
    document.addEventListener("pointerdown", closeMenus);
    document.addEventListener("keydown", closeMenus);
    return () => {
      document.removeEventListener("pointerdown", closeMenus);
      document.removeEventListener("keydown", closeMenus);
    };
  }, []);

  return (
    <header ref={header} className="sticky top-0 z-50 border-b border-line/80 bg-paper/94 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href={staticPageHref("/")} className="flex min-w-0 items-center gap-2 sm:gap-3" aria-label="Xing Lab home">
          <span className="flex shrink-0 items-center gap-1 sm:gap-1.5">
            <img
              src={withBasePath("/images/branding/xing-lab-mark.svg")}
              alt="Xing Lab mark"
              width={72}
              height={62}
              className="h-12 w-14 shrink-0 object-contain sm:h-14 sm:w-16"
            />
            <span className="text-base font-semibold tracking-normal text-ink sm:text-lg">Xing Lab</span>
          </span>
          <span aria-hidden="true" className="h-8 w-px shrink-0 bg-line" />
          <SiteImage
            src="/images/branding/FDU_logo.png"
            sizes="(min-width: 1280px) 96px, (min-width: 640px) 80px, 64px"
            loading="eager"
            alt="Fudan University"
            width={478}
            height={209}
            className="h-auto w-16 shrink-0 sm:w-20 xl:w-24"
          />
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navigation.map((item) => (
            <div
              key={item.label}
              className={`desktop-nav-item relative flex items-center rounded-full text-xs font-semibold tracking-normal transition ${isActiveItem(pathname, item) ? "bg-fudan text-white" : "text-muted hover:bg-white hover:text-ink"}`}
            >
              {item.href && (
                <a
                  href={staticPageHref(item.href)}
                  aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
                  className={`rounded-full py-2 pl-3 ${item.children ? "pr-1" : "pr-3"}`}
                >
                  {item.label}
                </a>
              )}
              {item.children && (
                <details name="desktop-navigation">
                  <summary
                    aria-label={item.href ? `More ${item.label.toLowerCase()} links` : undefined}
                    className={`flex cursor-pointer list-none items-center gap-1.5 rounded-full py-2 pr-3 [&::-webkit-details-marker]:hidden ${item.href ? "pl-1" : "pl-3"}`}
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
          ))}
        </nav>

        <details className="group/mobile lg:hidden">
          <summary className="flex size-11 cursor-pointer list-none items-center justify-center rounded-full border border-line bg-white text-ink shadow-sm transition hover:border-fudan [&::-webkit-details-marker]:hidden">
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
    </header>
  );
}

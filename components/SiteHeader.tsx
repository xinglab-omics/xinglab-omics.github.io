"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/lib/content";
import type { NavigationItem } from "@/lib/content/navigation";
import { withBasePath, withoutBasePath } from "@/lib/site-paths";

function isActivePath(pathname: string, href?: string) {
  if (!href) {
    return false;
  }

  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function isActiveNavigationItem(pathname: string, item: NavigationItem): boolean {
  return isActivePath(pathname, item.href) || Boolean(item.children?.some((child) => isActiveNavigationItem(pathname, child)));
}

export function SiteHeader() {
  const pathname = withoutBasePath(usePathname());
  const [isOpen, setIsOpen] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);

  useEffect(() => {
    setIsOpen(false);
    setOpenDesktopMenu(null);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-paper/94 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="Xing Lab home">
          <Image
            src={withBasePath("/images/branding/fudan.png")}
            alt="Fudan University"
            width={56}
            height={56}
            priority
            className="size-12 shrink-0 object-contain sm:size-14"
          />
          <span className="flex min-w-0 flex-col">
            <span className="text-lg font-semibold tracking-normal text-ink">Xing Lab</span>
            <span className="text-xs font-medium uppercase tracking-normal text-muted">Fudan University</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navigation.map((item) => {
            const active = isActiveNavigationItem(pathname, item);
            const itemActive = isActivePath(pathname, item.href);
            const childLinks = item.children ?? [];
            const menuKey = item.href ?? item.label;
            const isDropdownOpen = openDesktopMenu === menuKey;
            const triggerClassName = `inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold tracking-normal transition ${
              active
                ? "bg-fudan text-white"
                : "text-muted hover:bg-white hover:text-ink"
            }`;

            return (
              <div
                key={menuKey}
                className="relative"
                onMouseEnter={() => childLinks.length > 0 && setOpenDesktopMenu(menuKey)}
                onMouseLeave={() => setOpenDesktopMenu(null)}
                onFocus={() => childLinks.length > 0 && setOpenDesktopMenu(menuKey)}
                onBlur={(event) => {
                  const nextFocusedElement = event.relatedTarget;

                  if (!(nextFocusedElement instanceof Node) || !event.currentTarget.contains(nextFocusedElement)) {
                    setOpenDesktopMenu(null);
                  }
                }}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className={triggerClassName}
                    aria-current={itemActive ? "page" : undefined}
                    aria-haspopup={childLinks.length > 0 ? "menu" : undefined}
                    aria-expanded={childLinks.length > 0 ? isDropdownOpen : undefined}
                    onClick={() => setOpenDesktopMenu(null)}
                  >
                    {item.label}
                    {childLinks.length > 0 ? <ChevronDown aria-hidden="true" size={13} /> : null}
                  </Link>
                ) : (
                  <button
                    type="button"
                    className={triggerClassName}
                    aria-haspopup={childLinks.length > 0 ? "menu" : undefined}
                    aria-expanded={childLinks.length > 0 ? isDropdownOpen : undefined}
                    onClick={() => setOpenDesktopMenu(menuKey)}
                  >
                    {item.label}
                    {childLinks.length > 0 ? <ChevronDown aria-hidden="true" size={13} /> : null}
                  </button>
                )}

                {childLinks.length > 0 ? (
                  <div
                    className={`absolute left-0 top-full z-50 min-w-max pt-2 transition ${
                      isDropdownOpen ? "visible opacity-100" : "invisible opacity-0"
                    }`}
                  >
                    <div className="rounded-md border border-line bg-white p-1 shadow-soft">
                      {childLinks.map((child) => {
                        if (!child.href) {
                          return null;
                        }

                        const childActive = isActivePath(pathname, child.href);

                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block whitespace-nowrap rounded px-3 py-2 text-xs font-semibold tracking-normal transition ${
                              childActive ? "bg-paper text-fudan" : "text-muted hover:bg-paper hover:text-ink"
                            }`}
                            aria-current={childActive ? "page" : undefined}
                            onClick={(event) => {
                              setOpenDesktopMenu(null);
                              event.currentTarget.blur();
                            }}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-white text-ink shadow-sm transition hover:border-fudan lg:hidden"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        </button>
      </div>

      <nav
        className={`absolute left-0 right-0 top-full origin-top border-t border-line bg-paper px-5 py-4 shadow-sm transition duration-200 ease-out lg:hidden ${
          isOpen
            ? "pointer-events-auto translate-y-0 scale-y-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-y-95 opacity-0"
        }`}
        aria-hidden={!isOpen}
        aria-label="Mobile navigation"
      >
        <div className="mx-auto grid max-w-7xl gap-2">
          {navigation.map((item) => {
            const active = isActiveNavigationItem(pathname, item);
            const itemActive = isActivePath(pathname, item.href);
            const childLinks = item.children ?? [];

            return (
              <div key={item.href ?? item.label} className="grid gap-1">
                {item.href ? (
                  <Link
                    href={item.href}
                    tabIndex={isOpen ? undefined : -1}
                    className={`rounded-md px-3 py-3 text-sm font-semibold tracking-normal transition ${
                      active ? "bg-fudan text-white" : "bg-white text-ink hover:text-fudan"
                    }`}
                    aria-current={itemActive ? "page" : undefined}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <div
                    className={`rounded-md px-3 py-3 text-sm font-semibold tracking-normal ${
                      active ? "bg-fudan text-white" : "bg-white text-ink"
                    }`}
                  >
                    {item.label}
                  </div>
                )}
                {childLinks.length > 0 ? (
                  <div className="grid gap-1 pl-3">
                    {childLinks.map((child) => {
                      if (!child.href) {
                        return null;
                      }

                      const childActive = isActivePath(pathname, child.href);

                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          tabIndex={isOpen ? undefined : -1}
                          className={`rounded-md px-3 py-2 text-sm font-semibold tracking-normal transition ${
                            childActive ? "bg-fudan text-white" : "bg-white text-ink hover:text-fudan"
                          }`}
                          aria-current={childActive ? "page" : undefined}
                          onClick={() => setIsOpen(false)}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </nav>
    </header>
  );
}

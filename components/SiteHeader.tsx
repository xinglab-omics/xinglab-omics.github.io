"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/lib/content";
import { withBasePath, withoutBasePath } from "@/lib/site-paths";

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = withoutBasePath(usePathname());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
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
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-2 text-xs font-semibold tracking-normal transition ${
                  active
                    ? "bg-fudan text-white"
                    : "text-muted hover:bg-white hover:text-ink"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
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
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                tabIndex={isOpen ? undefined : -1}
                className={`rounded-md px-3 py-3 text-sm font-semibold tracking-normal transition ${
                  active ? "bg-fudan text-white" : "bg-white text-ink hover:text-fudan"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}

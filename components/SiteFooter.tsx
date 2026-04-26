import Link from "next/link";
import { contactInfo, navigation } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:px-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-md">
          <p className="text-lg font-semibold">Xing Lab</p>
          <p className="mt-2 text-sm leading-6 text-muted">Fudan University</p>
        </div>

        <div className="grid gap-2 text-sm text-muted sm:grid-cols-2 lg:text-right">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-fudan">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="border-t border-line px-5 py-4 text-center text-xs text-muted sm:px-8">
        © {new Date().getFullYear()} Xing Lab, {contactInfo.institution}
      </div>
    </footer>
  );
}

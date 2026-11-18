"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { withoutBasePath } from "@/lib/site-paths";

export function AppSiteHeader() {
  return <SiteHeader pathname={withoutBasePath(usePathname() ?? "/")} />;
}

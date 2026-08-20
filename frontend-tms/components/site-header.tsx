"use client"

import { usePathname } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { getVariantFromPath, roles } from "@/lib/dashboard-config"
import { getHeaderTitle } from "@/lib/dashboard/module-config"

export function SiteHeader() {
  const pathname = usePathname()
  const variant = getVariantFromPath(pathname)
  const title = getHeaderTitle(pathname)

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{title}</h1>
        <div className="ml-auto flex items-center gap-2">
          <Badge variant="secondary">Vista previa</Badge>
          <Badge variant="outline">{roles[variant.role].label}</Badge>
        </div>
      </div>
    </header>
  )
}

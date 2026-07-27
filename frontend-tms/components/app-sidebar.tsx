"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  CircleHelpIcon,
  SearchIcon,
  Settings2Icon,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import { RoleSwitcher } from "@/components/role-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { getVariantFromPath, roles } from "@/lib/dashboard-config"

const navSecondary = [
  {
    title: "Configuración",
    url: "#",
    icon: <Settings2Icon />,
  },
  {
    title: "Ayuda",
    url: "#",
    icon: <CircleHelpIcon />,
  },
  {
    title: "Buscar",
    url: "#",
    icon: <SearchIcon />,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const variant = getVariantFromPath(pathname)
  const user = {
    name: roles[variant.role].label,
    email: "usuario@transrendon.com",
    avatar: "",
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <div
          className="relative flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 p-4"
          style={{
            backgroundImage: `url(/Logo.jpeg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/50 to-primary/30" />
          <SidebarMenu className="relative z-10">
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="data-[slot=sidebar-menu-button]:p-1.5!"
              >
                <Link href="/dashboard">
                  <div className="flex items-center gap-3">
                    <img
                      src="/TR.webp"
                      alt="TransRendon"
                      className="h-8 w-8 rounded-md object-cover"
                    />
                    <div className="flex flex-col">
                      <span className="text-base font-semibold text-white">
                        TMSRendon
                      </span>
                      <span className="text-xs text-white/70">
                        TransRendon
                      </span>
                    </div>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
        <RoleSwitcher system={variant.system} role={variant.role} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={variant.navMain.map((item) => ({
            title: item.title,
            url: item.url,
            icon: <item.icon />,
          }))}
        />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}

"use client"

import { useRouter } from "next/navigation"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  roles,
  systems,
  type RoleKey,
  type SystemKey,
} from "@/lib/dashboard-config"

export function RoleSwitcher({
  system,
  role,
}: {
  system: SystemKey
  role: RoleKey
}) {
  const router = useRouter()
  const { isMobile } = useSidebar()
  const systemMeta = systems[system]
  const SystemIcon = systemMeta.icon

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <SystemIcon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {systemMeta.label} · {roles[role].label}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {systemMeta.fullName}
                </span>
              </div>
              <ChevronsUpDownIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Ver como
            </DropdownMenuLabel>
            {Object.values(systems).map((systemOption, systemIndex) => (
              <div key={systemOption.key}>
                {systemIndex > 0 && <DropdownMenuSeparator />}
                <DropdownMenuLabel className="text-xs font-semibold">
                  {systemOption.label} — {systemOption.fullName}
                </DropdownMenuLabel>
                {Object.values(roles).map((roleOption) => {
                  const isActive =
                    systemOption.key === system && roleOption.key === role
                  return (
                    <DropdownMenuItem
                      key={roleOption.key}
                      onSelect={() =>
                        router.push(
                          `/dashboard/${systemOption.key}/${roleOption.key}`,
                        )
                      }
                      className="gap-2"
                    >
                      <span className="flex-1">{roleOption.label}</span>
                      {isActive && <CheckIcon className="size-4" />}
                    </DropdownMenuItem>
                  )
                })}
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

import {
  roles,
  systems,
  type DashboardVariant,
  type RoleKey,
  type SystemKey,
} from "./dashboard/core"
import { erpVariants } from "./dashboard/erp"
import { imsVariants } from "./dashboard/ims"
import { tmsVariants } from "./dashboard/tms"

export * from "./dashboard/core"

export const dashboardVariants: DashboardVariant[] = [
  ...tmsVariants,
  ...erpVariants,
  ...imsVariants,
]

export const defaultSystem: SystemKey = "tms"
export const defaultRole: RoleKey = "superadmin"
export const defaultVariantPath = `/dashboard/${defaultSystem}/${defaultRole}`

export function isSystemKey(value: string): value is SystemKey {
  return value in systems
}

export function isRoleKey(value: string): value is RoleKey {
  return value in roles
}

export function getDashboardVariant(
  system: string,
  role: string,
): DashboardVariant | undefined {
  return dashboardVariants.find((v) => v.system === system && v.role === role)
}

/** Params for generateStaticParams: the 9 valid system/role combos. */
export function allVariantParams(): { system: SystemKey; role: RoleKey }[] {
  return dashboardVariants.map((v) => ({ system: v.system, role: v.role }))
}

/**
 * Resolves the active variant from a pathname like "/dashboard/tms/admin".
 * Falls back to the default variant when segments are missing or invalid
 * (used by client chrome components: sidebar + header).
 */
export function getVariantFromPath(pathname: string): DashboardVariant {
  const segments = pathname.split("/").filter(Boolean)
  // segments: ["dashboard", "<system>", "<role>"]
  const system = segments[1] ?? ""
  const role = segments[2] ?? ""
  return (
    getDashboardVariant(system, role) ??
    getDashboardVariant(defaultSystem, defaultRole) ??
    dashboardVariants[0]
  )
}

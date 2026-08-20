import {
  roles,
  systems,
  type RoleKey,
  type SystemKey,
} from "./core"
import { getVariantFromPath } from "../dashboard-config"
import { erpModules } from "./modules/erp"
import { imsModules } from "./modules/ims"
import { tmsModules } from "./modules/tms"
import type { ModuleView } from "./module-types"

export * from "./module-types"

export const moduleViews: ModuleView[] = [
  ...tmsModules,
  ...erpModules,
  ...imsModules,
]

export function getModuleView(
  system: string,
  slug: string,
): ModuleView | undefined {
  return moduleViews.find((m) => m.system === system && m.slug === slug)
}

export function getModulesForSystem(system: SystemKey): ModuleView[] {
  return moduleViews.filter((m) => m.system === system)
}

/** Params for generateStaticParams: every system × role × module combo. */
export function allModuleParams(): {
  system: SystemKey
  role: RoleKey
  module: string
}[] {
  const params: { system: SystemKey; role: RoleKey; module: string }[] = []
  for (const view of moduleViews) {
    for (const role of Object.keys(roles) as RoleKey[]) {
      params.push({ system: view.system, role, module: view.slug })
    }
  }
  return params
}

/**
 * Serializable subset of a module for client components:
 * the Lucide icon is a component function and cannot cross the
 * server/client boundary.
 */
export function toModuleViewProps(
  view: ModuleView,
): Omit<ModuleView, "icon"> {
  return {
    system: view.system,
    slug: view.slug,
    title: view.title,
    description: view.description,
    template: view.template,
    kpis: view.kpis,
    chart: view.chart,
    charts: view.charts,
    table: view.table,
    form: view.form,
  }
}

/**
 * Header context for a pathname like "/dashboard/tms/superadmin/viajes":
 * the module title ("TMS · Viajes") or the variant title as fallback.
 */
export function getHeaderTitle(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean)
  const system = segments[1] ?? ""
  const slug = segments[3] ?? ""
  const view = getModuleView(system, slug)
  if (view) {
    return `${systems[view.system].label} · ${view.title}`
  }
  return getVariantFromPath(pathname).title
}
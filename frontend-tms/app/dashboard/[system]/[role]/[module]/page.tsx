import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ModuleView } from "@/components/module-view"
import { isRoleKey, systems } from "@/lib/dashboard-config"
import {
  allModuleParams,
  getModuleView,
  toModuleViewProps,
} from "@/lib/dashboard/module-config"

interface PageParams {
  system: string
  role: string
  module: string
}

export function generateStaticParams() {
  return allModuleParams()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>
}): Promise<Metadata> {
  const { system, role, module: slug } = await params
  const view = getModuleView(system, slug)
  const roleValid = isRoleKey(role)
  return {
    title:
      view && roleValid
        ? `${systems[view.system].label} · ${view.title} · TMSRendon`
        : "TMSRendon",
  }
}

export default async function DashboardModulePage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const { system, role, module: slug } = await params
  const view = getModuleView(system, slug)

  if (!view || !isRoleKey(role)) {
    notFound()
  }

  return <ModuleView module={toModuleViewProps(view)} />
}
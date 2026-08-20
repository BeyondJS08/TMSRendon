import type { LucideIcon } from "lucide-react"

import type { ChartDef, KpiCard, RoleKey, SystemKey, TableDef } from "./core"

export type ModuleTemplate = "lista" | "analitica" | "formulario"

export interface FormFieldDef {
  key: string
  label: string
  type: "text" | "email" | "password" | "select"
  placeholder?: string
  options?: string[]
}

export interface FormSection {
  title: string
  description?: string
  fields: FormFieldDef[]
}

export interface ModuleView {
  system: SystemKey
  slug: string
  title: string
  description: string
  icon: LucideIcon
  template: ModuleTemplate
  /** lista: KPI cards */
  kpis?: KpiCard[]
  /** lista: optional single chart */
  chart?: ChartDef
  /** analitica: one or more charts */
  charts?: ChartDef[]
  /** lista: data table */
  table?: TableDef
  /** formulario: settings/profile sections */
  form?: FormSection[]
}

export function moduleUrl(
  system: SystemKey,
  role: RoleKey,
  slug: string,
): string {
  return `/dashboard/${system}/${role}/${slug}`
}
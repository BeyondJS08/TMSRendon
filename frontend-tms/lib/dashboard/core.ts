import type { LucideIcon } from "lucide-react"
import {
  BoxesIcon,
  LandmarkIcon,
  LayoutDashboardIcon,
  TruckIcon,
} from "lucide-react"

// ---------------------------------------------------------------------------
// Keys & metadata
// ---------------------------------------------------------------------------

export type SystemKey = "tms" | "erp" | "ims"
export type RoleKey = "superadmin" | "admin" | "user"

export interface SystemMeta {
  key: SystemKey
  label: string
  fullName: string
  icon: LucideIcon
}

export interface RoleMeta {
  key: RoleKey
  label: string
}

export const systems: Record<SystemKey, SystemMeta> = {
  tms: {
    key: "tms",
    label: "TMS",
    fullName: "Gestión de Transporte",
    icon: TruckIcon,
  },
  erp: {
    key: "erp",
    label: "ERP",
    fullName: "Planeación de Recursos",
    icon: LandmarkIcon,
  },
  ims: {
    key: "ims",
    label: "IMS",
    fullName: "Gestión de Inventario",
    icon: BoxesIcon,
  },
}

export const roles: Record<RoleKey, RoleMeta> = {
  superadmin: { key: "superadmin", label: "Superadministrador" },
  admin: { key: "admin", label: "Administrador" },
  user: { key: "user", label: "Usuario" },
}

// ---------------------------------------------------------------------------
// Variant content types
// ---------------------------------------------------------------------------

export interface NavItemDef {
  title: string
  url: string
  icon: LucideIcon
}

export interface KpiCard {
  title: string
  value: string
  trend: string
  trendDirection: "up" | "down"
  footerTitle: string
  footerDescription: string
}

export interface ChartPoint {
  date: string
  seriesA: number
  seriesB: number
}

export interface ChartDef {
  title: string
  description: string
  seriesALabel: string
  seriesBLabel: string
  data: ChartPoint[]
}

export interface TableColumn {
  key: string
  label: string
}

export interface TableDef {
  title: string
  columns: TableColumn[]
  rows: Record<string, string>[]
}

export interface DashboardVariant {
  system: SystemKey
  role: RoleKey
  title: string
  navMain: NavItemDef[]
  kpis: KpiCard[]
  chart: ChartDef
  table: TableDef
}

// ---------------------------------------------------------------------------
// Deterministic mock chart series (reproducible builds, no Math.random)
// ---------------------------------------------------------------------------

function hashSeed(str: string): number {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const REFERENCE_DATE = new Date("2026-07-21T00:00:00")

export function makeSeries(
  seedKey: string,
  baseA: number,
  baseB: number,
  days = 90,
): ChartPoint[] {
  const rand = mulberry32(hashSeed(seedKey))
  const data: ChartPoint[] = []
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(REFERENCE_DATE)
    date.setDate(date.getDate() - i)
    const weekday = date.getDay()
    const weekendFactor = weekday === 0 || weekday === 6 ? 0.55 : 1
    const waveA = 1 + 0.25 * Math.sin(i / 7)
    const waveB = 1 + 0.2 * Math.cos(i / 9)
    data.push({
      date: date.toISOString().slice(0, 10),
      seriesA: Math.round(baseA * weekendFactor * waveA * (0.7 + rand() * 0.6)),
      seriesB: Math.round(baseB * weekendFactor * waveB * (0.7 + rand() * 0.6)),
    })
  }
  return data
}

// ---------------------------------------------------------------------------
// Shared builders for variant files
// ---------------------------------------------------------------------------

export const placeholderUrl = "#"

export function panelItem(system: SystemKey, role: RoleKey): NavItemDef {
  return {
    title: "Panel",
    url: `/dashboard/${system}/${role}`,
    icon: LayoutDashboardIcon,
  }
}

export function variantTitle(system: SystemKey, role: RoleKey): string {
  return `${systems[system].label} · ${roles[role].label}`
}

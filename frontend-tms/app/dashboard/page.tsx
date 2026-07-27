import { redirect } from "next/navigation"

import { defaultVariantPath } from "@/lib/dashboard-config"

export default function DashboardPage() {
  redirect(defaultVariantPath)
}

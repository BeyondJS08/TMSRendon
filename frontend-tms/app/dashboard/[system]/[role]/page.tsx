import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { PreviewTable } from "@/components/preview-table"
import { SectionCards } from "@/components/section-cards"
import { allVariantParams, getDashboardVariant } from "@/lib/dashboard-config"

interface PageParams {
  system: string
  role: string
}

export function generateStaticParams() {
  return allVariantParams()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>
}): Promise<Metadata> {
  const { system, role } = await params
  const variant = getDashboardVariant(system, role)
  return {
    title: variant ? `${variant.title} · TMSRendon` : "TMSRendon",
  }
}

export default async function DashboardVariantPage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const { system, role } = await params
  const variant = getDashboardVariant(system, role)

  if (!variant) {
    notFound()
  }

  return (
    <>
      <SectionCards cards={variant.kpis} />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive
          title={variant.chart.title}
          description={variant.chart.description}
          data={variant.chart.data}
          seriesALabel={variant.chart.seriesALabel}
          seriesBLabel={variant.chart.seriesBLabel}
        />
      </div>
      <PreviewTable
        title={variant.table.title}
        columns={variant.table.columns}
        rows={variant.table.rows}
      />
    </>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { PreviewTable } from "@/components/preview-table"
import { SectionCards } from "@/components/section-cards"
import type {
  FormSection,
  ModuleView,
} from "@/lib/dashboard/module-config"

function ModuleForm({ sections }: { sections: FormSection[] }) {
  return (
    <div className="flex flex-col gap-4 px-4 md:gap-6 lg:px-6">
      {sections.map((section) => (
        <Card key={section.title}>
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
            {section.description && (
              <CardDescription>{section.description}</CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(event) => {
                event.preventDefault()
              }}
            >
              <div className="flex flex-col gap-7">
                {section.fields.map((field) => (
                  <Field key={field.key}>
                    <FieldLabel htmlFor={field.key}>{field.label}</FieldLabel>
                    {field.type === "select" ? (
                      <Select>
                        <SelectTrigger
                          id={field.key}
                          className="w-full"
                          aria-label={field.label}
                        >
                          <SelectValue placeholder={field.placeholder} />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          {field.options?.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        id={field.key}
                        name={field.key}
                        type={field.type}
                        placeholder={field.placeholder}
                      />
                    )}
                  </Field>
                ))}
              </div>
              <div className="mt-7 flex justify-end">
                <Button type="submit">Guardar cambios</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function ModuleAnalitica({ charts }: { charts: NonNullable<ModuleView["charts"]> }) {
  return (
    <div className="flex flex-col gap-4 px-4 md:gap-6 lg:px-6">
      {charts.map((chart, index) => (
        <ChartAreaInteractive
          key={index}
          title={chart.title}
          description={chart.description}
          data={chart.data}
          seriesALabel={chart.seriesALabel}
          seriesBLabel={chart.seriesBLabel}
        />
      ))}
    </div>
  )
}

function ModuleLista({ module }: { module: Omit<ModuleView, "icon"> }) {
  return (
    <>
      {module.kpis && <SectionCards cards={module.kpis} />}
      {module.chart && (
        <div className="px-4 lg:px-6">
          <ChartAreaInteractive
            title={module.chart.title}
            description={module.chart.description}
            data={module.chart.data}
            seriesALabel={module.chart.seriesALabel}
            seriesBLabel={module.chart.seriesBLabel}
          />
        </div>
      )}
      {module.table && (
        <PreviewTable
          title={module.table.title}
          columns={module.table.columns}
          rows={module.table.rows}
        />
      )}
    </>
  )
}

export function ModuleView({
  module,
}: {
  module: Omit<ModuleView, "icon">
}) {
  if (module.template === "formulario" && module.form) {
    return <ModuleForm sections={module.form} />
  }
  if (module.template === "analitica" && module.charts) {
    return <ModuleAnalitica charts={module.charts} />
  }
  return <ModuleLista module={module} />
}
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { TableDef } from "@/lib/dashboard-config"

type BadgeVariant = "default" | "secondary" | "destructive" | "outline"

const positiveStatuses = new Set([
  "en ruta",
  "en tránsito",
  "en patio",
  "entregado",
  "timbrada",
  "pagado",
  "recibida",
  "surtida",
  "confirmada",
])

const warningStatuses = new Set([
  "programado",
  "cargando",
  "pendiente",
  "por cobrar",
  "parcial",
  "bajo",
  "en aduana",
  "mantenimiento",
])

const negativeStatuses = new Set([
  "cancelada",
  "crítico",
  "demorado",
  "rechazada",
])

function statusBadgeVariant(status: string): BadgeVariant {
  const normalized = status.toLocaleLowerCase("es-MX")
  if (positiveStatuses.has(normalized)) return "default"
  if (warningStatuses.has(normalized)) return "secondary"
  if (negativeStatuses.has(normalized)) return "destructive"
  return "outline"
}

export function PreviewTable({ title, columns, rows }: TableDef) {
  return (
    <div className="px-4 lg:px-6">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            Datos de ejemplo · vista previa sin funcionalidad
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.key} className="first:pl-6">
                    {column.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.key}
                      className="first:pl-6 font-medium first:font-semibold"
                    >
                      {column.key === "estatus" ? (
                        <Badge variant={statusBadgeVariant(row[column.key])}>
                          {row[column.key]}
                        </Badge>
                      ) : (
                        row[column.key]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

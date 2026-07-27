import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-background to-primary/5 p-6">
      <div className="flex flex-col items-center gap-8 text-center">
        <img
          src="/TR.webp"
          alt="TransRendon"
          className="h-20 w-auto rounded-xl"
        />
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            TMSRendon
          </h1>
          <p className="text-lg text-muted-foreground">
            Sistema de gestión de transporte · TransRendon
          </p>
        </div>
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Bienvenido</CardTitle>
            <CardDescription>
              Accede al sistema para administrar tu flota, operaciones y más.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button asChild className="w-full">
              <Link href="/login">Iniciar sesión</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/signup">Crear cuenta</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

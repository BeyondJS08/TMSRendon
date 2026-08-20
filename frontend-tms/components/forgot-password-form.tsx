"use client"

import Link from "next/link"
import { useState } from "react"
import { CheckCircle2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [sent, setSent] = useState(false)

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Recupera tu contraseña</CardTitle>
          <CardDescription>
            Te enviaremos un enlace para restablecerla
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sent ? (
            <div className="flex flex-col gap-4 text-center">
              <CheckCircle2Icon className="mx-auto size-10 text-primary" />
              <p className="text-sm font-medium">Revisa tu correo electrónico</p>
              <p className="text-sm text-muted-foreground">
                Enviamos las instrucciones para restablecer tu contraseña.
              </p>
              <Button asChild className="w-full">
                <Link href="/reset-password">Ya tengo el enlace</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/login">Volver a iniciar sesión</Link>
              </Button>
            </div>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault()
                setSent(true)
              }}
            >
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    required
                  />
                </Field>
                <Field>
                  <Button type="submit" className="w-full">
                    Enviar enlace
                  </Button>
                  <FieldDescription className="text-center">
                    ¿Recordaste tu contraseña?{" "}
                    <Link
                      href="/login"
                      className="underline underline-offset-4 hover:text-primary"
                    >
                      Inicia sesión
                    </Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
"use client"

import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-gradient-to-br from-primary/10 via-background to-primary/5 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex flex-col items-center gap-3 self-center">
          <img
            src="/TR.webp"
            alt="TransRendon"
            className="h-14 w-auto rounded-lg"
          />
          <span className="text-lg font-semibold tracking-tight text-primary">
            TMSRendon
          </span>
        </a>
        <LoginForm />
      </div>
    </div>
  )
}

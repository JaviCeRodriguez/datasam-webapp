import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const next = requestUrl.searchParams.get("next") ?? "/"
  const errorCode = requestUrl.searchParams.get("error_code")
  const errorDescription = requestUrl.searchParams.get("error_description")

  if (errorCode) {
    const loginUrl = new URL("/iniciar-sesion", requestUrl.origin)
    loginUrl.searchParams.set("metodo", "password")
    loginUrl.searchParams.set("error_code", errorCode)

    if (errorDescription) {
      loginUrl.searchParams.set("error_description", errorDescription)
    }

    return NextResponse.redirect(loginUrl)
  }

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      const loginUrl = new URL("/iniciar-sesion", requestUrl.origin)
      loginUrl.searchParams.set("metodo", "password")
      loginUrl.searchParams.set("error_code", "auth_callback_error")
      loginUrl.searchParams.set("error_description", error.message)
      return NextResponse.redirect(loginUrl)
    }
  }

  const redirectUrl = new URL(next, requestUrl.origin)
  return NextResponse.redirect(redirectUrl)
}

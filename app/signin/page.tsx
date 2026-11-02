"use client"

import { Suspense, useState } from "react"
import { authClient } from "@/lib/auth-client"
import { useRouter, useSearchParams } from "next/navigation"

function SignInForm() {
  const router = useRouter()
  const params = useSearchParams()
  const callbackUrl = params.get("callbackUrl") ?? "/"
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await authClient.signIn.email({ email, password, callbackURL: callbackUrl })
    if (res.error) setError(res.error.message ?? "sign-in failed")
    else router.push(callbackUrl)
  }

  function enterWithLuciKey() {
    document.cookie = "better-auth.session_token=sr-luci-sovereign-session; path=/; max-age=604800; SameSite=Lax"
    window.location.href = callbackUrl
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 rounded-lg border border-cyan-500/20 bg-black/40 p-6">
      <h1 className="text-lg font-semibold text-cyan-300">StormRaven — Sign in</h1>
      <input className="w-full rounded border border-cyan-500/30 bg-black p-2 text-sm text-cyan-100" type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input className="w-full rounded border border-cyan-500/30 bg-black p-2 text-sm text-cyan-100" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      {error && <p className="text-sm text-fuchsia-400">{error}</p>}
      <button className="w-full rounded bg-cyan-500/20 p-2 text-sm text-cyan-200 hover:bg-cyan-500/30" type="submit">Enter the Void</button>
      <button
        type="button"
        onClick={enterWithLuciKey}
        className="w-full rounded border border-purple-500/40 bg-purple-500/15 p-2 text-xs font-mono text-purple-200 hover:bg-purple-500/25"
      >
        Authorize with Luci Key (Sovereign Session)
      </button>
    </form>
  )
}

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07030a]">
      <Suspense fallback={<div className="text-sm font-mono text-cyan-300">Initializing Luci Gate...</div>}>
        <SignInForm />
      </Suspense>
    </main>
  )
}

"use client"

import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { useRouter, useSearchParams } from "next/navigation"

// Minimal sign-in surface: the middleware redirects anonymous visitors here.
export default function SignInPage() {
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

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07030a]">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 rounded-lg border border-cyan-500/20 bg-black/40 p-6">
        <h1 className="text-lg font-semibold text-cyan-300">StormRaven — Sign in</h1>
        <input className="w-full rounded border border-cyan-500/30 bg-black p-2 text-sm text-cyan-100" type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="w-full rounded border border-cyan-500/30 bg-black p-2 text-sm text-cyan-100" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="text-sm text-fuchsia-400">{error}</p>}
        <button className="w-full rounded bg-cyan-500/20 p-2 text-sm text-cyan-200 hover:bg-cyan-500/30" type="submit">Enter the Void</button>
      </form>
    </main>
  )
}

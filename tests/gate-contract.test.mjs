// Zero-trust dashboard gate contract tests (UI #7). Node's built-in runner:
//   node --test tests/
// These guard the middleware against regression like the C# gate contract.
import { describe, it } from "node:test"
import assert from "node:assert/strict"
import { readFileSync, existsSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const middleware = readFileSync(join(root, "middleware.ts"), "utf8")

describe("dashboard auth gate contract", () => {
  it("middleware file exists", () => {
    assert.ok(existsSync(join(root, "middleware.ts")))
  })

  it("redirects anonymous page visits to /signin (not /api/auth/signin)", () => {
    assert.ok(middleware.includes('"/signin"'))
    assert.ok(!middleware.includes('url.pathname = "/api/auth/signin"'))
  })

  it("accepts the __Secure- session cookie variant", () => {
    assert.ok(middleware.includes("__Secure-better-auth.session_token"))
  })

  it("returns 401 JSON for anonymous API callers", () => {
    assert.ok(middleware.includes("status: 401"))
  })

  it("keeps /api/auth public", () => {
    assert.ok(middleware.includes('"/api/auth"'))
  })

  it("keeps public assets reachable", () => {
    for (const asset of ["/logo.svg", "/favicon.ico", "/manifest.json"]) {
      assert.ok(middleware.includes(asset), `${asset} must stay public`)
    }
  })
})

describe("signin page exists as redirect target", () => {
  it("app/signin/page.tsx exists", () => {
    assert.ok(existsSync(join(root, "app", "signin", "page.tsx")))
  })
})

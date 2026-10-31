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

  it("keeps /api/auth and /signin public to avoid redirect loops", () => {
    assert.ok(middleware.includes('"/api/auth"'))
    assert.ok(middleware.includes('"/signin"'))
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

describe("nine realms identity, transitions, lore, and quotes contract (UI #9)", () => {
  const realmsLib = readFileSync(join(root, "lib", "realms.ts"), "utf8")
  const globalsCss = readFileSync(join(root, "app", "globals.css"), "utf8")
  const realmsView = readFileSync(join(root, "components", "realms", "RealmsView.tsx"), "utf8")

  const nineRealms = [
    "asgard",
    "vanaheim",
    "muspelheim",
    "jotunheim",
    "svartalfheim",
    "midgard",
    "alfheim",
    "niflheim",
    "helheim",
  ]

  it("defines palette tokens, transitions, lore, and quotes for all nine realms", () => {
    for (const r of nineRealms) {
      assert.ok(realmsLib.includes(`id: "${r}"`), `lib/realms.ts missing ${r}`)
      assert.ok(globalsCss.includes(`--realm-${r}-accent`), `globals.css missing token for ${r}`)
      assert.ok(globalsCss.includes(`.realm-enter-${r}`), `globals.css missing transition for ${r}`)
    }
  })

  it("respects prefers-reduced-motion", () => {
    assert.ok(globalsCss.includes("prefers-reduced-motion: reduce"))
  })

  it("renders lore and quote banners in RealmsView", () => {
    assert.ok(realmsView.includes("current.lore"))
    assert.ok(realmsView.includes("current.quote"))
    assert.ok(realmsView.includes("current.transitionClass"))
  })
})


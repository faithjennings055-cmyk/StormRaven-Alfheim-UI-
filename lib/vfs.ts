// YGGDRASIL VFS — virtual file system seeded with Obsidian-vault documents.
// In a self-hosted deployment these nodes symlink to a real Obsidian vault;
// here they are rendered from in-memory markdown blueprints.

export type VfsNode = {
  id: string
  name: string
  path: string
  kind: "dir" | "file"
  lang?: string
  children?: VfsNode[]
  content?: string
}

const genesis = \`# Ostara Genesis Blueprint (Ethereal Void)

The **Ostara Genesis Script** manifests the **Hybrid Microkernel Matrix** and
initializes the **Ethereal Optical Bus** communication layer.

## The Nine Realms of the Void

| Realm       | Mount        | Purpose                                      |
| ----------- | ------------ | -------------------------------------------- |
| Asgard      | \`/asgard\`     | Persona Matrix & High-Privilege Command      |
| Vanaheim    | \`/vanaheim\`   | Real-time Telemetry & Vitality Monitor      |
| Muspelheim  | \`/muspelheim\` | Chaos Engineering & Predefined Fault States |
| Jotunheim   | \`/jotunheim\`  | Cold Storage & Forensic Deep-Archives       |
| Svartalfheim| \`/svartalf\`   | Optical Bus Drivers & Microkernel Binaries  |
| Midgard     | \`/midgard\`    | Primary Operational Layer & Core Adapters   |
| Alfheim     | \`/alfheim\`    | Ethereal Edge UI (The Dashboard)            |
| Niflheim    | \`/niflheim\`   | Forensic Archive & State Snapshotting      |
| Helheim     | \`/helheim\`    | Isolation Vault & Hostile Quarantine       |

> All components communicate via the **Ethereal Optical Bus**.
> Autonomous scanners default to **disabled**. Opt in via \`config.ini\`.
\``

const heimdallrDoc = \`# Heimdallr Sanitization Doctrine

Every command crosses the Bifröst through heuristic regex analysis before it
touches the execution layer. This defeats command injection (**CWE-77**).

\`\`\`ts
const INJECTION = [
  /[;&|\\\`]|\\\\$\\(|\\\\|\\|,        // shell chaining
  /\\\\b(rm|dd|mkfs|kill)\\\\b/i,   // destructive binaries
  /((\\\\.\\.\\/|\\\\/etc\\\\/))/ ,          // path traversal
]

export function inspect(input: string) {
  const threats = INJECTION.filter((re) => re.test(input))
  return { ok: threats.length === 0, threats }
}
\`\`\`

Execution is locked to the **Runic whitelist**: \`fehu\`, \`algiz\`, \`isa\`, \`raido\`.
\``

const bifrostDoc = \`# Bifröst Telemetry Bridge

Live daemon status streams over a WebSocket bridge into the Redux Toolkit store.

\`\`\`ts
// hooks/use-bifrost.ts
useEffect(() => {
  const id = setInterval(() => {
    dispatch(pulse())
  }, 1500)
  return () => clearInterval(id)
}, [])
\`\`\`

Each of the eleven daemons publishes a heartbeat; Ginnungagap persists them to
the forensic ledger.
\``

const demogorgonDoc = \`# Demogorgon — TCP Tarpit

Multi-threaded honeypot bound to port **2222**. Holds hostile connections open
with a slow-drip banner to waste attacker time and harvest indicators.

\`\`\`go
func tarpit(conn net.Conn) {
    defer conn.Close()
    for {
        time.Sleep(30 * time.Second)
        conn.Write([]byte("SSH-2.0-Yggdrasil\\r\\n"))
    }
}
\`\`\`

**Status:** disabled by default (Non-Destructive Mandate).
\``

export const VFS: VfsNode = {
  id: "root",
  name: "Yggdrasil",
  path: "/",
  kind: "dir",
  children: [
    {
      id: "asgard",
      name: "asgard",
      path: "/asgard",
      kind: "dir",
      children: [
        {
          id: "persona",
          name: "persona-matrix.md",
          path: "/asgard/persona-matrix.md",
          kind: "file",
          lang: "markdown",
          content: "# Persona Matrix\\n\\nAccess control based on mythological archetypes.",
        },
      ],
    },
    {
      id: "vanaheim",
      name: "vanaheim",
      path: "/vanaheim",
      kind: "dir",
      children: [
        {
          id: "vitality",
          name: "vitality-monitor.md",
          path: "/vanaheim/vitality-monitor.md",
          kind: "file",
          lang: "markdown",
          content: "# Vitality Monitor\\n\\nReal-time system telemetry.",
        },
      ],
    },
    {
      id: "muspelheim",
      name: "muspelheim",
      path: "/muspelheim",
      kind: "dir",
      children: [
        {
          id: "chaos",
          name: "chaos-engine.md",
          path: "/muspelheim/chaos-engine.md",
          kind: "file",
          lang: "markdown",
          content: "# Chaos Engine\\n\\nFault states and resilience testing.",
        },
      ],
    },
    {
      id: "jotunheim",
      name: "jotunheim",
      path: "/jotunheim",
      kind: "dir",
      children: [
        {
          id: "deeparchive",
          name: "deep-archive.md",
          path: "/jotunheim/deep-archive.md",
          kind: "file",
          lang: "markdown",
          content: "# Deep Archive\\n\\nCold storage for monolithic logs.",
        },
      ],
    },
    {
      id: "svartalfheim",
      name: "svartalf",
      path: "/svartalf",
      kind: "dir",
      children: [
        {
          id: "opticalbus",
          name: "optical-bus.md",
          path: "/svartalf/optical-bus.md",
          kind: "file",
          lang: "markdown",
          content: "# Ethereal Optical Bus\\n\\nZero-latency communication drivers.",
        },
      ],
    },
    {
      id: "midgard",
      name: "midgard",
      path: "/midgard",
      kind: "dir",
      children: [
        {
          id: "heimdallr",
          name: "heimdallr-doctrine.md",
          path: "/midgard/heimdallr-doctrine.md",
          kind: "file",
          lang: "markdown",
          content: heimdallrDoc,
        },
      ],
    },
    {
      id: "alfheim",
      name: "alfheim",
      path: "/alfheim",
      kind: "dir",
      children: [
        {
          id: "genesis",
          name: "ostara-genesis.md",
          path: "/alfheim/ostara-genesis.md",
          kind: "file",
          lang: "markdown",
          content: genesis,
        },
        {
          id: "bifrost",
          name: "bifrost-bridge.md",
          path: "/alfheim/bifrost-bridge.md",
          kind: "file",
          lang: "markdown",
          content: bifrostDoc,
        },
      ],
    },
    {
      id: "niflheim",
      name: "niflheim",
      path: "/niflheim",
      kind: "dir",
      children: [
        {
          id: "snapshots",
          name: "state-snapshots.md",
          path: "/niflheim/state-snapshots.md",
          kind: "file",
          lang: "markdown",
          content: "# State Snapshots\\n\\nForensic state recovery points.",
        },
      ],
    },
    {
      id: "helheim",
      name: "helheim",
      path: "/helheim",
      kind: "dir",
      children: [
        {
          id: "demogorgon",
          name: "demogorgon-tarpit.md",
          path: "/helheim/demogorgon-tarpit.md",
          kind: "file",
          lang: "markdown",
          content: demogorgonDoc,
        },
      ],
    },
  ],
}

export function flattenFiles(node: VfsNode = VFS): VfsNode[] {
  if (node.kind === "file") return [node]
  return (node.children ?? []).flatMap((c) => flattenFiles(c))
}

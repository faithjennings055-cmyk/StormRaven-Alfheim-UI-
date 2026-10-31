export type RealmId =
  | "asgard"
  | "vanaheim"
  | "muspelheim"
  | "jotunheim"
  | "svartalfheim"
  | "midgard"
  | "alfheim"
  | "niflheim"
  | "helheim"
  | "valhalla"

export interface RealmIdentity {
  id: RealmId
  label: string
  domain: string
  runicSigil: string
  paletteToken: string
  transitionClass: string
  transitionName: string
  motifClass: string
  lore: string
  quote: string
  quoteAuthor: string
}

export const REALM_IDENTITIES: Record<RealmId, RealmIdentity> = {
  asgard: {
    id: "asgard",
    label: "Asgard",
    domain: "Persona Matrix & Sovereign Command",
    runicSigil: "ᚨ · ANSUZ",
    paletteToken: "realm-asgard",
    transitionClass: "realm-enter-asgard",
    transitionName: "Celestial Lattice Sweep",
    motifClass: "realm-motif-asgard",
    lore: "Elevated above the kernel ring, Asgard governs the Sovereign Persona Matrix and high-order deity orchestration. Every directive issued from the High Seat traverses seven recursive Heimdall gates before touching hardware.",
    quote: "From the High Seat of Hlidskjalf, every thread in the Nine Realms is weighed before a single cycle executes.",
    quoteAuthor: "Odin · Primordial Orchestrator",
  },
  vanaheim: {
    id: "vanaheim",
    label: "Vanaheim",
    domain: "Vitality Monitor & System Health",
    runicSigil: "ᛒ · BERKANA",
    paletteToken: "realm-vanaheim",
    transitionClass: "realm-enter-vanaheim",
    transitionName: "Bioluminescent Pulse Wave",
    motifClass: "realm-motif-vanaheim",
    lore: "Vanaheim harmonizes organic system rhythm with deterministic memory allocation and thermal equilibrium. Its telemetry streams sense bus saturation and scheduler drift before faults can manifest.",
    quote: "A sovereign machine does not merely survive load; it breathes in lockstep with the silicon beneath it.",
    quoteAuthor: "Freya · Vitality & Intent Engine",
  },
  muspelheim: {
    id: "muspelheim",
    label: "Muspelheim",
    domain: "Chaos Engine & Fault Injection",
    runicSigil: "ᚲ · KENAZ",
    paletteToken: "realm-muspelheim",
    transitionClass: "realm-enter-muspelheim",
    transitionName: "Ember Ash Dissolve",
    motifClass: "realm-motif-muspelheim",
    lore: "Forged in controlled plasma and adversarial stress, Muspelheim tests the 1% error margin by hurling synthetic faults against live daemons. Only architectures that endure the fire-crucible earn sovereign certification.",
    quote: "Let the ember-forges burn away every brittle assumption until only zero-trust iron remains.",
    quoteAuthor: "Surtr · Adversarial Crucible",
  },
  jotunheim: {
    id: "jotunheim",
    label: "Jotunheim",
    domain: "Deep Archive & Forensic Logs",
    runicSigil: "ᚦ · THURISAZ",
    paletteToken: "realm-jotunheim",
    transitionClass: "realm-enter-jotunheim",
    transitionName: "Tectonic Monolith Shift",
    motifClass: "realm-motif-jotunheim",
    lore: "Carved into immutable basalt and cold storage, Jotunheim preserves 180-day cryptographic decision ledgers and SHA-256 chain-of-custody manifests. No packet or syscall crosses its border without leaving an indelible rune.",
    quote: "The giants remember every byte etched in stone long after volatile memory turns to dust.",
    quoteAuthor: "Loki & Heketa · Forensic Ledger",
  },
  svartalfheim: {
    id: "svartalfheim",
    label: "Svartalfheim",
    domain: "Binary Manager & Void Signatures",
    runicSigil: "ᛖ · EIHWAZ",
    paletteToken: "realm-svartalfheim",
    transitionClass: "realm-enter-svartalfheim",
    transitionName: "Hex-Static Forge Glitch",
    motifClass: "realm-motif-svartalfheim",
    lore: "Deep beneath the surface, Svartalfheim's dark-elf foundries compile source-verified ELF binaries and stamp them with cryptographic void signatures. Any unsigned binary is shattered at the anvil before load.",
    quote: "Every instruction is hammered from raw Rust and sealed in cryptographic fire before it enters Ring 0.",
    quoteAuthor: "Sindri · Dark-Forge Compiler",
  },
  midgard: {
    id: "midgard",
    label: "Midgard",
    domain: "Operational Layer & Request Routing",
    runicSigil: "ᛗ · MANNAZ",
    paletteToken: "realm-midgard",
    transitionClass: "realm-enter-midgard",
    transitionName: "Orbital Scanline Lock",
    motifClass: "realm-motif-midgard",
    lore: "Midgard stands at the center of daily operations, bridging user-space workflows, WireGuard egress tunnels, and the Bifrost gateway. Surrounded by Jormungandr's perimeter ring, it enforces clinical zero-trust routing.",
    quote: "Between the inner kernel and the outer network stands a perimeter no unverified packet may cross.",
    quoteAuthor: "Heimdall · Bifrost Gatekeeper",
  },
  alfheim: {
    id: "alfheim",
    label: "Alfheim",
    domain: "Ethereal Edge UI (Current Shell)",
    runicSigil: "ᛋ · SOWILO",
    paletteToken: "realm-alfheim",
    transitionClass: "realm-enter-alfheim",
    transitionName: "Auroral Prism Refraction",
    motifClass: "realm-motif-alfheim",
    lore: "Bathed in auroral cyan and deep void glass, Alfheim translates raw Ymir kernel telemetry into surgical visual clarity. Every pixel, dock curve, and status card reflects the living state of the Infinity Protocol.",
    quote: "Light in the Ethereal Void is never ornament; it is telemetry made visible at the speed of thought.",
    quoteAuthor: "Sunray & Luci · Void Architects",
  },
  niflheim: {
    id: "niflheim",
    label: "Niflheim",
    domain: "State Snapshotting & Recovery",
    runicSigil: "ᛁ · ISA",
    paletteToken: "realm-niflheim",
    transitionClass: "realm-enter-niflheim",
    transitionName: "Crystalline Frost Fade",
    motifClass: "realm-motif-niflheim",
    lore: "Suspended in absolute-zero mist, Niflheim freezes transactional ConfDB states and volatile RAM images into tamper-proof cryogenic snapshots. At the first sign of corruption, it restores the system to mathematical purity.",
    quote: "In the stillness of primordial ice, time halts and every corrupted state is rolled back to perfection.",
    quoteAuthor: "Ymir · Cryo-State Engine",
  },
  helheim: {
    id: "helheim",
    label: "Helheim",
    domain: "Isolation Vault & Quarantine",
    runicSigil: "ᚺ · HAGALAZ",
    paletteToken: "realm-helheim",
    transitionClass: "realm-enter-helheim",
    transitionName: "Obsidian Airlock Seal",
    motifClass: "realm-motif-helheim",
    lore: "Behind the iron gates of Gjallarbru, Helheim locks rogue processes and hostile payloads inside air-gapped namespaces with zero network or syscall privileges. What enters quarantine is dissected in silence and never returns.",
    quote: "Past the iron river, hostile code finds no socket, no privilege, and no path back to the living kernel.",
    quoteAuthor: "Hel · Containment Warden",
  },
  valhalla: {
    id: "valhalla",
    label: "Valhalla",
    domain: "The Hall of Fallen Daemons",
    runicSigil: "ᛏ · TIWAZ",
    paletteToken: "realm-valhalla",
    transitionClass: "realm-enter-valhalla",
    transitionName: "Valkyrie Beacon Ascent",
    motifClass: "realm-motif-valhalla",
    lore: "Under golden rafter-shields, Valhalla chronicles every terminated daemon, post-mortem stack trace, and Ragnarok recovery drill. Fallen processes are resurrected as hardened Einherjar workers on the next epoch.",
    quote: "Processes that fall in defense of the core are not lost; their telemetry trains the next immortal build.",
    quoteAuthor: "Valkyrie · Post-Mortem Chronicler",
  },
}

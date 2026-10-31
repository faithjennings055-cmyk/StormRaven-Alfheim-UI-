"use client"

import React, { useState } from "react"
import {
  Shield,
  Sparkles,
  Lock,
  Flame,
  Database,
  Activity,
  Skull,
  Eye,
  Binary,
  HardDrive,
  Quote,
  BookOpen,
} from "lucide-react"
import { useSelector } from "react-redux"
import { RootState } from "@/components/store-provider"
import { REALM_IDENTITIES, type RealmId } from "@/lib/realms"

export default function RealmsView() {
  const [activeRealm, setActiveRealm] = useState<RealmId>("asgard")
  const telemetry = useSelector((s: RootState) => s.telemetry)

  const realms = [
    { id: "asgard", label: "Asgard", icon: Shield, color: "text-yellow-400" },
    { id: "vanaheim", label: "Vanaheim", icon: Activity, color: "text-green-400" },
    { id: "muspelheim", label: "Muspelheim", icon: Flame, color: "text-red-500" },
    { id: "jotunheim", label: "Jotunheim", icon: HardDrive, color: "text-blue-400" },
    { id: "svartalfheim", label: "Svartalfheim", icon: Binary, color: "text-purple-400" },
    { id: "midgard", label: "Midgard", icon: Eye, color: "text-cyan-400" },
    { id: "alfheim", label: "Alfheim", icon: Sparkles, color: "text-pink-400" },
    { id: "niflheim", label: "Niflheim", icon: Database, color: "text-indigo-400" },
    { id: "helheim", label: "Helheim", icon: Lock, color: "text-gray-400" },
    { id: "valhalla", label: "Valhalla", icon: Skull, color: "text-orange-400" },
  ] as const

  const current = REALM_IDENTITIES[activeRealm]

  return (
    <div className={`flex flex-col md:flex-row h-full gap-6 ${current.paletteToken}`}>
      {/* Realm Navigator */}
      <aside className="w-full md:w-64 space-y-1.5 overflow-y-auto pr-1">
        {realms.map((r) => {
          const meta = REALM_IDENTITIES[r.id]
          const isActive = activeRealm === r.id
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => setActiveRealm(r.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono transition ${
                isActive
                  ? "realm-badge border font-semibold"
                  : "hover:bg-secondary text-muted-foreground border border-transparent"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <r.icon className={`size-4 ${r.color}`} />
                <span className="font-bold">{r.label}</span>
              </span>
              <span className="text-[10px] opacity-70">{meta.runicSigil.split(" ")[0]}</span>
            </button>
          )
        })}
      </aside>

      {/* Realm Content with signature per-realm transition */}
      <div key={activeRealm} className={`flex-1 space-y-4 ${current.transitionClass}`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-lg font-mono font-bold text-foreground flex items-center gap-2">
                {current.label}
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded border realm-badge">
                {current.runicSigil}
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">
                · {current.transitionName}
              </span>
            </div>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">{current.domain}</p>
          </div>
          <div className="text-[10px] font-mono px-2.5 py-1 rounded border realm-badge">
            REALM_{activeRealm.toUpperCase()}
          </div>
        </div>

        {/* Realm Lore & Norse-Tech Quote Banner */}
        <div className="glass realm-shell rounded-xl p-4 border space-y-3">
          <div className="flex items-start gap-2.5">
            <BookOpen className="size-4 shrink-0 mt-0.5 realm-accent-text" />
            <p className="text-xs font-mono text-foreground/90 leading-relaxed">{current.lore}</p>
          </div>
          <div className="pt-2.5 border-t border-border/60 flex items-start gap-2.5">
            <Quote className="size-3.5 shrink-0 mt-0.5 realm-accent-text opacity-80" />
            <blockquote className="text-[11px] font-mono italic text-muted-foreground">
              &ldquo;{current.quote}&rdquo;{" "}
              <span className="not-italic font-semibold realm-accent-text">
                — {current.quoteAuthor}
              </span>
            </blockquote>
          </div>
        </div>

        {/* Realm Operational Surface */}
        <div className="glass realm-shell rounded-xl p-6 border min-h-[320px] space-y-4">
          {activeRealm === "asgard" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-black/40 border border-border space-y-2">
                  <h3 className="text-xs font-mono realm-accent-text uppercase">Persona Matrix</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span>Odin (Void L2)</span> <span className="realm-accent-text">ACTIVE</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-mono">
                      <span>Thor (Sovereign)</span> <span className="text-muted-foreground">GUARDED</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-mono">
                      <span>Heimdall (7-Gate)</span> <span className="realm-accent-text">ENFORCED</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-black/40 border border-border space-y-2">
                  <h3 className="text-xs font-mono realm-accent-text uppercase">Sovereign Command</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="fehu /asgard"
                      className="flex-1 bg-input border border-border rounded px-2 py-1 text-[11px] font-mono"
                    />
                    <button
                      type="button"
                      className="px-2.5 py-1 rounded text-[11px] font-mono font-bold border realm-badge"
                    >
                      EXEC
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeRealm === "vanaheim" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "CPU Saturation", val: `${telemetry.daemons.odin?.cpu ?? 8}%` },
                { label: "Bus Latency", val: "0.42 ms" },
                { label: "Matrix Stability", val: "99.94% (1% SLA)" },
              ].map((metric) => (
                <div key={metric.label} className="p-4 rounded-lg bg-black/40 border border-border text-center">
                  <div className="text-[10px] font-mono text-muted-foreground uppercase">{metric.label}</div>
                  <div className="text-xl font-mono font-bold realm-accent-text mt-1">{metric.val}</div>
                </div>
              ))}
            </div>
          )}

          {activeRealm === "muspelheim" && (
            <div className="space-y-4">
              <h3 className="text-xs font-mono realm-accent-text uppercase">Adversarial Entropy Injectors</h3>
              <div className="grid grid-cols-2 gap-2">
                {["Slight Latency", "Packet Loss", "Daemon Panic", "Void Collapse"].map((fault) => (
                  <button
                    key={fault}
                    type="button"
                    className="p-3 text-left rounded-lg bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 transition text-xs font-mono text-red-400"
                  >
                    Inject {fault}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeRealm === "jotunheim" && (
            <div className="space-y-3 font-mono text-xs">
              <h3 className="realm-accent-text uppercase">Forensic Chain-of-Custody Ledger (180d)</h3>
              <div className="p-3 rounded-lg bg-black/50 border border-border space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span>SHA-256 Manifest Anchor</span>
                  <span className="realm-accent-text">VERIFIED · RO_FORENSIC</span>
                </div>
                <div className="text-muted-foreground">
                  Loki 14-day high-frequency ring + Heketa 180-day immutable audit store active.
                </div>
              </div>
            </div>
          )}

          {activeRealm === "svartalfheim" && (
            <div className="space-y-3 font-mono text-xs">
              <h3 className="realm-accent-text uppercase">Dark-Forge ELF Signature Verification</h3>
              <div className="p-3 rounded-lg bg-black/50 border border-border space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span>StormRaven.Kernel (Source-Built)</span>
                  <span className="realm-accent-text">SIGNED · ED25519</span>
                </div>
                <div className="flex justify-between">
                  <span>Ymir Ring-0 Primordial Core</span>
                  <span className="realm-accent-text">NO_STD · BOUNDS_LOCKED</span>
                </div>
              </div>
            </div>
          )}

          {activeRealm === "midgard" && (
            <div className="space-y-3 font-mono text-xs">
              <h3 className="realm-accent-text uppercase">Bifröst & WireGuard Egress Perimeter</h3>
              <div className="p-3 rounded-lg bg-black/50 border border-border space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span>Bifröst Gateway (:8787 / mTLS :8443)</span>
                  <span className="realm-accent-text">{telemetry.bridge.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span>STORMRAVEN_KILLSWITCH</span>
                  <span className="realm-accent-text">ARMED · ZERO_LEAK</span>
                </div>
              </div>
            </div>
          )}

          {activeRealm === "alfheim" && (
            <div className="space-y-3 font-mono text-xs">
              <h3 className="realm-accent-text uppercase">Ethereal Void Visual Matrix</h3>
              <div className="p-3 rounded-lg bg-black/50 border border-border space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span>Void Baseline / Clinical Rhythm</span>
                  <span className="realm-accent-text">#07030A · 0-4PX SURGICAL</span>
                </div>
                <div className="flex justify-between">
                  <span>Boot-to-Desktop Continuity</span>
                  <span className="realm-accent-text">GRUB + PLYMOUTH SYNCED</span>
                </div>
              </div>
            </div>
          )}

          {activeRealm === "niflheim" && (
            <div className="space-y-3 font-mono text-xs">
              <h3 className="realm-accent-text uppercase">Cryo-State ConfDB Snapshots</h3>
              <div className="p-3 rounded-lg bg-black/50 border border-border space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span>Epoch Snapshot #0042 ( Clean Boot )</span>
                  <span className="realm-accent-text">FROZEN · IMMUTABLE</span>
                </div>
                <div className="text-muted-foreground">
                  Transactional rollback ready in &lt; 15ms on thermal or memory anomaly.
                </div>
              </div>
            </div>
          )}

          {activeRealm === "helheim" && (
            <div className="space-y-3 font-mono text-xs">
              <h3 className="realm-accent-text uppercase">Gjallarbrú Air-Gapped Quarantine Vault</h3>
              <div className="p-3 rounded-lg bg-black/50 border border-border space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span>Isolated Namespaces</span>
                  <span className="realm-accent-text">0 HOSTILE PAYLOADS</span>
                </div>
                <div className="text-muted-foreground">
                  Seccomp-bpf + unshare airlock active. Network and raw socket syscalls severed.
                </div>
              </div>
            </div>
          )}

          {activeRealm === "valhalla" && (
            <div className="space-y-2 font-mono text-[11px]">
              <div className="realm-accent-text uppercase text-xs mb-2">The Obituaries & Einherjar Recovery</div>
              <div className="p-3 rounded bg-black/60 border border-border text-muted-foreground italic">
                &ldquo;The Void is silent. No daemons have fallen this epoch.&rdquo;
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

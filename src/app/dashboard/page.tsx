"use client"
import { useEffect, useState } from "react"

type Donation = {
    id: string
    type: "one-time" | "recurring"
    amount: number
    currency: string
    status: string
    frequency: string
    donorName: string
    email: string
    companyName: string
    phone: string
    createdAt: number
}

type Stats = {
    totalOneTime: number
    totalMonthlyRecurring: number
    totalFortnightlyRecurring: number
    activeSubscriptions: number
    totalDonations: number
}

function fmt(amount: number) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)
}

function fmtDate(ms: number) {
    return new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(new Date(ms))
}

const BADGE: Record<string, string> = {
    succeeded: "bg-emerald-100 text-emerald-700",
    active: "bg-emerald-100 text-emerald-700",
    canceled: "bg-red-100 text-red-700",
    incomplete: "bg-amber-100 text-amber-700",
    "past_due": "bg-orange-100 text-orange-700",
}

const FREQ_BADGE: Record<string, string> = {
    "one-time": "bg-slate-100 text-slate-600",
    monthly: "bg-violet-100 text-violet-700",
    fortnightly: "bg-cyan-100 text-cyan-700",
    recurring: "bg-blue-100 text-blue-700",
}

export default function DashboardPage() {
    const [stats, setStats] = useState<Stats | null>(null)
    const [donations, setDonations] = useState<Donation[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [filter, setFilter] = useState<"all" | "one-time" | "recurring">("all")
    const [search, setSearch] = useState("")

    useEffect(() => {
        fetch("/api/dashboard")
            .then((r) => r.json())
            .then((data) => {
                if (data.error) { setError(data.error); return }
                setStats(data.stats)
                setDonations(data.donations)
            })
            .catch(() => setError("Failed to load dashboard data"))
            .finally(() => setLoading(false))
    }, [])

    const filtered = donations.filter((d) => {
        const matchType = filter === "all" || d.type === filter
        const q = search.toLowerCase()
        const matchSearch =
            !q ||
            d.donorName.toLowerCase().includes(q) ||
            d.email.toLowerCase().includes(q) ||
            d.companyName.toLowerCase().includes(q)
        return matchType && matchSearch
    })

    return (
        <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#0f172a 0%,#1e293b 100%)", fontFamily: "'Inter',sans-serif", color: "#e2e8f0" }}>
            {/* Header */}
            <header style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "0 2.5rem" }}>
                <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#38bdf8,#818cf8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>💙</div>
                        <span style={{ fontSize: 20, fontWeight: 700, color: "#f1f5f9" }}>Togather</span>
                        <span style={{ marginLeft: 8, padding: "2px 10px", borderRadius: 20, background: "rgba(56,189,248,0.15)", color: "#38bdf8", fontSize: 12, fontWeight: 600 }}>Dashboard</span>
                    </div>
                    <a href="/" style={{ padding: "8px 18px", borderRadius: 10, background: "rgba(255,255,255,0.06)", color: "#94a3b8", fontSize: 14, textDecoration: "none", border: "1px solid rgba(255,255,255,0.1)", transition: "all 0.2s" }}>← Back to Donation Form</a>
                </div>
            </header>

            <main style={{ maxWidth: 1280, margin: "0 auto", padding: "2.5rem 2.5rem" }}>
                <div style={{ marginBottom: "2rem" }}>
                    <h1 style={{ fontSize: 32, fontWeight: 800, color: "#f1f5f9", margin: 0 }}>Donations Overview</h1>
                    <p style={{ color: "#64748b", marginTop: 6, fontSize: 15 }}>Track all one-time and recurring donations in real time.</p>
                </div>

                {loading && (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 400, gap: 16 }}>
                        <div style={{ width: 48, height: 48, border: "4px solid rgba(56,189,248,0.2)", borderTopColor: "#38bdf8", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                        <p style={{ color: "#64748b" }}>Loading dashboard data…</p>
                        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                    </div>
                )}

                {error && (
                    <div style={{ padding: "1.5rem", borderRadius: 16, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#fca5a5", textAlign: "center" }}>
                        ⚠️ {error}
                    </div>
                )}

                {!loading && !error && stats && (
                    <>
                        {/* Stats Cards */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1.25rem", marginBottom: "2.5rem" }}>
                            <StatCard icon="💰" label="One-Time Raised" value={fmt(stats.totalOneTime)} accent="#34d399" />
                            <StatCard icon="🔄" label="Monthly Recurring" value={`${fmt(stats.totalMonthlyRecurring)}/mo`} accent="#818cf8" />
                            <StatCard icon="📅" label="Fortnightly Recurring" value={`${fmt(stats.totalFortnightlyRecurring)}/2wk`} accent="#38bdf8" />
                            <StatCard icon="✅" label="Active Subscriptions" value={String(stats.activeSubscriptions)} accent="#f59e0b" />
                            <StatCard icon="📋" label="Total Donations" value={String(stats.totalDonations)} accent="#f472b6" />
                        </div>

                        {/* Filters & Search */}
                        <div style={{ display: "flex", gap: 12, marginBottom: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
                            <div style={{ display: "flex", gap: 6, background: "rgba(255,255,255,0.05)", padding: 4, borderRadius: 12 }}>
                                {(["all", "one-time", "recurring"] as const).map((f) => (
                                    <button
                                        key={f}
                                        onClick={() => setFilter(f)}
                                        style={{
                                            padding: "7px 18px", borderRadius: 9, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
                                            background: filter === f ? "linear-gradient(135deg,#38bdf8,#818cf8)" : "transparent",
                                            color: filter === f ? "#fff" : "#94a3b8",
                                            transition: "all 0.2s",
                                        }}
                                    >
                                        {f === "all" ? "All" : f === "one-time" ? "One-Time" : "Recurring"}
                                    </button>
                                ))}
                            </div>
                            <input
                                placeholder="Search by name, email or company…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{
                                    flex: 1, minWidth: 240, padding: "10px 16px", borderRadius: 12,
                                    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                                    color: "#e2e8f0", fontSize: 14, outline: "none",
                                }}
                            />
                            <span style={{ color: "#64748b", fontSize: 13 }}>{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
                        </div>

                        {/* Table */}
                        <div style={{ borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden", background: "rgba(255,255,255,0.03)" }}>
                            <div style={{ overflowX: "auto" }}>
                                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                                    <thead>
                                        <tr style={{ background: "rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                                            {["Donor", "Company", "Email", "Amount", "Frequency", "Status", "Date"].map((h) => (
                                                <th key={h} style={{ padding: "14px 18px", textAlign: "left", color: "#64748b", fontWeight: 600, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filtered.length === 0 ? (
                                            <tr>
                                                <td colSpan={7} style={{ padding: "4rem", textAlign: "center", color: "#475569" }}>
                                                    No donations found.
                                                </td>
                                            </tr>
                                        ) : (
                                            filtered.map((d, i) => (
                                                <tr
                                                    key={d.id}
                                                    style={{
                                                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                                                        background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)",
                                                        transition: "background 0.15s",
                                                    }}
                                                >
                                                    <td style={{ padding: "14px 18px", color: "#e2e8f0", fontWeight: 500 }}>
                                                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                            <div style={{
                                                                width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                                                                background: `hsl(${(d.donorName.charCodeAt(0) || 180) * 5},60%,35%)`,
                                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                                fontSize: 13, fontWeight: 700, color: "#fff",
                                                            }}>
                                                                {d.donorName ? d.donorName[0].toUpperCase() : "?"}
                                                            </div>
                                                            {d.donorName || <span style={{ color: "#475569" }}>—</span>}
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: "14px 18px", color: "#94a3b8" }}>{d.companyName || <span style={{ color: "#334155" }}>—</span>}</td>
                                                    <td style={{ padding: "14px 18px", color: "#94a3b8" }}>{d.email || <span style={{ color: "#334155" }}>—</span>}</td>
                                                    <td style={{ padding: "14px 18px", color: "#34d399", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{fmt(d.amount)}</td>
                                                    <td style={{ padding: "14px 18px" }}>
                                                        <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600, ...objStyle(FREQ_BADGE[d.frequency] || FREQ_BADGE.recurring) }}>
                                                            {d.frequency}
                                                        </span>
                                                    </td>
                                                    <td style={{ padding: "14px 18px" }}>
                                                        <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600, ...objStyle(BADGE[d.status] || "bg-slate-100 text-slate-600") }}>
                                                            {d.status}
                                                        </span>
                                                    </td>
                                                    <td style={{ padding: "14px 18px", color: "#64748b", whiteSpace: "nowrap" }}>{fmtDate(d.createdAt)}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    )
}

/** Convert tailwind-ish class string to inline style for bg/text colors */
function objStyle(cls: string): React.CSSProperties {
    const map: Record<string, React.CSSProperties> = {
        "bg-emerald-100 text-emerald-700": { background: "#d1fae5", color: "#065f46" },
        "bg-red-100 text-red-700": { background: "#fee2e2", color: "#b91c1c" },
        "bg-amber-100 text-amber-700": { background: "#fef3c7", color: "#b45309" },
        "bg-orange-100 text-orange-700": { background: "#ffedd5", color: "#c2410c" },
        "bg-slate-100 text-slate-600": { background: "#f1f5f9", color: "#475569" },
        "bg-violet-100 text-violet-700": { background: "#ede9fe", color: "#6d28d9" },
        "bg-cyan-100 text-cyan-700": { background: "#cffafe", color: "#0e7490" },
        "bg-blue-100 text-blue-700": { background: "#dbeafe", color: "#1d4ed8" },
    }
    return map[cls] || { background: "#f1f5f9", color: "#475569" }
}

function StatCard({ icon, label, value, accent }: { icon: string; label: string; value: string; accent: string }) {
    return (
        <div style={{
            padding: "1.5rem", borderRadius: 20, background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)", position: "relative", overflow: "hidden",
        }}>
            <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: accent, opacity: 0.1, filter: "blur(20px)" }} />
            <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
            <p style={{ color: "#64748b", fontSize: 13, fontWeight: 500, margin: 0 }}>{label}</p>
            <p style={{ color: accent, fontSize: 28, fontWeight: 800, margin: "4px 0 0", letterSpacing: "-0.02em" }}>{value}</p>
        </div>
    )
}

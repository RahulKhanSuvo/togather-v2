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
    return new Intl.NumberFormat("en-AU", { style: "currency", currency: "USD" }).format(amount)
}

function fmtDate(ms: number) {
    return new Intl.DateTimeFormat("en-AU", { dateStyle: "medium", timeStyle: "short" }).format(new Date(ms))
}

const STATUS_STYLE: Record<string, { bg: string; color: string; label: string }> = {
    succeeded:  { bg: "#d1fae5", color: "#065f46", label: "Succeeded" },
    active:     { bg: "#d1fae5", color: "#065f46", label: "Active" },
    canceled:   { bg: "#fee2e2", color: "#b91c1c", label: "Canceled" },
    incomplete: { bg: "#fef3c7", color: "#b45309", label: "Incomplete" },
    past_due:   { bg: "#ffedd5", color: "#c2410c", label: "Past Due" },
}

const FREQ_STYLE: Record<string, { bg: string; color: string }> = {
    "one-time":   { bg: "#e5f1f6", color: "#006F95" },
    monthly:      { bg: "#ede9fe", color: "#6d28d9" },
    fortnightly:  { bg: "#cffafe", color: "#0e7490" },
    recurring:    { bg: "#dbeafe", color: "#1d4ed8" },
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
        <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter', sans-serif", color: "#5A7184" }}>

            {/* Hero Header — matches home page hero */}
            <div style={{ display: "flex", flexDirection: "row", height: 200 }}>
                {/* Left teal band */}
                <div style={{
                    width: "55%", background: "#00AAB3",
                    display: "flex", alignItems: "center",
                    paddingLeft: "10%", paddingRight: "5%",
                }}>
                    <div>
                        <h1 style={{ color: "#fff", fontSize: 36, fontWeight: 800, fontStyle: "italic", lineHeight: 1.1, margin: 0 }}>
                            Donations Dashboard
                        </h1>
                        <p style={{ color: "rgba(255,255,255,0.75)", marginTop: 10, fontSize: 15, fontStyle: "normal", fontWeight: 400 }}>
                            Track all one-time and recurring donations in real time.
                        </p>
                    </div>
                </div>

                {/* Right — logo band */}
                <div style={{
                    width: "45%", background: "#E8F4F6", position: "relative",
                    display: "flex", alignItems: "center", justifyContent: "flex-end",
                    paddingRight: "5%",
                }}>
                    {/* Brand badge */}
                    <div style={{
                        background: "#fff", padding: "14px 28px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                        display: "flex", alignItems: "center", gap: 24,
                    }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <span style={{ color: "#2F4A5D", fontWeight: 700, fontSize: 18, lineHeight: 1 }}>princescourt</span>
                            <span style={{ fontSize: 9, letterSpacing: "0.15em", color: "#5A7184", textTransform: "uppercase", marginTop: 4 }}>Community Living</span>
                        </div>
                        <div style={{ width: 1, height: 40, background: "#D4E3EC" }} />
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                            <span style={{ color: "#00AAB3", fontWeight: 700, fontSize: 22, lineHeight: 1 }}>
                                t<span style={{ color: "#2F4A5D" }}>♥</span>gether
                            </span>
                            <span style={{ fontSize: 9, color: "#00AAB3", fontStyle: "italic", marginTop: 4 }}>we build. we care. we thrive.</span>
                        </div>
                    </div>

                    {/* Back link */}
                    <a href="/" style={{
                        position: "absolute", bottom: 16, right: 24,
                        fontSize: 13, color: "#006F95", textDecoration: "none", fontWeight: 600,
                        display: "flex", alignItems: "center", gap: 6,
                        padding: "6px 14px", border: "1px solid #D4E3EC", borderRadius: 20,
                        background: "#fff", transition: "all 0.2s",
                    }}>
                        ← Back to Donation Form
                    </a>
                </div>
            </div>

            {/* Main Content */}
            <main style={{ maxWidth: 1280, margin: "0 auto", padding: "2.5rem 2.5rem" }}>

                {/* Loading */}
                {loading && (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 400, gap: 16 }}>
                        <div style={{
                            width: 48, height: 48, borderRadius: "50%",
                            border: "4px solid #D4E3EC", borderTopColor: "#00AAB3",
                            animation: "spin 0.8s linear infinite",
                        }} />
                        <p style={{ color: "#5A7184" }}>Loading dashboard data…</p>
                        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div style={{
                        padding: "1.5rem", borderRadius: 18, background: "#fee2e2",
                        border: "1px solid #fca5a5", color: "#b91c1c", textAlign: "center",
                        marginTop: "2rem",
                    }}>
                        ⚠️ {error}
                    </div>
                )}

                {!loading && !error && stats && (
                    <>
                        {/* Section title */}
                        <div style={{ marginBottom: "1.5rem" }}>
                            <h2 style={{ fontSize: 28, fontWeight: 800, color: "#2F4A5D", margin: 0 }}>Overview</h2>
                            <div style={{ width: 56, height: 5, background: "#006F95", borderRadius: 3, marginTop: 8 }} />
                        </div>

                        {/* Stats Cards */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "1.25rem", marginBottom: "2.5rem" }}>
                            <StatCard label="One-Time Raised" value={fmt(stats.totalOneTime)} accent="#00AAB3" icon="💰" />
                            <StatCard label="Monthly Recurring" value={`${fmt(stats.totalMonthlyRecurring)}/mo`} accent="#6d28d9" icon="🔄" />
                            <StatCard label="Fortnightly Recurring" value={`${fmt(stats.totalFortnightlyRecurring)}/2wk`} accent="#006F95" icon="📅" />
                            <StatCard label="Active Subscriptions" value={String(stats.activeSubscriptions)} accent="#f59e0b" icon="✅" />
                            <StatCard label="Total Donations" value={String(stats.totalDonations)} accent="#A02060" icon="📋" />
                        </div>

                        {/* Section title */}
                        <div style={{ marginBottom: "1.5rem" }}>
                            <h2 style={{ fontSize: 28, fontWeight: 800, color: "#2F4A5D", margin: 0 }}>All Donations</h2>
                            <div style={{ width: 56, height: 5, background: "#006F95", borderRadius: 3, marginTop: 8 }} />
                        </div>

                        {/* Filters & Search */}
                        <div style={{ display: "flex", gap: 12, marginBottom: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
                            {/* Filter pills */}
                            <div style={{
                                display: "flex", gap: 6,
                                background: "#fff", padding: 4,
                                borderRadius: 18, border: "1px solid #D4E3EC",
                            }}>
                                {(["all", "one-time", "recurring"] as const).map((f) => (
                                    <button
                                        key={f}
                                        onClick={() => setFilter(f)}
                                        style={{
                                            padding: "7px 20px", borderRadius: 14, border: "none", cursor: "pointer",
                                            fontSize: 13, fontWeight: 600,
                                            background: filter === f ? "#00AAB3" : "transparent",
                                            color: filter === f ? "#fff" : "#5A7184",
                                            transition: "all 0.2s",
                                        }}
                                    >
                                        {f === "all" ? "All" : f === "one-time" ? "One-Time" : "Recurring"}
                                    </button>
                                ))}
                            </div>

                            {/* Search */}
                            <input
                                placeholder="Search by name, email or company…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{
                                    flex: 1, minWidth: 240, padding: "10px 18px", borderRadius: 18,
                                    background: "#fff", border: "1px solid #D4E3EC",
                                    color: "#2F4A5D", fontSize: 14, outline: "none",
                                    fontFamily: "inherit",
                                }}
                            />

                            <span style={{ color: "#9AAAB7", fontSize: 13 }}>
                                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
                            </span>
                        </div>

                        {/* Table Card */}
                        <div style={{
                            borderRadius: 24, border: "2px solid #D4E3EC",
                            overflow: "hidden", background: "#fff",
                            boxShadow: "0 4px 24px rgba(0,119,163,0.06)",
                        }}>
                            <div style={{ overflowX: "auto" }}>
                                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                                    <thead>
                                        <tr style={{ background: "#f0f8f9", borderBottom: "1px solid #D4E3EC" }}>
                                            {["Donor", "Company", "Email", "Amount", "Frequency", "Status", "Date"].map((h) => (
                                                <th key={h} style={{
                                                    padding: "14px 18px", textAlign: "left",
                                                    color: "#5A7184", fontWeight: 700, fontSize: 11,
                                                    textTransform: "uppercase", letterSpacing: "0.07em", whiteSpace: "nowrap",
                                                }}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filtered.length === 0 ? (
                                            <tr>
                                                <td colSpan={7} style={{ padding: "4rem", textAlign: "center", color: "#9AAAB7" }}>
                                                    No donations found.
                                                </td>
                                            </tr>
                                        ) : (
                                            filtered.map((d, i) => {
                                                const statusStyle = STATUS_STYLE[d.status] || { bg: "#f1f5f9", color: "#5A7184", label: d.status }
                                                const freqStyle = FREQ_STYLE[d.frequency] || FREQ_STYLE.recurring
                                                const initials = d.donorName ? d.donorName[0].toUpperCase() : "?"
                                                const avatarHue = (d.donorName.charCodeAt(0) || 180) * 5

                                                return (
                                                    <tr
                                                        key={d.id}
                                                        style={{
                                                            borderBottom: "1px solid #EFF4F7",
                                                            background: i % 2 === 0 ? "#fff" : "#fafcfd",
                                                            transition: "background 0.15s",
                                                        }}
                                                        onMouseEnter={e => (e.currentTarget.style.background = "#f0f8f9")}
                                                        onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? "#fff" : "#fafcfd")}
                                                    >
                                                        {/* Donor */}
                                                        <td style={{ padding: "14px 18px", color: "#2F4A5D", fontWeight: 600 }}>
                                                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                                <div style={{
                                                                    width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
                                                                    background: `hsl(${avatarHue},50%,85%)`,
                                                                    border: `2px solid hsl(${avatarHue},50%,72%)`,
                                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                                    fontSize: 13, fontWeight: 700,
                                                                    color: `hsl(${avatarHue},50%,30%)`,
                                                                }}>
                                                                    {initials}
                                                                </div>
                                                                {d.donorName || <span style={{ color: "#9AAAB7" }}>—</span>}
                                                            </div>
                                                        </td>

                                                        {/* Company */}
                                                        <td style={{ padding: "14px 18px", color: "#718A9E" }}>
                                                            {d.companyName || <span style={{ color: "#C4D3DC" }}>—</span>}
                                                        </td>

                                                        {/* Email */}
                                                        <td style={{ padding: "14px 18px", color: "#718A9E" }}>
                                                            {d.email || <span style={{ color: "#C4D3DC" }}>—</span>}
                                                        </td>

                                                        {/* Amount */}
                                                        <td style={{ padding: "14px 18px", color: "#006F95", fontWeight: 700, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>
                                                            {fmt(d.amount)}
                                                        </td>

                                                        {/* Frequency */}
                                                        <td style={{ padding: "14px 18px" }}>
                                                            <span style={{
                                                                padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                                                                background: freqStyle.bg, color: freqStyle.color,
                                                                textTransform: "capitalize", letterSpacing: "0.03em",
                                                            }}>
                                                                {d.frequency}
                                                            </span>
                                                        </td>

                                                        {/* Status */}
                                                        <td style={{ padding: "14px 18px" }}>
                                                            <span style={{
                                                                padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                                                                background: statusStyle.bg, color: statusStyle.color,
                                                                textTransform: "capitalize", letterSpacing: "0.03em",
                                                            }}>
                                                                {statusStyle.label}
                                                            </span>
                                                        </td>

                                                        {/* Date */}
                                                        <td style={{ padding: "14px 18px", color: "#9AAAB7", whiteSpace: "nowrap", fontSize: 13 }}>
                                                            {fmtDate(d.createdAt)}
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </main>

            {/* Footer — matches home page */}
            <div style={{ borderTop: "1px solid #D4E3EC", marginTop: 48, paddingTop: 48, paddingBottom: 48, background: "#fff" }}>
                <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem", display: "flex", flexDirection: "row", alignItems: "flex-start", gap: 48 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <span style={{ fontSize: 10, color: "#5A7184", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.15em" }}>Powered by</span>
                        <span style={{ fontWeight: 700, fontSize: 28, color: "#000" }}>Shout.</span>
                    </div>
                    <div style={{ fontSize: 11, color: "#9AAAB7", maxWidth: 760, lineHeight: 1.7, fontWeight: 300 }}>
                        Shout fundraising services are provided by Shout for Good Pty Ltd (Shout) ABN: 45 163 218 639. Our donation forms provide secure donations between donor and charities. Shout is part of the ANZ Group but is not a bank. Obligations of Shout are not deposits or liabilities of ANZ. ANZ does not stand behind or guarantee Shout or its obligations.
                        <div style={{ textAlign: "center", marginTop: 24 }}>Copyright © 2026</div>
                    </div>
                </div>
            </div>

            {/* Accessibility tab */}
            <div style={{
                position: "fixed", right: 0, bottom: 128,
                background: "#A02060", color: "#fff",
                paddingTop: 12, paddingBottom: 12, paddingLeft: 6, paddingRight: 6,
                borderRadius: "6px 0 0 6px",
                writingMode: "vertical-rl", textOrientation: "mixed",
                zIndex: 50,
            }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em" }}>Accessibility</span>
            </div>
        </div>
    )
}

function StatCard({ icon, label, value, accent }: { icon: string; label: string; value: string; accent: string }) {
    return (
        <div style={{
            padding: "1.5rem",
            borderRadius: 24,
            background: "#fff",
            border: "2px solid #D4E3EC",
            boxShadow: "0 2px 12px rgba(0,119,163,0.05)",
            position: "relative",
            overflow: "hidden",
        }}>
            {/* Accent bar on left */}
            <div style={{
                position: "absolute", left: 0, top: 0, bottom: 0,
                width: 5, background: accent, borderRadius: "0 0 0 0",
            }} />

            <div style={{ paddingLeft: 12 }}>
                <div style={{ fontSize: 26, marginBottom: 10 }}>{icon}</div>
                <p style={{ color: "#9AAAB7", fontSize: 12, fontWeight: 600, margin: 0, textTransform: "uppercase", letterSpacing: "0.07em" }}>{label}</p>
                <p style={{ color: "#2F4A5D", fontSize: 26, fontWeight: 800, margin: "6px 0 0", letterSpacing: "-0.02em" }}>{value}</p>
            </div>
        </div>
    )
}

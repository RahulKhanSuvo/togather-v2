import { stripe } from "@/libs/stripe"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        // Fetch one-time payment intents (succeeded)
        const paymentIntents = await stripe.paymentIntents.list({
            limit: 100,
        })

        const oneTimeDonations = paymentIntents.data
            .filter((pi) => pi.status === "succeeded" && !pi.invoice)
            .map((pi) => ({
                id: pi.id,
                type: "one-time" as const,
                amount: pi.amount / 100,
                currency: pi.currency,
                status: pi.status,
                frequency: pi.metadata?.frequency || "one-time",
                donorName: `${pi.metadata?.donerFirstName || ""} ${pi.metadata?.donerLastName || ""}`.trim(),
                email: pi.metadata?.email || "",
                companyName: pi.metadata?.companyName || "",
                phone: pi.metadata?.donerPhoneNumber || "",
                createdAt: pi.created * 1000,
            }))

        // Fetch subscriptions
        const subscriptions = await stripe.subscriptions.list({
            limit: 100,
            expand: ["data.latest_invoice"],
        })

        const recurringDonations = subscriptions.data.map((sub) => ({
            id: sub.id,
            type: "recurring" as const,
            amount: (sub.items.data[0]?.price?.unit_amount || 0) / 100,
            currency: sub.items.data[0]?.price?.currency || "usd",
            status: sub.status,
            frequency: sub.metadata?.frequency || "recurring",
            donorName: `${sub.metadata?.donerFirstName || ""} ${sub.metadata?.donerLastName || ""}`.trim(),
            email: sub.metadata?.email || "",
            companyName: sub.metadata?.companyName || "",
            phone: sub.metadata?.donerPhoneNumber || "",
            createdAt: sub.created * 1000,
        }))

        const allDonations = [...oneTimeDonations, ...recurringDonations].sort(
            (a, b) => b.createdAt - a.createdAt
        )

        const totalOneTime = oneTimeDonations.reduce((sum, d) => sum + d.amount, 0)
        const totalMonthlyRecurring = recurringDonations
            .filter((d) => d.status === "active" && d.frequency === "monthly")
            .reduce((sum, d) => sum + d.amount, 0)
        const totalFortnightlyRecurring = recurringDonations
            .filter((d) => d.status === "active" && d.frequency === "fortnightly")
            .reduce((sum, d) => sum + d.amount, 0)
        const activeSubscriptions = recurringDonations.filter((d) => d.status === "active").length

        return NextResponse.json({
            stats: {
                totalOneTime,
                totalMonthlyRecurring,
                totalFortnightlyRecurring,
                activeSubscriptions,
                totalDonations: allDonations.length,
            },
            donations: allDonations,
        })
    } catch (error) {
        console.error("Dashboard API error:", error)
        return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 })
    }
}

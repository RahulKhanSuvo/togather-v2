import { sendMail } from "@/libs/sendMail"
import { stripe } from "@/libs/stripe"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { paymentIntentId, subscriptionId } = await req.json()

        // ── Recurring: verify via subscription ───────────────────────────
        if (subscriptionId) {
            const subscription = await stripe.subscriptions.retrieve(subscriptionId)
            const meta = subscription.metadata

            if (!meta?.email) {
                return NextResponse.json({ error: "No email in subscription metadata" }, { status: 400 })
            }

            // Only send if the subscription is active (first payment went through)
            if (subscription.status !== "active" && subscription.status !== "trialing") {
                return NextResponse.json({ error: "Subscription not active yet" }, { status: 400 })
            }

            await sendMail({
                to: meta.email,
                subject: "Your recurring donation is active! 💙",
                html: `
                    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1e293b">
                        <h2 style="color:#006F95">Thank you for your recurring donation!</h2>
                        <p>Your <strong>${meta.frequency}</strong> donation has been set up successfully.</p>
                        <table style="width:100%;border-collapse:collapse;margin-top:16px">
                            <tr><td style="padding:8px 0;color:#64748b;width:160px">Amount</td><td style="padding:8px 0;font-weight:600">$${meta.amount} / ${meta.frequency}</td></tr>
                            <tr><td style="padding:8px 0;color:#64748b">Donor Name</td><td style="padding:8px 0;font-weight:600">${meta.donerFirstName} ${meta.donerLastName}</td></tr>
                            <tr><td style="padding:8px 0;color:#64748b">Company</td><td style="padding:8px 0">${meta.companyName || "—"}</td></tr>
                            <tr><td style="padding:8px 0;color:#64748b">Phone</td><td style="padding:8px 0">${meta.donerPhoneNumber || "—"}</td></tr>
                            <tr><td style="padding:8px 0;color:#64748b">Subscription ID</td><td style="padding:8px 0;font-size:12px;color:#94a3b8">${subscriptionId}</td></tr>
                        </table>
                        <p style="margin-top:24px;color:#64748b;font-size:13px">You will be charged automatically on your chosen schedule. Thank you for your generosity!</p>
                    </div>
                `,
            })

            return NextResponse.json({ success: true, type: "recurring" })
        }

        // ── One-time: verify via payment intent ───────────────────────────
        if (paymentIntentId) {
            const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
            const meta = paymentIntent.metadata

            if (!meta?.email) {
                return NextResponse.json({ error: "No email in payment metadata" }, { status: 400 })
            }

            if (paymentIntent.status !== "succeeded") {
                return NextResponse.json({ error: "Payment not succeeded" }, { status: 400 })
            }

            const amount = (paymentIntent.amount / 100).toFixed(2)

            await sendMail({
                to: meta.email,
                subject: "Thank you for your donation! 💙",
                html: `
                    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1e293b">
                        <h2 style="color:#006F95">Payment Received!</h2>
                        <p>Your one-time donation was processed successfully.</p>
                        <table style="width:100%;border-collapse:collapse;margin-top:16px">
                            <tr><td style="padding:8px 0;color:#64748b;width:160px">Amount</td><td style="padding:8px 0;font-weight:600">$${amount}</td></tr>
                            <tr><td style="padding:8px 0;color:#64748b">Donor Name</td><td style="padding:8px 0;font-weight:600">${meta.donerFirstName} ${meta.donerLastName}</td></tr>
                            <tr><td style="padding:8px 0;color:#64748b">Company</td><td style="padding:8px 0">${meta.companyName || "—"}</td></tr>
                            <tr><td style="padding:8px 0;color:#64748b">Phone</td><td style="padding:8px 0">${meta.donerPhoneNumber || "—"}</td></tr>
                            <tr><td style="padding:8px 0;color:#64748b">Payment ID</td><td style="padding:8px 0;font-size:12px;color:#94a3b8">${paymentIntentId}</td></tr>
                        </table>
                        <p style="margin-top:24px;color:#64748b;font-size:13px">Thank you for your generosity!</p>
                    </div>
                `,
            })

            return NextResponse.json({ success: true, type: "one-time" })
        }

        return NextResponse.json({ error: "paymentIntentId or subscriptionId required" }, { status: 400 })
    } catch (error) {
        console.error("Confirm & send mail error:", error)
        return NextResponse.json({ error: "Failed to send confirmation email" }, { status: 500 })
    }
}

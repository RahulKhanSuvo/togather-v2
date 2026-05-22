import { sendMail } from "@/libs/sendMail"
import { stripe } from "@/libs/stripe"
import { NextResponse } from "next/server"
export const runtime = "nodejs"

export async function POST(req: Request) {
    const sig = req.headers.get("stripe-signature")
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    if (!sig || !webhookSecret) {
        return NextResponse.json({
            message: "stripe signature or webhook secret is missing"
        }, { status: 400 })
    }
    const body = await req.text()
    try {
        const event = stripe.webhooks.constructEvent(body, sig, webhookSecret)

        switch (event.type) {
            // ─── One-time donation succeeded ─────────────────────────────
            case "payment_intent.succeeded": {
                const paymentIntent = event.data.object
                // Skip if this PaymentIntent belongs to a subscription invoice
                // (those are handled by invoice.payment_succeeded below)
                if (paymentIntent.invoice) break

                console.log("One-time payment succeeded:", paymentIntent.id)
                await sendMail({
                    to: paymentIntent.metadata?.email!,
                    subject: "Thank you for your donation!",
                    html: `
                        <p>Your one-time payment was successful.</p>
                        <p><strong>Amount:</strong> $${paymentIntent.metadata?.amount}</p>
                        <p><strong>Company:</strong> ${paymentIntent.metadata?.companyName}</p>
                        <p><strong>Name:</strong> ${paymentIntent.metadata?.donerFirstName} ${paymentIntent.metadata?.donerLastName}</p>
                        <p><strong>Phone:</strong> ${paymentIntent.metadata?.donerPhoneNumber}</p>
                    `,
                })
                break
            }

            // ─── Recurring subscription charge succeeded ──────────────────
            case "invoice.payment_succeeded": {
                const invoice = event.data.object as any
                // Only process subscription invoices
                if (!invoice.subscription) break

                const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string)
                const meta = subscription.metadata

                console.log("Recurring payment succeeded for subscription:", subscription.id)

                if (meta?.email) {
                    const isFirst = invoice.billing_reason === "subscription_create"
                    await sendMail({
                        to: meta.email,
                        subject: isFirst
                            ? "Your recurring donation is active!"
                            : "Your recurring donation payment was received",
                        html: `
                            <p>${isFirst ? "Your recurring donation has been set up and the first payment processed." : "A scheduled recurring donation payment was processed."}</p>
                            <p><strong>Amount:</strong> $${meta?.amount}</p>
                            <p><strong>Frequency:</strong> ${meta?.frequency}</p>
                            <p><strong>Company:</strong> ${meta?.companyName}</p>
                            <p><strong>Name:</strong> ${meta?.donerFirstName} ${meta?.donerLastName}</p>
                            <p><strong>Phone:</strong> ${meta?.donerPhoneNumber}</p>
                            <p><strong>Subscription ID:</strong> ${subscription.id}</p>
                        `,
                    })
                }
                break
            }

            // ─── Subscription cancelled ───────────────────────────────────
            case "customer.subscription.deleted": {
                const subscription = event.data.object
                const meta = subscription.metadata
                console.log("Subscription cancelled:", subscription.id)

                if (meta?.email) {
                    await sendMail({
                        to: meta.email,
                        subject: "Your recurring donation has been cancelled",
                        html: `
                            <p>Your ${meta?.frequency} recurring donation has been cancelled.</p>
                            <p>If you believe this is a mistake, please contact us.</p>
                        `,
                    })
                }
                break
            }

            default: {
                console.log("Unhandled event type:", event.type)
            }
        }

        return NextResponse.json({ received: true }, { status: 200 })
    } catch (error) {
        console.error("Webhook error:", error)
        return NextResponse.json({ error: "Webhook handler failed" }, { status: 400 })
    }
}
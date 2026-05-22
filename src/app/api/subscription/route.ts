import { stripe } from "@/libs/stripe"
import { NextResponse } from "next/server"

// Map UI frequency values to Stripe recurring interval params
const INTERVAL_MAP: Record<string, { interval: "week" | "month"; interval_count: number }> = {
    fortnightly: { interval: "week", interval_count: 2 },
    monthly: { interval: "month", interval_count: 1 },
}

export async function POST(req: Request) {
    try {
        const {
            amount,
            frequency,
            firstName,
            lastName,
            notifySomeone,
            companyName,
            donerFirstName,
            donerLastName,
            email,
            donerPhoneNumber,
        } = await req.json()

        const intervalConfig = INTERVAL_MAP[frequency]
        if (!intervalConfig) {
            return NextResponse.json({ error: "Invalid frequency for subscription" }, { status: 400 })
        }

        // 1. Create a Stripe Customer
        const customer = await stripe.customers.create({
            email,
            name: `${donerFirstName} ${donerLastName}`.trim(),
            metadata: {
                firstName,
                lastName,
                notifySomeone: String(notifySomeone),
                companyName,
                donerFirstName,
                donerLastName,
                donerPhoneNumber,
            },
        })

        // 2. Create a recurring Price on-the-fly
        const price = await stripe.prices.create({
            unit_amount: Math.round(Number(amount) * 100),
            currency: "usd",
            recurring: {
                interval: intervalConfig.interval,
                interval_count: intervalConfig.interval_count,
            },
            product_data: {
                name: `Donation – ${frequency}`,
            },
        })

        // 3. Create the Subscription with default_incomplete so we get a
        //    PaymentIntent for the first charge that the client can confirm.
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ price: price.id }],
            payment_behavior: "default_incomplete",
            payment_settings: {
                save_default_payment_method: "on_subscription",
                payment_method_types: ["card"],
            },
            expand: ["latest_invoice.payment_intent"],
            metadata: {
                firstName,
                lastName,
                notifySomeone: String(notifySomeone),
                frequency,
                amount: String(amount),
                companyName,
                donerFirstName,
                donerLastName,
                email,
                donerPhoneNumber,
            },
        })

        // Extract the client_secret from the first invoice's PaymentIntent
        const invoice = subscription.latest_invoice as {
            payment_intent?: { client_secret: string | null }
        }
        const clientSecret = invoice?.payment_intent?.client_secret

        if (!clientSecret) {
            return NextResponse.json({ error: "Failed to retrieve payment client secret" }, { status: 500 })
        }

        return NextResponse.json(
            { clientSecret, subscriptionId: subscription.id },
            { status: 200 }
        )
    } catch (error) {
        console.error("Subscription creation error:", error)
        return NextResponse.json({ error: "Subscription creation failed" }, { status: 500 })
    }
}

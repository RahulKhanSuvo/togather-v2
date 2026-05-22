import { stripe } from "@/libs/stripe"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { amount, frequency, firstName, lastName, notifySomeone } = await req.json()
        console.log(amount, frequency, firstName, lastName, notifySomeone)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Number(amount) * 100,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: "never",
            }
        })
        return NextResponse.json({ clientSecret: paymentIntent.client_secret }, { status: 200 })


    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Payment intent creation failed" }, { status: 500 })
    }
}
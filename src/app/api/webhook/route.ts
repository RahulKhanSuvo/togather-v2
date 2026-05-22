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
        const event = stripe.webhooks.constructEvent(
            body,
            sig,
            webhookSecret
        )
        switch (event.type) {
            case "payment_intent.succeeded": {
                const paymentIntent = event.data.object
                sendMail({
                    to: paymentIntent.metadata?.email!,
                    subject: "Payment Succeeded",
                    html: `<p>Payment Succeeded</p>
                    <p>Amount: ${paymentIntent.metadata?.amount}</p>
                    <p>Frequency: ${paymentIntent.metadata?.frequency}</p>
                    <p>Company Name: ${paymentIntent.metadata?.companyName}</p>
                    <p>First Name: ${paymentIntent.metadata?.donerFirstName}</p>
                    <p>Last Name: ${paymentIntent.metadata?.donerLastName}</p>
                    <p>Phone Number: ${paymentIntent.metadata?.donerPhoneNumber}</p>
                    `,
                })
            }
            default: {
                console.log(event.type)
            }
        }
        return NextResponse.json({
            received: true
        }, { status: 200 })
    } catch (error) {
        console.log(error)

    }

}
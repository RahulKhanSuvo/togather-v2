import { stripe } from "@/libs/stripe"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { amount, frequency, firstName, lastName, notifySomeone, companyName, donerFirstName, donerLastName, email, donerPhoneNumber } = await req.json()
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Number(amount) * 100,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: "never",
            },
            metadata: {
                firstName: firstName,
                lastName: lastName,
                notifySomeone: notifySomeone,
                frequency: frequency,
                amount: amount,
                companyName: companyName,
                donerFirstName: donerFirstName,
                donerLastName: donerLastName,
                email: email,
                donerPhoneNumber: donerPhoneNumber
            }
        })
        return NextResponse.json({ clientSecret: paymentIntent.client_secret }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Payment intent creation failed" }, { status: 500 })
    }
}
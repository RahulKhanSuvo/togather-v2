"use client"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
export default function CheckOutModal({ amount, frequency, firstName, lastName, notifySomeone, setIsModalOpen }: { amount: string, frequency: string, firstName: string, lastName: string, notifySomeone: boolean, setIsModalOpen: (value: boolean) => void }) {
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
    const handelSubmit = async () => {
        const res = await axios.post('/api/payment', {
            amount: amount,
            frequency: frequency,
            firstName: firstName,
            lastName: lastName,
            notifySomeone: notifySomeone
        })
    }
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-xl">
                <Elements stripe={stripePromise}>

                </Elements>
            </div>
        </div>
    )
}

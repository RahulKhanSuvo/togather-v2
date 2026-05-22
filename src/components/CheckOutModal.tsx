"use client"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
export default function CheckOutModal({ amount, frequency, firstName, lastName, notifySomeone, setIsModalOpen }: { amount: string, frequency: string, firstName: string, lastName: string, notifySomeone: boolean, setIsModalOpen: (value: boolean) => void }) {
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black/10 backdrop-blur-md bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8  w-full max-w-md rounded-xl">
                <Elements stripe={stripePromise}>
                    <CheckoutForm firstName={firstName} lastName={lastName} notifySomeone={notifySomeone} setIsModalOpen={setIsModalOpen} amount={amount} frequency={frequency} />
                </Elements>
                <button onClick={() => setIsModalOpen(false)}>cancel</button>
            </div>
        </div>
    )
}

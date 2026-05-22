"use client"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
export default function CheckOutModal({ amount, frequency, firstName, lastName, notifySomeone, setIsModalOpen }: { amount: string, frequency: string, firstName: string, lastName: string, notifySomeone: boolean, setIsModalOpen: (value: boolean) => void }) {

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black/10 backdrop-blur-md bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8  w-full max-w-md rounded-xl">

                <button onClick={() => setIsModalOpen(false)}>cancel</button>
            </div>
        </div>
    )
}

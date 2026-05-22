import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useState } from "react";

export default function StepThree({ amount, frequency, firstName, lastName, notifySomeone }: { amount: string, frequency: string, firstName: string, lastName: string, notifySomeone: boolean }) {
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
    const [companyName, setCompanyName] = useState("");
    const [donerFirstName, setDonerFirstName] = useState("");
    const [donerLastName, setDonerLastName] = useState("");
    const [email, setEmail] = useState("");
    const [donerPhoneNumber, setDonerPhoneNumber] = useState("");

    return (
        <div>
            {/* doner and compay info */}
            <div className="grid grid-cols-2 gap-4">
                <input className="
            h-[78px]
            rounded-[18px]
            border
            border-[#D4E3EC]
            px-6
            text-[24px]
            text-[#5A7184]
            outline-none
            focus:border-[#0077A3]
          " type="text" placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                <input className="
            h-[78px]
            rounded-[18px]
            border
            border-[#D4E3EC]
            px-6
            text-[24px]
            text-[#5A7184]
            outline-none
            focus:border-[#0077A3]
          " type="text" placeholder=" First Name" value={donerFirstName} onChange={(e) => setDonerFirstName(e.target.value)} />
                <input className="
            h-[78px]
            rounded-[18px]
            border
            border-[#D4E3EC]
            px-6
            text-[24px]
            text-[#5A7184]
            outline-none
            focus:border-[#0077A3]
          " type="text" placeholder="Last Name" value={donerLastName} onChange={(e) => setDonerLastName(e.target.value)} />
                <input className="
            h-[78px]
            rounded-[18px]
            border
            border-[#D4E3EC]
            px-6
            text-[24px]
            text-[#5A7184]
            outline-none
            focus:border-[#0077A3]
          " type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="
            h-[78px]
            rounded-[18px]
            border
            border-[#D4E3EC]
            px-6
            text-[24px]
            text-[#5A7184]
            outline-none
            focus:border-[#0077A3]
          " type="text" placeholder="Phone Number" value={donerPhoneNumber} onChange={(e) => setDonerPhoneNumber(e.target.value)} />
            </div>
            <Elements stripe={stripePromise}>
                <CheckoutForm firstName={firstName} lastName={lastName} notifySomeone={notifySomeone} amount={amount} frequency={frequency} companyName={companyName} donerFirstName={donerFirstName} donerLastName={donerLastName} email={email} donerPhoneNumber={donerPhoneNumber} />
            </Elements>
        </div>
    )
}

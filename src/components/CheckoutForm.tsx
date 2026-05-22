import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

export default function CheckoutForm({
    amount,
    frequency,
    firstName,
    lastName,
    notifySomeone,
    companyName, donerFirstName, donerLastName, email, donerPhoneNumber
}: {
    amount: string;
    frequency: string;
    firstName: string;
    lastName: string;
    notifySomeone: boolean;
    companyName: string;
    donerFirstName: string;
    donerLastName: string;
    email: string;
    donerPhoneNumber: string;
}) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const handlePlay = async () => {
        try {
            if (!stripe || !elements) {
                console.log("stripe and element is not provide");
                return;
            }
            setLoading(true);
            const res = await fetch("/api/payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: amount,
                    frequency: frequency,
                    firstName: firstName,
                    lastName: lastName,
                    notifySomeone: notifySomeone,
                    companyName: companyName,
                    donerFirstName: donerFirstName,
                    donerLastName: donerLastName,
                    email: email,
                    donerPhoneNumber: donerPhoneNumber
                }),
            });
            const data = await res.json();
            const cardElements = elements.getElement(CardElement);
            if (!cardElements) {
                console.log("no card element");
                return;
            }
            const result = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: cardElements,
                },
            });
            if (result.error) {
                console.log("payment fail");
                alert("payment fail");
            }
            if (result.paymentIntent?.status === "succeeded") {
                console.log("payment done");
                alert("payment done");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="border"> <CardElement options={{
                hidePostalCode: true,
                style: {
                    base: {
                        fontSize: "24px",
                        color: "#5A7184",

                    }
                }
            }} /></div>
            <button className="
            h-[78px]
            min-w-[250px]
            rounded-[20px]
            bg-[#006F95]
            text-white
            text-[22px]
            font-semibold
            uppercase
            tracking-wide
            hover:opacity-90
            transition
          "onClick={handlePlay} disabled={!stripe || loading}>
                {loading ? "Loading..." : "pay now"}
            </button>
        </div>
    );
}
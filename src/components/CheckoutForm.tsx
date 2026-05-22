import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

export default function CheckoutForm() {
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
                    amount: 50,
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
            <CardElement />
            <button onClick={handlePlay} disabled={!stripe || loading}>
                {loading ? "Loading..." : "pay now"}
            </button>
        </div>
    );
}
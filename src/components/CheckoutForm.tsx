import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

export default function CheckoutForm({
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

    const isRecurring = frequency === "fortnightly" || frequency === "monthly";

    const handlePlay = async () => {
        try {
            if (!stripe || !elements) {
                console.log("stripe and element is not provided");
                return;
            }

            setLoading(true);

            const payload = {
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
            };

            // Route to subscription API for recurring, payment API for one-time
            const apiEndpoint = isRecurring ? "/api/subscription" : "/api/payment";

            const res = await fetch(apiEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok || !data.clientSecret) {
                console.error("Failed to create payment:", data.error);
                alert("Payment setup failed. Please try again.");
                return;
            }

            const cardElements = elements.getElement(CardElement);
            if (!cardElements) {
                console.log("no card element");
                return;
            }

            // confirmCardPayment works for both one-time PaymentIntents
            // and subscription first-invoice PaymentIntents
            const result = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: cardElements,
                    billing_details: {
                        name: `${donerFirstName} ${donerLastName}`.trim(),
                        email,
                    },
                },
            });

            if (result.error) {
                console.error("Payment failed:", result.error.message);
                alert(`Payment failed: ${result.error.message}`);
            } else if (result.paymentIntent?.status === "succeeded") {
                const msg = isRecurring
                    ? `Your ${frequency} donation of $${amount} has been set up successfully!`
                    : `Payment of $${amount} succeeded!`;
                console.log("Payment succeeded", result.paymentIntent);
                alert(msg);
            }
        } catch (error) {
            console.error("Unexpected error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="border">
                <CardElement
                    options={{
                        hidePostalCode: true,
                        style: {
                            base: {
                                fontSize: "24px",
                                color: "#5A7184",
                            },
                        },
                    }}
                />
            </div>
            <button
                className="
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
                "
                onClick={handlePlay}
                disabled={!stripe || loading}
            >
                {loading
                    ? "Processing..."
                    : isRecurring
                    ? `Start ${frequency} donation`
                    : "Pay Now"}
            </button>
        </div>
    );
}
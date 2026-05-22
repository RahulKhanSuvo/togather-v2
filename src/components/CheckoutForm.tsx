import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { DonationFormData } from "./Form";

export default function CheckoutForm() {
    const { watch } = useFormContext<DonationFormData>();
    const amount = watch("amount");
    const frequency = watch("frequency");
    const firstName = watch("firstName");
    const lastName = watch("lastName");
    const notifySomeone = watch("notifySomeone");
    const companyName = watch("companyName");
    const donerFirstName = watch("donerFirstName");
    const donerLastName = watch("donerLastName");
    const email = watch("email");
    const donerPhoneNumber = watch("donerPhoneNumber");

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
                // Confirm on server to trigger the email
                try {
                    await fetch("/api/confirm", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            paymentIntentId: result.paymentIntent.id,
                            subscriptionId: data.subscriptionId, // will be undefined for one-time
                        }),
                    });
                } catch (err) {
                    console.error("Failed to send confirmation email", err);
                }

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
        <div className="mt-8">
            <h3 className="text-[20px] font-medium text-[#2F4A5D] mb-4">Card details</h3>
            <div className="border border-[#D4E3EC] rounded-[18px] p-4 bg-white mb-8">
                <CardElement
                    options={{
                        hidePostalCode: true,
                        style: {
                            base: {
                                fontSize: "20px",
                                color: "#5A7184",
                                "::placeholder": {
                                    color: "#aab7c4"
                                }
                            },
                        },
                    }}
                />
            </div>
            
            {/* Summary */}
            <div className="border-t border-[#D4E3EC] pt-6 mb-8 flex justify-between items-center">
                <div className="text-[20px] text-[#5A7184]">
                    <span className="capitalize">{frequency.replace("-", " ")}</span> donation
                </div>
                <div className="text-[24px] font-semibold text-[#2F4A5D]">
                    ${Number(amount).toFixed(2)}
                </div>
            </div>

            <button
                type="button"
                className="
                    h-[60px] md:h-[78px]
                    w-[300px] max-w-full
                    rounded-[20px]
                    bg-[#006F95]
                    text-white
                    text-[18px] md:text-[22px]
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
                    : "DONATE NOW"}
            </button>
        </div>
    );
}
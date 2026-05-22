import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useFormContext } from "react-hook-form";
import { DonationFormData } from "./Form";

export default function StepThree() {
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
    const { register } = useFormContext<DonationFormData>();

    return (
        <div className="bg-white border-2 border-[#0077A3] rounded-[24px] p-8 md:p-12">
            {/* Title */}
            <h2 className="text-[32px] md:text-[40px] font-light text-[#2F4A5D] mb-4">
                Payment options
            </h2>

            {/* Description */}
            <h3 className="text-[20px] font-medium text-[#2F4A5D] mb-6">Payment details</h3>

            {/* Donor and company info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <input
                    {...register("companyName")}
                    className="h-[60px] md:h-[78px] rounded-[18px] border border-[#D4E3EC] px-6 text-[18px] md:text-[20px] text-[#5A7184] outline-none focus:border-[#0077A3] col-span-1 md:col-span-2"
                    type="text"
                    placeholder="Company Name (Optional)"
                />
                <input
                    {...register("donerFirstName")}
                    className="h-[60px] md:h-[78px] rounded-[18px] border border-[#D4E3EC] px-6 text-[18px] md:text-[20px] text-[#5A7184] outline-none focus:border-[#0077A3]"
                    type="text"
                    placeholder="First Name"
                />
                <input
                    {...register("donerLastName")}
                    className="h-[60px] md:h-[78px] rounded-[18px] border border-[#D4E3EC] px-6 text-[18px] md:text-[20px] text-[#5A7184] outline-none focus:border-[#0077A3]"
                    type="text"
                    placeholder="Last Name"
                />
                <input
                    {...register("email")}
                    className="h-[60px] md:h-[78px] rounded-[18px] border border-[#D4E3EC] px-6 text-[18px] md:text-[20px] text-[#5A7184] outline-none focus:border-[#0077A3] col-span-1 md:col-span-2"
                    type="email"
                    placeholder="Email Address"
                />
                <input
                    {...register("donerPhoneNumber")}
                    className="h-[60px] md:h-[78px] rounded-[18px] border border-[#D4E3EC] px-6 text-[18px] md:text-[20px] text-[#5A7184] outline-none focus:border-[#0077A3] col-span-1 md:col-span-2"
                    type="text"
                    placeholder="Phone No. (Optional)"
                />
            </div>

            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </div>
    );
}

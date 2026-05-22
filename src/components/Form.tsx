"use client"
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import DedicationStep from "./DedicationStep";
import StepThree from "./StepThree";

export interface DonationFormData {
    amount: string;
    frequency: string;
    firstName: string; // dedication first name
    lastName: string;  // dedication last name
    notifySomeone: boolean;
    companyName: string;
    donerFirstName: string;
    donerLastName: string;
    email: string;
    donerPhoneNumber: string;
}

export default function DonationForm() {
    const methods = useForm<DonationFormData>({
        defaultValues: {
            amount: "10",
            frequency: "one-time",
            firstName: "",
            lastName: "",
            notifySomeone: false,
            companyName: "",
            donerFirstName: "",
            donerLastName: "",
            email: "",
            donerPhoneNumber: "",
        }
    });

    const { register, watch, setValue } = methods;
    const amount = watch("amount");
    const frequency = watch("frequency");
    
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedAmount, setSelectedAmount] = useState<number | null>(10);
    const amounts = [10, 50, 100];

    return (
        <FormProvider {...methods}>
            <div className="max-w-3xl mx-auto space-y-4">
                
                {/* STEP 1: Amount & Frequency */}
                {currentStep === 1 ? (
                    <div className="bg-white border-2 border-[#0077A3] rounded-[24px] p-8 md:p-12">
                        <h2 className="text-[32px] md:text-[40px] font-light text-[#2F4A5D] mb-8">
                            Make a donation
                        </h2>

                        {/* Amount Buttons */}
                        <div className="grid grid-cols-3 gap-6 mb-6">
                            {amounts.map((value) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => {
                                        setSelectedAmount(value);
                                        setValue("amount", value.toString());
                                    }}
                                    className={`h-[60px] md:h-[78px] rounded-[18px] border text-[20px] md:text-[24px] transition-all
                                        ${selectedAmount === value
                                            ? "border-[#0077A3] bg-[#E5F1F6] text-[#0077A3]"
                                            : "border-[#D4E3EC] text-[#5A7184]"
                                        }`}
                                >
                                    ${value.toFixed(2)}
                                </button>
                            ))}
                        </div>

                        {/* Custom Amount */}
                        <div className="mb-12">
                            <div className="border border-[#D4E3EC] rounded-[18px] px-6 py-4 flex flex-col justify-center h-[78px]">
                                <label className="block text-[14px] text-[#5A7184] mb-1">
                                    Enter a custom amount
                                </label>
                                <div className="flex items-center text-[24px] text-[#2F4A5D]">
                                    <span>$</span>
                                    <input
                                        type="number"
                                        {...register("amount")}
                                        onChange={(e) => {
                                            setValue("amount", e.target.value);
                                            setSelectedAmount(null);
                                        }}
                                        className="w-full outline-none bg-transparent ml-2"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Recurring Section */}
                        <h3 className="text-[20px] font-medium text-[#2F4A5D] mb-5">
                            Would you like to make this recurring?
                        </h3>

                        <div className="grid grid-cols-3 gap-6 mb-12">
                            {(["one-time", "fortnightly", "monthly"] as const).map((freq) => (
                                <button
                                    key={freq}
                                    type="button"
                                    onClick={() => setValue("frequency", freq)}
                                    className={`h-[60px] md:h-[78px] rounded-[18px] border text-[16px] md:text-[20px] transition-all capitalize
                                        ${frequency === freq
                                            ? "bg-[#E5F1F6] border-[#0077A3] text-[#0077A3]"
                                            : "border-[#D4E3EC] text-[#5A7184]"
                                        }`}
                                >
                                    {freq.replace("-", " ")}
                                </button>
                            ))}
                        </div>

                        {/* Next Button */}
                        <button
                            type="button"
                            onClick={() => setCurrentStep(2)}
                            className="h-[60px] md:h-[78px] px-12 rounded-[20px] bg-[#006F95] text-white text-[20px] font-semibold uppercase tracking-wide hover:opacity-90 transition"
                        >
                            NEXT STEP
                        </button>
                    </div>
                ) : (
                    <div 
                        onClick={() => setCurrentStep(1)} 
                        className="bg-[#F8F9FA] rounded-[24px] p-6 md:p-8 cursor-pointer border border-[#E8ECEF] hover:bg-[#F0F3F5] transition"
                    >
                        <h2 className="text-[24px] md:text-[32px] font-light text-[#5A7184]">Make a donation</h2>
                    </div>
                )}

                {/* STEP 2: Dedication */}
                {currentStep === 2 ? (
                    <DedicationStep 
                        onNext={() => setCurrentStep(3)} 
                        onSkip={() => {
                            setValue("firstName", "");
                            setValue("lastName", "");
                            setValue("notifySomeone", false);
                            setCurrentStep(3);
                        }} 
                    />
                ) : (
                    <div 
                        onClick={() => setCurrentStep(2)} 
                        className="bg-[#F8F9FA] rounded-[24px] p-6 md:p-8 cursor-pointer border border-[#E8ECEF] hover:bg-[#F0F3F5] transition"
                    >
                        <h2 className="text-[24px] md:text-[32px] font-light text-[#5A7184]">Dedication</h2>
                    </div>
                )}

                {/* STEP 3: Payment Options */}
                {currentStep === 3 ? (
                    <StepThree />
                ) : (
                    <div 
                        onClick={() => setCurrentStep(3)} 
                        className="bg-[#F8F9FA] rounded-[24px] p-6 md:p-8 cursor-pointer border border-[#E8ECEF] hover:bg-[#F0F3F5] transition"
                    >
                        <h2 className="text-[24px] md:text-[32px] font-light text-[#5A7184]">Payment options</h2>
                    </div>
                )}
            </div>
        </FormProvider>
    );
}
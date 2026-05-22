"use client"
import { useState } from "react";
import DedicationStep from "./DedicationStep";

export default function DonationForm() {
    const [amount, setAmount] = useState("2");
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [frequency, setFrequency] = useState("one-time");


    const amounts = [10, 50, 100];

    return (
        <div>
            {/* step first */}
            <div className="max-w-3xl mx-auto bg-white border-2 border-cyan-600 rounded-3xl p-8">
                <h2 className="text-4xl font-medium mb-8">
                    Make a donation
                </h2>

                {/* Amount Buttons */}
                <div className="grid grid-cols-3 gap-6 mb-6">
                    {amounts.map((value) => (
                        <button
                            key={value}
                            onClick={() => {
                                setSelectedAmount(value);
                                setAmount(value.toString());
                            }}
                            className={`h-16 rounded-xl border transition-all
              ${selectedAmount === value
                                    ? "border-cyan-600 bg-cyan-50"
                                    : "border-gray-300"
                                }`}
                        >
                            ${value.toFixed(2)}
                        </button>
                    ))}
                </div>

                {/* Custom Amount */}
                <div className="mb-12">
                    <div className="border-2 border-cyan-600 rounded-2xl px-5 py-3">
                        <label className="block text-sm text-gray-500">
                            Enter a custom amount
                        </label>

                        <div className="flex items-center text-2xl">
                            <span>$</span>

                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                    setSelectedAmount(null);
                                }}
                                className="w-full outline-none bg-transparent ml-1"
                            />
                        </div>
                    </div>
                </div>

                {/* Recurring Section */}
                <h3 className="text-2xl font-medium mb-5">
                    Would you like to make this recurring?
                </h3>

                <div className="grid grid-cols-3 gap-6 mb-12">
                    <button
                        onClick={() => setFrequency("one-time")}
                        className={`h-16 rounded-xl border
            ${frequency === "one-time"
                                ? "bg-cyan-50 border-cyan-600 text-cyan-700"
                                : "border-gray-300"
                            }`}
                    >
                        One time
                    </button>

                    <button
                        onClick={() => setFrequency("fortnightly")}
                        className={`h-16 rounded-xl border
            ${frequency === "fortnightly"
                                ? "bg-cyan-50 border-cyan-600 text-cyan-700"
                                : "border-gray-300"
                            }`}
                    >
                        Fortnightly
                    </button>

                    <button
                        onClick={() => setFrequency("monthly")}
                        className={`h-16 rounded-xl border
            ${frequency === "monthly"
                                ? "bg-cyan-50 border-cyan-600 text-cyan-700"
                                : "border-gray-300"
                            }`}
                    >
                        Monthly
                    </button>
                </div>

                {/* Next Button */}
                <button
                    className="px-12 py-4 rounded-xl bg-gray-200 text-gray-500 font-semibold "
                >
                    NEXT STEP
                </button>
            </div>
            {/* step second */}
            <DedicationStep />
        </div>

    );
}
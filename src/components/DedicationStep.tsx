import { useFormContext } from "react-hook-form";
import { DonationFormData } from "./Form";

interface DedicationStepProps {
    onNext: () => void;
    onSkip: () => void;
}

export default function DedicationStep({ onNext, onSkip }: DedicationStepProps) {
    const { register, watch } = useFormContext<DonationFormData>();
    const notifySomeone = watch("notifySomeone");

    return (
        <div className="bg-white border-2 border-[#0077A3] rounded-[24px] p-8 md:p-12">
            {/* Title */}
            <h2 className="text-[32px] md:text-[40px] font-light text-[#2F4A5D] mb-4">
                Dedication
            </h2>

            {/* Description */}
            <p className="text-[20px] md:text-[22px] text-[#5A7184] mb-10">
                Dedicate my donation in honor, memory, or support of someone.
            </p>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <input
                    type="text"
                    {...register("firstName")}
                    placeholder="First Name"
                    className="h-[60px] md:h-[78px] rounded-[18px] border border-[#D4E3EC] px-6 text-[20px] md:text-[24px] text-[#5A7184] outline-none focus:border-[#0077A3]"
                />

                <input
                    type="text"
                    {...register("lastName")}
                    placeholder="Last Name"
                    className="h-[60px] md:h-[78px] rounded-[18px] border border-[#D4E3EC] px-6 text-[20px] md:text-[24px] text-[#5A7184] outline-none focus:border-[#0077A3]"
                />
            </div>

            {/* Checkbox */}
            <label className="flex items-center gap-4 mb-16 cursor-pointer">
                <input
                    type="checkbox"
                    {...register("notifySomeone")}
                    className="h-7 w-7 rounded border-[#BFCBD4]"
                />
                <span className="text-[20px] md:text-[24px] text-[#5A7184]">
                    Notify someone of my dedication
                </span>
            </label>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-8">
                <button
                    type="button"
                    onClick={onNext}
                    className="h-[60px] md:h-[78px] min-w-[200px] md:min-w-[250px] rounded-[20px] bg-[#006F95] text-white text-[18px] md:text-[22px] font-semibold uppercase tracking-wide hover:opacity-90 transition"
                >
                    NEXT STEP
                </button>

                <button
                    type="button"
                    onClick={onSkip}
                    className="text-[#006F95] text-[20px] md:text-[24px] font-medium hover:underline"
                >
                    Skip This Step
                </button>
            </div>
        </div>
    );
}
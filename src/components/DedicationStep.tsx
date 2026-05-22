
interface DedicationStepProps {
    firstName: string;
    lastName: string;
    notifySomeone: boolean;
    setFirstName: (value: string) => void;
    setLastName: (value: string) => void;
    setNotifySomeone: (value: boolean) => void;
}
export default function DedicationStep({ firstName, lastName, notifySomeone, setFirstName, setLastName, setNotifySomeone }: DedicationStepProps) {
    return (
        <div className="max-w-3xl mx-auto border-2 border-[#0077A3] rounded-[24px] p-8 md:p-12 bg-white">
            {/* Title */}
            <h2 className="text-[48px] font-light text-[#2F4A5D] mb-4">
                Dedication
            </h2>

            {/* Description */}
            <p className="text-[22px] text-[#5A7184] mb-10">
                Dedicate my donation in honor, memory, or support of someone.
            </p>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="
            h-[78px]
            rounded-[18px]
            border
            border-[#D4E3EC]
            px-6
            text-[24px]
            text-[#5A7184]
            outline-none
            focus:border-[#0077A3]
          "
                />

                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="
            h-[78px]
            rounded-[18px]
            border
            border-[#D4E3EC]
            px-6
            text-[24px]
            text-[#5A7184]
            outline-none
            focus:border-[#0077A3]
          "
                />
            </div>

            {/* Checkbox */}
            <label className="flex items-center gap-4 mb-16 cursor-pointer">
                <input
                    checked={notifySomeone}
                    onChange={(e) => setNotifySomeone(e.target.checked)}
                    type="checkbox"
                    className="
            h-7
            w-7
            rounded
            border-[#BFCBD4]
          "
                />

                <span className="text-[24px] text-[#5A7184]">
                    Notify someone of my dedication
                </span>
            </label>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-8">
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
                >
                    Next Step
                </button>

                <button
                    className="
            text-[#006F95]
            text-[24px]
            font-medium
            hover:underline
          "
                >
                    Skip This Step
                </button>
            </div>
        </div>
    );
}
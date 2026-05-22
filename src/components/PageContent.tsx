export default function PageContent() {
    return (
        <>
            {/* Circle Logo - Overlapping hero */}
            <div className="absolute -top-[80px] left-4 md:left-0 w-[160px] h-[160px] bg-white rounded-full flex flex-col items-center justify-center shadow-md border border-gray-100 z-10">
                <div className="flex flex-col items-center mb-2">
                    <span className="text-[#2F4A5D] font-bold text-lg leading-none">princescourt</span>
                    <span className="text-[8px] tracking-widest text-[#5A7184] uppercase mt-1">Community Living</span>
                </div>
                <div className="w-16 h-[1px] bg-gray-200 my-1"></div>
                <div className="flex flex-col items-center mt-1">
                    <span className="text-[#00AAB3] font-bold text-xl leading-none">t<span className="text-[#2F4A5D]">♥</span>gether</span>
                    <span className="text-[8px] text-[#00AAB3] italic mt-1">we build. we care. we thrive.</span>
                </div>
            </div>

            {/* Text Content */}
            <div className="pt-32 pb-16">
                <h2 className="text-[36px] font-bold text-[#2F4A5D] mb-4 tracking-tight">Princes Court, Together</h2>
                <div className="w-16 h-[5px] bg-[#006F95] mb-10"></div>

                <p className="font-bold text-[17px] text-[#5A7184] mb-8 leading-relaxed">
                    Building the future of aged care in Mildura, together.
                </p>

                <p className="text-[16px] text-[#718A9E] mb-6 leading-relaxed font-light">
                    You're supporting something meaningful. Princes Court is creating a new 50-bed residential aged care home designed to deliver care, dignity, and connection from day one.
                </p>

                <ul className="list-disc pl-5 text-[16px] text-[#718A9E] mb-8 leading-relaxed font-light space-y-3">
                    <li>All donations are tax-deductible and welcome – from $2 up to $200,000+</li>
                    <li>Donate $20,000 or more to secure naming rights for a room, or $125,000 for a household, with a commemorative plaque and public recognition (non-exclusive)</li>
                    <li>Every contribution helps ensure this first-class facility is complete right from the start</li>
                </ul>

                <p className="font-bold text-[17px] text-[#5A7184] mb-8 leading-relaxed">
                    Every dollar counts – from $2 to $200,000+, your contribution helps us open the doors of this much-needed home.
                </p>

                <p className="text-[16px] text-[#718A9E] leading-relaxed font-light">
                    Thank you for helping build a legacy of care, together.
                </p>
            </div>
        </>
    );
}

import Form from "@/components/Form";

export default function Home() {
    return (
        <div className="min-h-screen bg-white font-sans text-[#5A7184]">
            {/* Hero Section */}
            <div className="flex flex-col md:flex-row h-auto md:h-[380px]">
                {/* Left side hero */}
                <div className="w-full md:w-[55%] bg-[#00AAB3] flex items-center justify-center md:justify-start pl-[5%] md:pl-[10%] pr-8 py-16 md:py-0">
                    <h1 className="text-white text-[32px] md:text-[46px] font-bold italic leading-[1.1] max-w-[500px]">
                        Together, we’re building<br />the future of aged care.
                    </h1>
                </div>
                {/* Right side hero (Image Placeholder) */}
                <div
                    className="w-full md:w-[45%] bg-[#E8E8E8] relative min-h-[250px] bg-cover bg-center"
                    style={{ backgroundImage: 'url("https://placehold.co/800x600/E8E8E8/A3A3A3?text=Building+Sketch")' }}
                >
                    {/* Top right logos */}
                    <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-white py-3 px-6 flex items-center gap-6 shadow-sm">
                        <div className="flex flex-col items-center">
                            <span className="text-[#2F4A5D] font-bold text-xl leading-none">princescourt</span>
                            <span className="text-[10px] tracking-widest text-[#5A7184] uppercase mt-1">Community Living</span>
                        </div>
                        <div className="w-[1px] h-10 bg-gray-300"></div>
                        <div className="flex flex-col items-start">
                            <span className="text-[#00AAB3] font-bold text-2xl leading-none">t<span className="text-[#2F4A5D]">♥</span>gether</span>
                            <span className="text-[10px] text-[#00AAB3] italic mt-1">we build. we care. we thrive.</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row relative">

                {/* Left Column (Text) */}
                <div className="w-full md:w-[45%] pr-0 md:pr-16 relative">
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
                </div>

                {/* Right Column (Form) */}
                <div className="w-full md:w-[55%] relative top-[-40px] z-20">
                    <div className="pl-0 md:pl-8">
                        <Form />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-[#D4E3EC] mt-12 py-12 bg-white">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row items-center md:items-start gap-12">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-[#5A7184] uppercase font-bold tracking-widest">Powered by</span>
                        <span className="font-bold text-3xl text-black">Shout.</span>
                    </div>
                    <div className="text-[11px] text-[#9AAAB7] max-w-4xl leading-relaxed font-light text-justify md:text-left">
                        Shout fundraising services are provided by Shout for Good Pty Ltd (Shout) ABN: 45 163 218 639. Our donation forms provide secure donations between donor and charities. Shout is part of the ANZ Group but is not a bank. Obligations of Shout are not deposits or liabilities of ANZ. ANZ does not stand behind or guarantee Shout or its obligations.
                        <div className="text-center mt-6">Copyright © 2026</div>
                    </div>
                </div>
            </div>

            {/* Accessibility Tab */}
            <div className="fixed right-0 bottom-32 bg-[#A02060] text-white py-3 px-2 rounded-l-md" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                <span className="text-xs font-bold tracking-wider">Accessibility</span>
            </div>
        </div>
    );
}

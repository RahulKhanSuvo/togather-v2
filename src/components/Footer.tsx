export default function Footer() {
    return (
        <>
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
            <div className="fixed right-0 bottom-32 bg-[#A02060] text-white py-3 px-2 rounded-l-md z-50" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                <span className="text-xs font-bold tracking-wider">Accessibility</span>
            </div>
        </>
    );
}

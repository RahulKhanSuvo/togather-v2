export default function Hero() {
    return (
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
    );
}

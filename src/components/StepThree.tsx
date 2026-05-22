
export default function StepThree({ handelSubmit }: { handelSubmit: () => void }) {

    return (
        <div>
            <button onClick={handelSubmit} className="px-12 py-4 rounded-xl bg-[#006F95] text-white font-semibold ">Check out with Stripe</button>
        </div>
    )
}

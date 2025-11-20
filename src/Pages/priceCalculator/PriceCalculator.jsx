import PriceCalculatorForm from "../forms/PriceCalculatorForm";

export default function PriceCalculationPage() {
    return (
        <main className="bg-base-100 rounded-2xl divide-gray-400 divide-x my-6 p-8 w-full grid grid-cols-[35%_65%] place-content-center-safe gap-4">
            <section className="flex flex-col justify-center gap-2">
                <h1 className="font-extrabold text-4xl text-secondary">Price Calculator</h1>
                <p className="font-medium text-sm">Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            </section>
            <PriceCalculatorForm />
        </main>
    )
}
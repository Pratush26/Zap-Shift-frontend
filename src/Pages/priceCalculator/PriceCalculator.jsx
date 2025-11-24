import PriceCalculatorForm from "../forms/PriceCalculatorForm";

export default function PriceCalculationPage() {
    return (
        <main className="bg-base-100 rounded-2xl my-6 p-8 w-full space-y-4">
            <section className="flex flex-col text-center gap-2">
                <h1 className="font-extrabold text-4xl text-secondary">Price Calculator</h1>
                <p className="font-medium text-sm">Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            </section>
            <hr className="border-gray-500" />
            <PriceCalculatorForm />
        </main>
    )
}
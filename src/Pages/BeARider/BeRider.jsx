import BeRiderForm from "../forms/BeRiderForm";
import Img from "../../assets/agent-pending.png"
export default function BeRider() {
    return (
        <main className="bg-base-100 rounded-2xl my-6 p-8 w-full">
            <h1 className="font-extrabold text-4xl text-secondary">Be A Rider</h1>
            <p className="font-medium w-3/4 mt-2 text-sm">Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            <hr className="mt-6 border-gray-400"/>
            <section className="grid grid-cols-[60%_40%] items-center justify-items-center-safe gap-4 m-2" >
                <BeRiderForm />
                <img src={Img} alt="rider image" className="w-5/6 h-auto" />
            </section>
        </main>
    )
}
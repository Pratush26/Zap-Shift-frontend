import { useLoaderData } from "react-router";
import BannerSection from "./Banner";
import { motion } from "motion/react";
import serviceIcon from '../../assets/service.png'
import LogoSlider from "./LogoSlider";

export default function Home() {
    const { services, reviews } = useLoaderData()
    return (
        <main className="text-base-content">
            <BannerSection />
            <h1 className="text-3xl font-bold mt-14 w-11/12 mx-auto">How It Works</h1>
            <section className="my-6 grid grid-cols-4 gap-6 w-11/12 mx-auto">
                <motion.div className="bg-base-100 p-6 flex flex-col justify-between gap-1 rounded-3xl hover:shadow-lg/50 trnsition">
                    <img src="https://img.icons8.com/?size=100&id=36949&format=png&color=000000" alt="delivery icon" className="h-10 w-fit" />
                    <h5 className="text-lg font-bold">Booking Pick & Drop</h5>
                    <p className="text-sm text-gray-600 font-medium">From personal packages to business shipments — we deliver on time, every time.</p>
                </motion.div>
                <motion.div className="bg-base-100 p-6 flex flex-col justify-between gap-1 rounded-3xl hover:shadow-lg/50 trnsition">
                    <img src="https://img.icons8.com/?size=100&id=40468&format=png&color=000000" alt="Cash On Delivery icon" className="h-10 w-fit" />
                    <h5 className="text-lg font-bold">Cash On Delivery</h5>
                    <p className="text-sm text-gray-600 font-medium">From personal packages to business shipments — we deliver on time, every time.</p>
                </motion.div>
                <motion.div className="bg-base-100 p-6 flex flex-col justify-between gap-1 rounded-3xl hover:shadow-lg/50 trnsition">
                    <img src="https://img.icons8.com/?size=100&id=YyEbAVyRYrMX&format=png&color=000000" alt="Delivery Hub icon" className="h-10 w-fit" />
                    <h5 className="text-lg font-bold">Delivery Hub</h5>
                    <p className="text-sm text-gray-600 font-medium">From personal packages to business shipments — we deliver on time, every time.</p>
                </motion.div>
                <motion.div className="bg-base-100 p-6 flex flex-col justify-between gap-1 rounded-3xl hover:shadow-lg/50 trnsition">
                    <img src="https://img.icons8.com/?size=100&id=oC8gvese8qNR&format=png&color=000000" alt="Booking SME & Corporate icon" className="h-10 w-fit" />
                    <h5 className="text-lg font-bold">Booking SME & Corporate</h5>
                    <p className="text-sm text-gray-600 font-medium">From personal packages to business shipments — we deliver on time, every time.</p>
                </motion.div>
            </section>
            <section className="bg-secondary text-secondary-content text-center rounded-4xl px-8 py-14 my-16">
                <h2 className="text-4xl font-bold">Our Services</h2>
                <p className="font-medium text-sm max-w-4xl mx-auto text-gray-400 m-2">Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
                <article className="grid grid-cols-3 gap-4 my-6 text-base-content">
                    {
                        services?.map((e, i) => (
                            <motion.div key={i} className="bg-base-100 p-6 flex flex-col justify-between gap-2 rounded-3xl hover:bg-primary trnsition">
                                <img src={serviceIcon} alt="service icon" className="h-10 w-fit mx-auto rounded-full bg-gray-200" />
                                <h4 className="text-xl font-semibold">{e.title}</h4>
                                <p className="text-sm font-medium text-gray-500">{e.description}</p>
                            </motion.div>
                        ))
                    }
                </article>
            </section>
            <h3 className="text-3xl font-bold text-center">We've helped thousands of sales teams</h3>
            <LogoSlider />
        </main>
    )
}
import { Link } from "react-router";
import BannerSection from "./Banner";
import { motion } from "motion/react";
import serviceIcon from '../../assets/service.png'
import LogoSlider from "./LogoSlider";
import SectionImg1 from './sectionImg/safe-delivery.png'
import SectionImg2 from './sectionImg/tiny-deliveryman.png'
import SectionImg3 from './sectionImg/live-tracking.png'
import SectionImg4 from './sectionImg/location-merchant.png'
import SectionImg5 from './sectionImg/customer-top.png'
import marchentBG from '../../assets/be-a-merchant-bg.png'
import reviewIcon from '../../assets/reviewQuote.png'
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const sectionData = [
    { img: "https://img.icons8.com/?size=100&id=KF6QW2Bdzg46&format=png&color=135258", title: "Live Parcel Tracking", description: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind." },
    { img: SectionImg1, title: "100% Safe Delivery", description: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time." },
    { img: "https://img.icons8.com/?size=100&id=36949&format=png&color=135258", title: "Zero-Delay Courier Service", description: "Eliminate delivery uncertainties with our delay-proof shipping solution. We employ predictive analytics, multiple route backups, and dedicated time slots to ensure your packages beat the clock. Perfect for time-critical shipments, business contracts, and urgent materials - we transform time constraints into reliable delivery promises you can bank on." },
    { img: SectionImg2, title: "Urban Express Delivery", description: "Conquer city distances with our dedicated inner city courier service. Leveraging smart route optimization and local knowledge, we deliver your parcels faster through busy streets. Perfect for time-sensitive documents, e-commerce deliveries, and business materials - we ensure your packages reach their destination while navigating urban challenges efficiently." },
    { img: SectionImg3, title: "24/7 Call Center Support", description: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us." }
]
export default function Home() {
    const { data: servicesData, isLoading: servicesLoading, error: servicesError } = useQuery({
        queryKey: ['services'],
        queryFn: () => axios.get(`${import.meta.env.VITE_SERVER}/services`).then(res => res.data),
        staleTime: 5 * 60 * 1000,
    })

    // const { data: reviewsData, isLoading: reviewsLoading, error: reviewsError } = useQuery({
    //     queryKey: ['reviews'],
    //     queryFn: () => axios.get(`${import.meta.env.VITE_SERVER}/reviews`).then(res => res.data),
    //     staleTime: 5 * 60 * 1000,
    // })

    // Simple loading check
    // if (servicesLoading || reviewsLoading) return <LoadingUi />
    // if (servicesError || reviewsError) return <ErrorPage />
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
                        servicesData?.map((e, i) => (
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
            <section className="my-12 space-y-5 w-11/12 mx-auto">
                {
                    sectionData?.map((e, i) => (
                        <motion.div key={i} className="bg-base-100 p-8 grid grid-flow-col items-center-safe justify-items-center-safe divide-x-3 divide-dashed divide-gray-300 gap-8 rounded-3xl hover:shadow-lg/40 trnsition">
                            <div className="h-full flex items-center pr-10">
                                <img src={e.img} alt="delivery icon" className="w-30 h-auto" />
                            </div>
                            <span>
                                <h5 className="text-lg font-bold">{e.title}</h5>
                                <p className="text-sm text-gray-600 font-medium">{e.description}</p>
                            </span>
                        </motion.div>
                    ))
                }
            </section>
            <section className="bg-secondary text-secondary-content rounded-4xl px-14 py-16 my-16 grid grid-cols-2 items-center-safe relative">
                <img src={marchentBG} alt="banner" className="absolute top-0" />
                <div className="space-y-4">
                    <h2 className="text-4xl font-bold">Merchant and Customer Satisfaction is Our First Priority</h2>
                    <p className="font-medium text-sm max-w-4xl mx-auto text-gray-400 m-2">We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.</p>
                    <div className="flex gap-3">
                        <Link to='/' className='bttn trnsition rounded-full'>Become a Merchant</Link>
                        <Link to='/' className='bttn-out trnsition rounded-full'>Earn with ZapShift Courier</Link>
                    </div>
                </div>
                <img src={SectionImg4} alt="banner" className="w-full h-auto" />
            </section>
            <section>
                <div className="flex flex-col items-center gap-2 w-1/2 mx-auto my-6 text-center">
                    <img src={SectionImg5} alt="banner image" />
                    <h2 className="text-3xl font-extrabold">What our customers are sayings</h2>
                    <p className="text-sm text-gray-600 font-medium">Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
                </div>
                <article>
                    <section className="w-sm p-4 rounded-xl bg-base-100 shadow">
                        <img src={reviewIcon} alt="icon" />
                        <p className="p-4 text-sm text-gray-700 border-b-2 border-dashed border-gray-500">A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. </p>
                        <div className="flex gap-3 p-3">
                            <img src="https://randomuser.me/api/portraits/men/22.jpg" alt="reviewer image" className="h-10 aspect-square object-cover object-center rounded-full" />
                            <span>
                                <p className="font-semibold">Awlad Hossin</p>
                                <p className="text-xs">Senior Product Designer</p>
                            </span>
                        </div>
                    </section>
                </article>
            </section>
            <section className="my-20">
                <div className="flex flex-col items-center gap-2 w-1/2 mx-auto my-6 text-center">
                    <h2 className="text-3xl font-extrabold">Frequently Asked Question (FAQ)</h2>
                    <p className="text-sm text-gray-600 font-medium">Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
                </div>
                <article className="flex flex-col items-center">

                        <Link to='/' className='bttn trnsition w-fit'>See More FAQs</Link>
                </article>
            </section>
        </main>
    )
}
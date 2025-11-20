import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
export default function AboutUsPage() {
    return (
        <main className="bg-base-100 rounded-2xl my-6 p-8 w-full">
            <h1 className="font-extrabold text-4xl text-secondary">About Us</h1>
            <p className="font-medium w-3/4 mt-1 text-sm">Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            <Tabs className="my-5" >
                <TabList className="flex gap-4 text-lg font-bold my-2">
                    <Tab>Story</Tab>
                    <Tab>Mission</Tab>
                    <Tab>Success</Tab>
                    <Tab>Teams & Others</Tab>
                </TabList>
                <hr className="border-gray-400 mb-2" />
                <TabPanel>
                    <p>We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.</p>
                </TabPanel>
                <TabPanel>
                    <p>To revolutionize parcel delivery through innovative technology and unwavering reliability. We're committed to creating seamless logistics solutions that connect people and businesses faster, safer, and more efficiently. Every package we handle represents our dedication to excellence, trust, and customer satisfaction—driving us to continuously improve and set new standards in the delivery industry.</p>
                </TabPanel>
                <TabPanel>
                    <p>From the bustling streets of Dhaka to the remote villages of hill tracts, our success is measured by our nationwide reach. Operating 200+ branches across all 64 districts, we've established the most extensive delivery network in Bangladesh. This achievement enables us to promise and deliver reliable courier services to every postal code in the nation.</p>
                </TabPanel>
                <TabPanel>
                    <p>Behind every successful delivery is a dedicated team of logistics experts, technology innovators, and customer service professionals. Our diverse team brings together decades of experience in supply chain management, software development, and customer care. United by a shared passion for excellence, we work tirelessly to ensure your parcels are handled with the utmost care and precision from pickup to delivery.</p>
                </TabPanel>
            </Tabs>
        </main>
    )
}
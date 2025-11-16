import Footer from "../Shared/Footer";
import Navbar from "../Shared/Navbar";

export default function NotFoundPage() {
    return (
        <div className='flex flex-col min-h-screen justify-between p-4 md:p-8'>
            <Navbar />
            <p>page not found!</p>
            <Footer />
        </div>
    )
}
import Footer from "../Shared/Footer";
import Loader from "../Shared/Loader";
import Navbar from "../Shared/Navbar";

export default function LoadingUi() {
    return (
        <div className='flex flex-col w-full min-h-screen items-center justify-between p-4 gap-4 md:p-8'>
            <Navbar />
            <Loader />
            <Footer />
        </div>
    )
}
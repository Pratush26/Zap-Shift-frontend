import { Link } from "react-router";
import Footer from "../Shared/Footer";
import Navbar from "../Shared/Navbar";
import Img from "../assets/notFound.png"
export default function NotFoundPage() {
    return (
        <div className='flex flex-col min-h-screen items-center gap-4 justify-between p-4 md:p-8'>
            <Navbar />
            <img src={Img} alt="error image" className="w-3/4 h-auto max-w-3xs" />
            <Link to='/' className="bttn rounded-full trnsition w-fit" >Go Back to Home</Link>
            <Footer />
        </div>
    )
}
import { Link, useRouteError } from "react-router"
import Img from "../assets/error.png"
import Navbar from "../Shared/Navbar"
import Footer from "../Shared/Footer"

export default function ErrorPage() {
    const {message} = useRouteError()
    return (
        <div className='flex flex-col min-h-screen gap-4 items-center justify-between p-4 md:p-8'>
            <Navbar />
            <img src={Img} alt="error image" className="w-3/4 h-auto max-w-3xs" />
            <p className="text-error font-bold animate-bounce">{message}</p>
            <Link to='/' className="bttn rounded-full trnsition" >Go Back to Home</Link>
            <Footer />
        </div>
    )
}
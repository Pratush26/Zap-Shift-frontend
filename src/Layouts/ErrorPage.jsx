import { useRouteError } from "react-router"
import Navbar from "../Shared/Navbar"
import Footer from "../Shared/Footer"
import Error from "../Shared/Error"

export default function ErrorPage() {
    const {message} = useRouteError()
    return (
        <div className='flex flex-col min-h-screen gap-2 items-center justify-between p-4 md:p-8'>
            <Navbar />
            <Error msg={message} />
            <Footer />
        </div>
    )
}
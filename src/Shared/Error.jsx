import { Link } from "react-router";
import Img from "../assets/error.png"

export default function Error({msg}) {
    return (
        <div className="flex flex-col items-center mx-auto w-3/4 text-center my-6">
            <img src={Img} alt="error image" className="w-3/4 h-auto max-w-3xs" />
            <p className="text-error font-bold animate-bounce">{msg}</p>
            <Link to='/' className="bttn rounded-full trnsition" >Go Back to Home</Link>
        </div>
    )
}
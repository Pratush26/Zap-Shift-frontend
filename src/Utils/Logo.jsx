import { Link } from "react-router";
import Img from '/logo.png'

export default function Logo() {
    return <Link to='/' className='flex items-end'><img src={Img} alt="logo" className='h-12 w-auto' /><span className='font-extrabold text-2xl -ms-4'>Zap Shift</span></Link>
}
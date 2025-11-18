import { Link, NavLink } from 'react-router'
import Logo from '../Utils/Logo'
export default function Navbar() {
    return (
        <nav className='bg-base-100 text-base-content py-4 px-6 rounded-xl flex items-center justify-between'>
            <Logo />
            <section className="flex gap-4 text-sm font-medium">
                <NavLink className="hover:text-gray-500 trnsition" to='/services'>Services</NavLink>
                <NavLink className="hover:text-gray-500 trnsition" to='/coverage'>Coverage</NavLink>
                <NavLink className="hover:text-gray-500 trnsition" to='/about'>About Us</NavLink>
                <NavLink className="hover:text-gray-500 trnsition" to='/pricing'>Pricing</NavLink>
                <NavLink className="hover:text-gray-500 trnsition" to='/be-rider'>Be a rider</NavLink>
            </section>
            <section className='flex gap-2'>
                <button className='bttn-outw trnsition'>Sign In</button>
                <button className='bttn trnsition'>Sign Up</button>
            </section>
        </nav>
    )
}
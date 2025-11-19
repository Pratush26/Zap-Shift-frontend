import { Link, NavLink } from 'react-router'
import Logo from '../Utils/Logo'
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
export default function Navbar() {
    const { user, loading, signOutUser } = useContext(AuthContext);
    const handleSignOut = () => {
        signOutUser().then(() => console.log("s")).catch(err => console.error(err))
    }
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
            {
                loading ?
                    <p>Loading...</p>
                    :
                    user ?
                        <div className='flex gap-3 items-center'>
                            <img src={user.photoURL} alt="user image" className='h-9 aspect-square object-cover rounded-full' />
                            <button onClick={handleSignOut} className='bttn trnsition rounded-md'>Sign Out</button>
                        </div>
                        :
                        <section className='flex gap-2'>
                            <Link to='/login' className='bttn-outw trnsition rounded-md'>Sign In</Link>
                            <Link to='/register' className='bttn trnsition rounded-md'>Sign Up</Link>
                        </section>
            }
        </nav>
    )
}
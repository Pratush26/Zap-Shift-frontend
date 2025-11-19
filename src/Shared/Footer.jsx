import { NavLink } from "react-router";
import Logo from "../Utils/Logo";

export default function Footer() {
    return (
        <section className="bg-neutral w-full text-neutral-content rounded-xl">
            <footer className="flex flex-col items-center justify-center w-2/3 mx-auto my-10 gap-3 text-center text-sm font-extralight">
                <Logo />
                <p>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
                <section className="flex gap-3 border-t border-b border-dashed border-gray-600 w-full justify-center my-2 py-3">
                    <NavLink className="hover:text-gray-500 trnsition" to='/services'>Services</NavLink>
                    <NavLink className="hover:text-gray-500 trnsition" to='/coverage'>Coverage</NavLink>
                    <NavLink className="hover:text-gray-500 trnsition" to='/about'>About Us</NavLink>
                    <NavLink className="hover:text-gray-500 trnsition" to='/pricing'>Pricing</NavLink>
                    <NavLink className="hover:text-gray-500 trnsition" to='/be-rider'>Be a rider</NavLink>
                </section>
                <p className="font-semibold text-lg">Social Links :</p>
                <section className="flex gap-4">
                    <a href="http://facebook.com" target="_blank"><img className="h-10 hover:opacity-70 trnsition w-auto" src="https://img.icons8.com/?size=100&id=118497&format=png&color=000000" alt="facebook link" /></a>
                    <a href="http://instagram.com" target="_blank"><img className="h-10 hover:opacity-70 trnsition w-auto" src="https://img.icons8.com/?size=100&id=32323&format=png&color=000000" alt="instagram link" /></a>
                    <a href="http://twitter.com" target="_blank"><img className="h-10 hover:opacity-70 trnsition w-auto" src="https://img.icons8.com/?size=100&id=ClbD5JTFM7FA&format=png&color=000000" alt="twitter link" /></a>
                    <a href="http://linkedin.com" target="_blank"><img className="h-10 hover:opacity-70 trnsition w-auto" src="https://img.icons8.com/?size=100&id=114445&format=png&color=000000" alt="linkedin link" /></a>
                    <a href="http://youtube.com" target="_blank"><img className="h-10 hover:opacity-70 trnsition w-auto" src="https://img.icons8.com/?size=100&id=19318&format=png&color=000000" alt="youtube link" /></a>
                </section>
            </footer>
        </section>
    )
}
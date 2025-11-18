import { Outlet } from "react-router";
import Logo from "../Utils/Logo";
import banner from '../assets/authImage.png'

export default function AuthLayout() {
    return (
        <section className="grid grid-cols-2 min-h-screen">
            <aside className="px-6 py-4">
                <Logo />
                <Outlet />
            </aside>
            <div className="bg-primary">
                <img src={banner} alt="banner img" className="w-full h-auto" />
            </div>
        </section>
    )
}
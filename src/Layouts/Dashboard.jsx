import { Link, Outlet } from "react-router";
import Logo from "../Utils/Logo"
import { RiMenu2Line } from "react-icons/ri"
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import Aside from "../Shared/Aside";

export default function DashboardLayout() {
    const [isExpanded, setIsExpanded] = useState(false)
    return (
        <div className="p-4 md:p-7">
            <nav className="py-4 px-6 rounded-xl bg-base-100 flex items-center justify-between gap-2">
                <button onClick={() => setIsExpanded(!isExpanded)} className="text-xl cursor-pointer">{isExpanded? <RxCross1 /> : <RiMenu2Line />}</button>
                <Link to='/'><Logo /></Link>
            </nav>
            <section className="flex my-4 gap-4">
                <Aside isExpended={isExpanded} />
                <Outlet />
            </section>
        </div>
    )
}
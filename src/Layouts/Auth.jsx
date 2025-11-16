import { Outlet } from "react-router";
import Logo from "../Utils/Logo";

export default function AuthLayout() {
    return (
        <div className="grid grid-cols-2">
            <aside>
                <Logo />
                <Outlet />
            </aside>
            <img src="" alt="" />
        </div>
    )
}
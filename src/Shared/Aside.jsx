import { NavLink } from "react-router";
import { motion } from "motion/react";
import { GrOverview } from "react-icons/gr";
import { BsBoxSeamFill } from "react-icons/bs";
import { FaTruckRampBox, FaPeopleCarryBox } from "react-icons/fa6";
import { MdPassword } from "react-icons/md";
import { LuBike, LuBadgeHelp, LuLogOut } from "react-icons/lu";
import "./Aside.css"
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const links = [
    { to: "/dashboard", icon: <GrOverview />, text: "Dashboard" },
    { to: "/dashboard/my-parcel", icon: <BsBoxSeamFill />, text: "My Parcel" },
    { to: "/dashboard/assign-parcel", icon: <FaTruckRampBox />, text: "Assign Parcel" },
    { to: "/dashboard/deliver-parcel", icon: <FaPeopleCarryBox />, text: "Deliver Parcel" },
    { to: "/dashboard/add-rider", icon: <LuBike />, text: "Add Rider" },
]
const commonLinks = [
    { to: "/dashboard/change-password", icon: <MdPassword />, text: "Change Password" },
    { to: "/help-center", icon: <LuBadgeHelp />, text: "Help" },
]
export default function Aside({ isExpended }) {
    const {signOutUser} = useContext(AuthContext)
    return (

        <aside className="flex flex-col gap-1 bg-base-100 p-1 rounded-xl">
            {
                links.map((e, i) => (
                    <NavLink key={i} to={e.to} className="p-2 rounded-xl trnsition">
                        {e.icon}
                        <motion.div
                            animate={{ width: isExpended ? "auto" : 0, opacity: isExpended ? 1 : 0 }}
                            initial={false}
                            className="overflow-hidden text-sm font-medium"
                        >
                            {e.text}
                        </motion.div>
                    </NavLink>
                ))
            }
            {
                isExpended
                &&
                <h4 className="text-lg font-medium m-3 mb-0">General</h4>
            }
            {
                commonLinks.map((e, i) => (
                    <NavLink key={i} to={e.to} className="p-2 rounded-xl trnsition">
                        {e.icon}
                        <motion.div
                            animate={{ width: isExpended ? "auto" : 0, opacity: isExpended ? 1 : 0 }}
                            initial={false}
                            className="overflow-hidden text-sm font-medium"
                        >
                            {e.text}
                        </motion.div>
                    </NavLink>
                ))
            }
            <button onClick={() => signOutUser()} className="p-2 flex items-center gap-2 hover:bg-base-200 cursor-pointer rounded-xl trnsition">
                <LuLogOut />
                <motion.div
                    animate={{ width: isExpended ? "auto" : 0, opacity: isExpended ? 1 : 0 }}
                    initial={false}
                    className="overflow-hidden text-sm font-medium"
                >
                    Log Out
                </motion.div>
            </button>
        </aside>

    )
}
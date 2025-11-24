import { Link } from "react-router";
import { motion } from "motion/react";

export default function Aside({ isExpended }) {
    return (

        <aside className="flex flex-col gap-3 bg-base-100 p-4 rounded-2xl">
            <Link to="/" className="flex items-center">
                <div>icon</div>
                <motion.div
                    animate={{ width: isExpended ? "auto" : 0, opacity: isExpended ? 1 : 0 }}
                    initial={false}
                    className="ml-1 overflow-hidden"
                >
                    text
                </motion.div>
            </Link>
        </aside>

    )
}
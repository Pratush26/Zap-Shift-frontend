import { useContext } from "react"
import { UserContext } from "../../Context/AuthContext"

export default function DashboardOverview() {
    const {user} = useContext(UserContext)
    return (
        <main className="w-full">
            <section className="flex items-center justify-between gap-4 w-full">
                <div>
                    <h1 className="text-xl font-bold">Dashboard Overview</h1>
                    <p className="text-sm">You can access all your data and information from anywhere.</p>
                </div>
            <div className="flex items-center justify-center gap-4">
                <span className="text-end">
                    <p className="font-bold">{user?.displayName}</p>
                    <p className="text-xs">{user?.email}</p>
                </span>
                <img src={user?.photoURL} alt="user photo" className="h-12 aspect-square object-cover object-center rounded-full" />
            </div>
            </section>
            <p>hello from dashboard</p>
        </main>
    )
}
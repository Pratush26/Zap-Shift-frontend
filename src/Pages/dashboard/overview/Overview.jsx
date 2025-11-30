import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../Context/AuthContext"
import axios from "axios"
import Graph from "./Graph"
import BranchesBarChart from "./BranchAnalytics"

export default function DashboardOverviewPage() {
    const { user } = useContext(UserContext)
    const [statistics, setStatistics] = useState({ statesResult: [], deliveriesResult: [] })
    useEffect(() => {
        axios(`${import.meta.env.VITE_SERVER}/track-deliveries`)
            .then(res => setStatistics(res.data))
            .catch(err => {
                console.error(err)
                setStatistics({ statesResult: [], deliveriesResult: [] })
            })
    }, [])
    console.log(statistics)
    return (
        <main className="w-full">
            <section className="flex items-center justify-between gap-4 w-full">
                <div>
                    <h1 className="text-3xl font-bold">Dashboard Overview</h1>
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
            <h2 className="text-2xl font-bold my-3">Parcels Status</h2>
            <section className="flex gap-4">
                {
                    statistics?.statesResult?.map((e, i) => (
                        <div key={i} className="px-5 py-3 text-xl text-center rounded-xl shadow bg-base-100 w-full">
                            <h4 className="text-xl font-semibold capitalize">{e._id}</h4>
                            <p>{e.count}</p>
                        </div>
                    ))
                }
            </section>
            <section className="w-full my-5">
                <h2 className="text-2xl font-semibold mb-3">Delivery Analytics</h2>
                <Graph deliveriesResult={statistics?.deliveriesResult} />
            </section>
            <section className="w-full my-5">
                <h2 className="text-2xl font-semibold mb-3">Delivery Analytics</h2>
                <BranchesBarChart />
            </section>
        </main>
    )
}
import { useQuery } from "@tanstack/react-query"
import { useAxios } from "../../../Hooks/useAxios"
import { useContext } from "react"
import { UserContext } from "../../../Context/AuthContext"
import "./table.css"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import Loader from "../../../Shared/Loader"
import Error from "../../../Shared/Error"

export default function MyParcelPage() {
    const { user } = useContext(UserContext)
    const axis = useAxios()
    const { data, isLoading, error: fetchingError } = useQuery({
        queryKey: ['my-parcel'],
        queryFn: () => axis.get(`${import.meta.env.VITE_SERVER}/parcel-data?email=${user?.email}`).then(res => res.data),
        enabled: !!user,
        staleTime: 5 * 60 * 1000,
    })

    if(isLoading) return (
        <div className="w-full flex items-center justify-center min-h-[80vh]">
            <Loader />
        </div>
    )
    if(fetchingError) <Error msg={fetchingError.message} />
    
    const handleClick = (type, id, cost) => {
        console.log(type, id, cost)
        if (type === "pay") {
            Swal.fire({
                title: "Do you want to complete payment now?",
                text: `You have to pay ${cost}!`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Pay now!",
                cancelButtonText: "No, pay later"
            }).then((result) => {
                if (result.isConfirmed) {
                    axis.post(`${import.meta.env.VITE_SERVER}/create-checkout-session`, { parcelId: id }).then(res => {
                        window.location.href = res.data.url
                    }).catch(err => {
                        toast.error(err?.message || err || "Payment failed")
                        console.error(err)
                    })
                }
            });
        }
        else if (type === "delivered") {
            Swal.fire({
                title: "Do you want to complete payment now?",
                text: `You have to pay ${cost}!`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Pay now!",
                cancelButtonText: "No, pay later"
            }).then((result) => {
                if (result.isConfirmed) {
                    // axis.post(`${import.meta.env.VITE_SERVER}/create-checkout-session`, { parcelId: id }).then(res => {
                    //     window.location.href = res.data.url
                    // }).catch(err => {
                    //     toast.error(err?.message || err || "Payment failed")
                    //     console.error(err)
                    // })
                }
            });
        }
    }
    return (
        <main className="w-full">
            <table className="table-auto text-center text-sm font-medium border-collapse w-full sm:w-11/12 mx-auto overflow-hidden">
                <caption className='text-4xl font-bold m-8'>My Parcels : {data?.length}</caption>
                <thead>
                    <tr className="bg-secondary text-secondary-content">
                        <th className="hidden sm:table-cell">SL no.</th>
                        <th>Parcel Info</th>
                        <th>To</th>
                        <th className="hidden sm:table-cell">Payment status</th>
                        <th className="hidden sm:table-cell">Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className="text-gray-800">
                    {
                        data?.map((e, i) => (
                            <tr key={i} className="border border-gray-300 bg-white">
                                <td className="hidden sm:table-cell">{i + 1}</td>
                                <td className="break-all">
                                    <p>{e.parcelInfo}</p>
                                    <p className="text-xs text-gray-600">{e._id}</p>
                                </td>
                                <td>{e.receiverName}</td>
                                <td className="hidden sm:table-cell">
                                    <span className={`${e.paymentStatus === 'unpaid' ? "bg-warning-content" : "bg-secondary"} rounded-full px-4 text-white py-1 text-xs font-semibold`}>
                                        {e.paymentStatus}
                                    </span>
                                </td>
                                <td className="hidden sm:table-cell">
                                    <span className={`${e.status === 'pending' ? "bg-warning" : e.status === 'damaged' ? "bg-error" : "bg-secondary"} rounded-full px-4 text-white py-1 text-xs font-semibold`}>
                                        {e.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="flex justify-center gap-2 flex-wrap">
                                        <button
                                            disabled={!(e.paymentStatus.toLowerCase() === 'unpaid' || e.status.toLowerCase() === 'delivered')}
                                            onClick={() => handleClick(`${e.paymentStatus.toLowerCase() === 'unpaid' ? "pay" : e.status.toLowerCase() === 'delivered' ? "return" : "none"}`, e._id, e.deliveryCost)}
                                            className="bttn shadow rounded-full trnsition hover:text-gray-500"
                                        >
                                            {
                                                e.paymentStatus.toLowerCase() === 'unpaid' ?
                                                    "Pay Now"
                                                    :
                                                    e.status.toLowerCase() === 'delivered' ?
                                                        "Return"
                                                        :
                                                        ""
                                            }
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )
                        )
                    }
                </tbody>
            </table>
        </main>
    )
}
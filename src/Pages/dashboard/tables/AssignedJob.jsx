import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useAxios } from "../../../Hooks/useAxios"
import { useContext } from "react"
import "./table.css"
import Loader from "../../../Shared/Loader"
import Error from "../../../Shared/Error"
import { toast } from "react-toastify"
import { UserContext } from "../../../Context/AuthContext"
import { Link } from "react-router"

export default function AssignedJob() {
    const axis = useAxios()
    const queryClient = useQueryClient();
    const { user } = useContext(UserContext)
    const { data: parcelData, isLoading: parcelLoading, error: parcelErr } = useQuery({
        queryKey: ['assigned-job'],
        queryFn: () => axis.get(`${import.meta.env.VITE_SERVER}/check-assignedJob?riderEmail=${user?.email}`).then(res => res.data),
        staleTime: 5 * 60 * 1000,
        enabled: !!user?.email
    })

    const mutation = useMutation({
        mutationFn: ({ parcelId, accepted }) => axis.patch(`${import.meta.env.VITE_SERVER}/handle-assigned-job`, { parcelId, riderEmail: user?.email, accepted }),

        onSuccess: (res) => {
            toast.success(res?.data?.message || "Successfully updated assigned job");
            queryClient.invalidateQueries(['assigned-job']);
        },

        onError: (error) => {
            console.error(error)
            toast.error(error?.response?.data?.message || "Failed to update assigned job");
        }
    });

    if (parcelLoading) return (
        <div className="flex items-center justify-center min-h-[80vh] w-full">
            <Loader />
        </div>
    )
    if (parcelErr) return <Error msg={parcelErr.message} />
    console.log(parcelData)

    return (
        <main className="w-full">
            {
                parcelData?.length > 0 ?
                    <table className="table-auto text-center text-sm font-medium border-collapse w-full sm:w-11/12 mx-auto overflow-hidden">
                        <caption className='text-4xl font-bold m-8'>Assigned Parcels : {parcelData?.length}</caption>
                        <thead>
                            <tr className="bg-secondary text-secondary-content">
                                <th>Parcel Info</th>
                                <th className="hidden sm:table-cell">Weight</th>
                                <th>From</th>
                                <th className="hidden sm:table-cell">Payment</th>
                                <th className="hidden sm:table-cell">To</th>
                                <th className="hidden sm:table-cell">Charge + Due</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-800">
                            {
                                parcelData?.map((e, i) => (
                                    <tr key={i} className="border border-gray-300 bg-white">
                                        <td className="text-xs">
                                            <p className="font-semibold text-sm">{e.parcelInfo}</p>
                                            <p>{e.senderPhone}</p>
                                        </td>
                                        <td>{e.weight} kg</td>
                                        <td className="text-xs">{e.senderAddress}</td>
                                        <td className="hidden sm:table-cell">
                                            <span className={`${e.paymentStatus === 'unpaid' ? "bg-warning" : "bg-secondary"} rounded-full px-4 text-white py-1 text-xs font-semibold`}>
                                                {e.paymentStatus}
                                            </span>
                                        </td>
                                        <td>{e.to}</td>
                                        <td className="hidden sm:table-cell">{e.deliveryCost} + {e.due ?? 0}</td>
                                        <td>
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => mutation.mutate({ parcelId: e._id, accepted: true })}
                                                    className="bttn trnsition rounded-lg shadow-md/20"
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() => mutation.mutate({ parcelId: e._id, accepted: false })}
                                                    className="px-4 py-2 bg-rose-700 text-white font-semibold cursor-pointer hover:bg-rose-800 trnsition rounded-lg shadow-md/30"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                                )
                            }
                        </tbody>
                    </table>
                    :
                    <div className="flex flex-col min-h-[80vh] w-full items-center justify-center gap-3">
                        <p className="text-3xl font-bold text-secondary">No Assigned Job Found!</p>
                        <Link to="/" className="bttn trnsition rounded-sm shadow-md/20">Back to Home</Link>
                    </div>
            }
        </main>
    )
}
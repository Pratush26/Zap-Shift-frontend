import { useQuery } from "@tanstack/react-query"
import { useAxios } from "../../../Hooks/useAxios"
import { useRef, useState } from "react"
import "./table.css"
import Loader from "../../../Shared/Loader"
import Error from "../../../Shared/Error"
import { toast } from "react-toastify"
import { Link } from "react-router"

export default function AssignParcel() {
    const axis = useAxios()
    const modalRef = useRef(null)
    const [modalData, setModalData] = useState(null)
    const [parcelId, setParcelId] = useState(null)
    const { data: parcelData, isLoading: parcelLoading, error: parcelErr } = useQuery({
        queryKey: ['pending-parcel'],
        queryFn: () => axis.get(`${import.meta.env.VITE_SERVER}/parcel-data?status=pending`).then(res => res.data),
        staleTime: 5 * 60 * 1000,
    })
    const { data: riderData, isLoading: riderLoading, error: riderErr } = useQuery({
        queryKey: ['riderTo-assign'],
        queryFn: () => axis.get(`${import.meta.env.VITE_SERVER}/find-employees?role=rider`).then(res => res.data),
        staleTime: 5 * 60 * 1000,
    })
    if (parcelLoading || riderLoading) return (
        <div className="flex items-center justify-center min-h-[80vh] w-full">
            <Loader />
        </div>
    )
    console.log(riderData)
    if (parcelErr) return <Error msg={parcelErr.message} />
    if (riderErr) return <Error msg={riderErr.message} />
    const handleModal = (id, location) => {
        setParcelId(id)
        setModalData(riderData.filter(e => e.dutyplace === location))
        modalRef.current.showModal()
    }
    const handleAssign = (riderId) => {
        axis.patch(`${import.meta.env.VITE_SERVER}/assign-parcel`, { parcelId, riderId })
            .then(res => {
                if (res.data.success) toast.success(res.data.message || "Successfully assigned rider")
                else toast.error(res.data.message || "Failed to assigned rider")
            })
            .catch(err => {
                console.error(err)
                toast.error(err.message || "Failed to assigned rider")
            })
        modalRef.current.close()
    }
    return (
        <main className="w-full">
            {
                parcelData?.length > 0 ?
                    <table className="table-auto text-center text-sm font-medium border-collapse w-full sm:w-11/12 mx-auto overflow-hidden">
                        <caption className='text-4xl font-bold m-8'>Pending Parcels : {parcelData?.length}</caption>
                        <thead>
                            <tr className="bg-secondary text-secondary-content">
                                <th className="hidden sm:table-cell">SL no.</th>
                                <th>Parcel Info</th>
                                <th className="hidden sm:table-cell">Weight</th>
                                <th>Location</th>
                                <th className="hidden sm:table-cell">Payment</th>
                                <th className="hidden sm:table-cell">To</th>
                                <th className="hidden sm:table-cell">Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-800">
                            {
                                parcelData?.map((e, i) => (
                                    <tr key={i} className="border border-gray-300 bg-white">
                                        <td className="hidden sm:table-cell">{i + 1}</td>
                                        <td className="break-all text-xs">
                                            <p className="font-semibold text-sm">{e.parcelInfo}</p>
                                            <p>{e.senderPhone}</p>
                                        </td>
                                        <td>{e.weight} kg</td>
                                        <td>{e.currentLocation}</td>
                                        <td className="hidden sm:table-cell">
                                            <span className={`${e.paymentStatus === 'unpaid' ? "bg-warning" : "bg-secondary"} rounded-full px-4 text-white py-1 text-xs font-semibold`}>
                                                {e.paymentStatus}
                                            </span>
                                        </td>
                                        <td>{e.to}</td>
                                        <td className="hidden sm:table-cell">
                                            <span className={`${e.status === 'pending' ? "bg-warning" : e.status === 'in-transit' ? "bg-info" : e.status === 'damaged' ? "bg-error" : e.status === 'delivered' ? 'bg-secondary' : 'bg-primary'} rounded-full px-4 text-white py-1 text-xs font-semibold`}>
                                                {e.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="flex justify-center gap-2 flex-wrap">
                                                <button onClick={() => handleModal(e._id, e.currentLocation)} className="bttn trnsition rounded-lg shadow-md/20">Assign Rider</button>
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
                        <p className="text-3xl font-bold text-secondary">No Request Found!</p>
                        <Link to="/" className="bttn trnsition rounded-sm shadow-md/20">Back to Home</Link>
                    </div>
            }
            <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <section className="space-y-1">
                        {
                            modalData?.map((e, i) => (
                                <button onClick={() => handleAssign(e._id)} key={i} className="p-3 cursor-pointer rounded-lg hover:bg-base-300 w-full flex justify-between">
                                    <p>{e.name}</p>
                                    <p>{e?.getWorkToday?.date === new Date().toDateString() ? e?.getWorkToday?.count : 0}</p>
                                </button>
                            ))
                        }
                    </section>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="bttn trnsition rounded-lg">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </main>
    )
}
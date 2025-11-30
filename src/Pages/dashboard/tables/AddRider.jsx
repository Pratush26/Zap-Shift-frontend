import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useAxios } from "../../../Hooks/useAxios"
import "./table.css"
import { useRef, useState } from "react"
import Loader from "../../../Shared/Loader"
import Error from "../../../Shared/Error"
import { Link } from "react-router"
import { toast } from "react-toastify"

export default function AddRiderPage() {
    const axis = useAxios()
    const queryClient = useQueryClient();
    const modalRef = useRef(null)
    const [modalData, setModalData] = useState(null)
    const { data, isLoading, error } = useQuery({
        queryKey: ['add-rider'],
        queryFn: () => axis.get(`${import.meta.env.VITE_SERVER}/find-employees?requestedRole=rider&status=pending`).then(res => res.data),
        staleTime: 5 * 60 * 1000,
    })

    const mutation = useMutation({
        mutationFn: ({ id, action }) =>
            axis.patch(`${import.meta.env.VITE_SERVER}/update-employees-role`, { id, status: action, role: "rider" }),
        
        onSuccess: (res) => {
            toast.success(res.data.message);
            queryClient.invalidateQueries(['add-rider']);
            modalRef.current.close()
        },

        onError: (error) => {
            console.error(error)
            toast.error(error?.response?.data?.message || "Something went wrong!");
            modalRef.current.close()
        }
    });
    if (isLoading) return (
        <div className="flex items-center justify-center min-h-[80vh] w-full">
            <Loader />
        </div>
    )
    if (error) return <Error msg={error.message} />
    console.log(modalData)
    const handleModal = (e) => {
        setModalData(e)
        modalRef.current.showModal()
    }
    return (
        <main className="w-full">
            {
                data?.length > 0 ?
                    <table className="table-auto text-center text-sm font-medium border-collapse w-full sm:w-11/12 mx-auto overflow-hidden">
                        <caption className='text-4xl font-bold m-8'>Rider Requests : {data?.length}</caption>
                        <thead>
                            <tr className="bg-secondary text-secondary-content">
                                <th className="hidden sm:table-cell">SL no.</th>
                                <th>Employee Info</th>
                                <th>Duty Place</th>
                                <th className="hidden sm:table-cell">Address</th>
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
                                            <p className="font-bold text-base">{e.name}</p>
                                            <p>{e.contact}</p>
                                        </td>
                                        <td>{e.dutyplace}</td>
                                        <td>{e.address}</td>
                                        <td className="hidden sm:table-cell">
                                            <span className={`${e.status === 'pending' ? "bg-warning" : e.status === 'approved' ? "bg-secondary" : "bg-error"} rounded-full px-4 text-white py-1 text-xs font-semibold`}>
                                                {e.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="flex justify-center gap-2 flex-wrap">
                                                <button onClick={() => handleModal(e)} className="bttn trnsition rounded-lg shadow-md/20">More Info</button>
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
                        <div className="flex gap-4">
                            <img src={modalData?.image} alt="user image" className="h-20 rounded-sm aspect-square object-cover" />
                            <span className="space-y-1">
                                <p><span className="font-semibold">Name:</span> {modalData?.name}</p>
                                <p><span className="font-semibold">Email:</span> {modalData?.email}</p>
                                <p><span className="font-semibold">Contact:</span> {modalData?.contact}</p>
                                <p><span className="font-semibold">NID:</span> {modalData?.nidNo}</p>
                            </span>
                        </div>
                        <div className="flex justify-between gap-4">
                            <p><span className="font-semibold">Desired role:</span> {modalData?.requestedRole}</p>
                            <p><span className="font-semibold">Role:</span> {modalData?.role}</p>
                        </div>
                        <p><span className="font-semibold">Date of Birth:</span> {modalData?.DOB}</p>
                        <p><span className="font-semibold">Bike:</span> {modalData?.bikeInfo}</p>
                        <p><span className="font-semibold">Bike Reg. No:</span> {modalData?.bikeRegistrationNumber}</p>
                        <p><span className="font-semibold">About:</span> {modalData?.aboutSelf}</p>
                        <div className="flex justify-between gap-4"></div>
                        <div className="flex font-bold justify-evenly gap-4">
                            <p>Address</p>
                            <p>Duty Place</p>
                        </div>
                        <div className="flex justify-evenly gap-4">
                            <p>{modalData?.address}</p>
                            <p>{modalData?.dutyplace}</p>
                        </div>
                    </section>
                    <div className="modal-action flex justify-between gap-5">
                        <form method="dialog">
                            <button className="bttn trnsition rounded-lg">Close</button>
                        </form>
                        <div className="flex flex-wrap gap-2 text-sm font-semibold text-base-100">
                            <button
                                className="trnsition px-4 py-2 rounded-lg cursor-pointer hover:shadow-md/50 bg-rose-700"
                                onClick={() => mutation.mutate({ id: modalData?._id, action: "rejected" })}
                            >
                                Reject
                            </button>
                            <button
                                className="trnsition px-4 py-2 rounded-lg cursor-pointer hover:shadow-md/50 bg-secondary"
                                onClick={() => mutation.mutate({ id: modalData?._id, action: "approved" })}
                            >
                                Approve
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
        </main>
    )
}
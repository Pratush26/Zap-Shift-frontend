import axios from "axios"
import { useForm } from "react-hook-form"
import './style.css'
import Error from "../../Shared/Error"
import Loader from "../../Shared/Loader"
import { useState } from "react"
import { toast } from "react-toastify"

export default function TrackOrder() {
    const [isLoading, setIsLoading] = useState(false)
    const [details, setDetails] = useState(null)
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
    const onSubmit = (data) => {
        setIsLoading(true)
        console.log(data)
        axios.get(`${import.meta.env.VITE_SERVER}/track-parcel/${data.trackingId}`)
            .then(res => {
                console.log(res.data)
                setDetails(res.data)
                setIsLoading(false)
            })
            .catch(err => {
                toast.error("something wrong")
                console.error(err)
                setIsLoading(false)
            })
    }
    return (
        <main className="w-full my-8">
            <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 flex flex-col gap-3 my-4 mx-auto" >
                <h1 className="text-2xl text-secondary font-bold text-center">Track Your Parcel</h1>
                <div className="w-full">
                    {errors.trackingId ? <p className="text-sm text-error">{errors.trackingId.message}</p> : <label htmlFor="trackingId">Tracking Id :</label>}
                    <input type="text" {...register("trackingId", { required: "Tracking Id is required" })} placeholder="Enter your parcel's Tracking Id" id="trackingId" />
                </div>
                <button type="submit" className="bttn trnsition rounded-full mx-auto shadow-md">{isSubmitting ? "Tracking" : "Track"}</button>
            </form>
            {
                isLoading ?
                <div className="w-full flex items-center justify-center min-h-[50vh]">
                    <Loader />
                </div>
                    :
                    details
                    &&
                    <div className="grid grid-cols-[40%_60%] gap-5">
                        <aside className="flex gap-6 justify-evenly p-5 rounded-xl bg-base-100 flex-wrap">
                            <span className="text-sm font-medium">
                                <p className="underline underline-offset-2 font-semibold text-base">From</p>
                                <p>{details.senderName}</p>
                                <p>{details.senderPhone}</p>
                                <p className="font-bold text-base">{details.from}</p>
                                <p>Transaction ID: {details.transactionId}</p>
                                <p>Sent: {new Date(details.createdAt).toLocaleString()}</p>
                            </span>
                            <span className="text-sm font-medium">
                                <p className="underline underline-offset-2 font-semibold text-base">To</p>
                                <p>{details.receiverName}</p>
                                <p>{details.receiverPhone}</p>
                                <p className="font-bold text-base">{details.to}</p>
                                <p>Weight: {details.weight}</p>
                            </span>
                        </aside>
                        <span>
                            {
                                details.state.map((e, i) => (
                                    <div key={i}>
                                        <p>{i}</p>
                                    </div>
                                ))}
                        </span>
                    </div>
            }
        </main>
    )
}
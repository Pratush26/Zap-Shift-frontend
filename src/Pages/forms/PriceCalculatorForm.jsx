import axios from "axios"
import { useForm } from "react-hook-form"
import './style.css'
import { useQuery } from "@tanstack/react-query"
import Error from "../../Shared/Error"
import Loader from "../../Shared/Loader"
import { useState } from "react"
import { priceCalculator } from "../../Utils/PriceCalculator"

export default function PriceCalculatorForm() {
    const [deliveryCost, setDeliveryCost] = useState(0)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { data: divisionData, isLoading: divisionLoading, error: divisionError } = useQuery({
        queryKey: ['divisions'],
        queryFn: () => axios.get(`${import.meta.env.VITE_SERVER}/divisions`).then(res => res.data),
        staleTime: 5 * 60 * 1000,
    })

    if (divisionLoading) return <Loader />;
    if (divisionError) return <Error msg={divisionError?.message} />;
    const onSubmit = (data) => setDeliveryCost(priceCalculator(data.senderDivision, data.receiverDivision, data.parcelType, data.weight))
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full grid grid-cols-2 gap-4" >
            <h1 className="text-2xl text-secondary font-bold text-center">Calculate Delivery Cost</h1>
            <p className="font-bold text-neutral-content bg-neutral p-2 rounded-sm text-center">Delivery Cost :  {deliveryCost}</p>
            <div className="w-full">
                    {errors.parcelType ? <p className="text-sm text-error">{errors.parcelType.message}</p> : <label htmlFor="parcelType">Parcel Type :</label>}
                    <div>
                        <input type="radio" {...register("parcelType", { required: "Parcel type is required" })} value="document" id="document" />
                        <label htmlFor="document">Document</label>
                    </div>
                    <div>
                        <input type="radio" {...register("parcelType", { required: "Parcel type is required" })} value="non-document" id="non-document" />
                        <label htmlFor="non-document">Non-Document</label>
                    </div>
                </div>
            <div className="w-full">
                    {errors.weight ? <p className="text-sm text-error">{errors.weight.message}</p> : <label htmlFor="weight">Weight :</label>}
                    <input type="number" {...register("weight", { required: "weight is required" })} placeholder="Enter parcel weight" id="weight" />
                </div>
            <div className="w-full">
                    {errors.senderDivision ? <p className="text-sm text-rose-500">{errors.senderDivision.message}</p> : <label htmlFor="senderDivision">Sender Division :</label>}
                    <select {...register("senderDivision", { required: "Sender Division is required", validate: value => value !== "" || "Sender Division is required" })} id="senderDivision" className="select" defaultValue="" >
                        <option value="" disabled>Select a Division</option>
                        {
                            divisionData?.map(e => <option key={e._id} value={e.name}>{e.name}</option>)
                        }
                    </select>
                </div>
            <div className="w-full">
                    {errors.receiverDivision ? <p className="text-sm text-rose-500">{errors.receiverDivision.message}</p> : <label htmlFor="receiverDivision">Receiver Division :</label>}
                    <select {...register("receiverDivision", { required: "Receiver Division is required", validate: value => value !== "" || "receiver Division is required" })} id="receiverDivision" className="select" defaultValue="" >
                        <option value="" disabled>Select a Division</option>
                        {
                            divisionData?.map(e => <option key={e._id} value={e.name}>{e.name}</option>)
                        }
                    </select>
                </div>

            <button type="submit" className="bttn trnsition rounded-full mt-2">Check price</button>
        </form>
    )
}
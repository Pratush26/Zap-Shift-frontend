import axios from "axios"
import { useForm } from "react-hook-form"
// import { toast } from "react-toastify"
import './style.css'
import { useQuery } from "@tanstack/react-query"
import Error from "../../Shared/Error"
import Loader from "../../Shared/Loader"
import { useState } from "react"

export default function PriceCalculatorForm() {
    const [deliveryCost, setDeliveryCost] = useState(0)
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()
    const { data: divisionData, isLoading: divisionLoading, error: divisionError } = useQuery({
        queryKey: ['divisions'],
        queryFn: () => axios.get(`${import.meta.env.VITE_SERVER}/divisions`).then(res => res.data),
        staleTime: 5 * 60 * 1000,
    })

    const { data: branchesData, isLoading: branchesLoading, error: branchesError } = useQuery({
        queryKey: ['branches'],
        queryFn: () => axios.get(`${import.meta.env.VITE_SERVER}/branches`).then(res => res.data),
        staleTime: 5 * 60 * 1000,
    })
    if (branchesLoading || divisionLoading) return <Loader />;
    if (divisionError) return <Error msg={divisionError?.message} />;
    if (branchesError) return <Error msg={branchesError?.message} />;
    const onSubmit = (data) => {
        // sigInUser(data.email, data.password)
        //     .then((res) => {
        //         toast.success(`Welcome Back, ${res.user?.displayName}`)
        //         reset()
        //         navigate(state || "/")
        //     })
        //     .catch(err => {
        //         console.error("Login error:", err);
        //         toast.error(err.message || "Login failed")
        //     })
        console.log(data)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4" >
            <h1 className="text-2xl text-secondary font-bold">Calculate Delivery Cost</h1>
            <p className="font-semibold">Delivery Cost :  {deliveryCost}</p>
            <div className="w-full">
                {errors.address ? <p className="text-sm text-rose-500">{errors.address.message}</p> : <label htmlFor="address">Division :</label>}
                <select defaultValue="Select your division" {...register("address", { required: "Division is required" })} id="address" className="select">
                    <option disabled={true}>Select your division</option>
                    {
                        divisionData?.map(e => <option key={e._id} value={e.name}>{e.name}</option>)
                    }
                </select>
            </div>
            <div className="w-full">
                {errors.dutyplace ? <p className="text-sm text-rose-500">{errors.dutyplace.message}</p> : <label htmlFor="dutyplace">Which wire-house you want to work? :</label>}
                <select defaultValue="Select your duty place" {...register("dutyplace", { required: "Duty place is required" })} id="dutyplace" className="select">
                    <option disabled={true}>Select your duty place</option>
                    {
                        branchesData?.map(e => <option key={e._id} value={e.district}>{e.district}</option>)
                    }
                </select>
            </div>
            <div className="w-full">
                {errors.weight ? <p className="text-sm text-rose-500">{errors.weight.message}</p> : <label htmlFor="weight">Weight :</label>}
                <input type="number" {...register("weight", { required: "Weight is required" })} placeholder="Enter product's weight" id="weight" />
            </div>

            <button disabled={isSubmitting} type="submit" className="bttn trnsition rounded-full mt-2">{isSubmitting ? "Checking..." : "Check"}</button>
        </form>
    )
}
import axios from "axios"
import { useContext, useEffect, useRef, useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import { toast } from "react-toastify"
import './style.css'
import { AuthContext } from "../../Context/AuthContext"
import { useQuery } from "@tanstack/react-query"
import Loader from "../../Shared/Loader"
import Error from "../../Shared/Error"

export default function SendParcelForm() {
    const { user, createUser, updateUser, googleSignIn } = useContext(AuthContext)
    const { register, handleSubmit, setError, control, clearErrors, reset, formState: { errors, isSubmitting } } = useForm()
    const sdivision = useWatch({ control, name: "senderDivision" })
    const rdivision = useWatch({ control, name: "receiverDivision" })
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
    const sbranchesData = branchesData.filter(b => b.region === sdivision)
    const rbranchesData = branchesData.filter(b => b.region === rdivision)
    const onSubmit = (data) => {
        console.log(data)
        // axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_BB_KEY}`, formData)
        //     .then((res) => {
        //         createUser(data.email, data.password)
        //             .then(() => {
        //                 updateUser(data.name, res.data.data.display_url)
        //             })
        //             .then(() => {
        //                 toast.success("Registration Successful")
        //                 reset()
        //                 navigate(state || "/")
        //             })
        //             .catch(err => {
        //                 console.error("Update user error:", err);
        //                 toast.error(err.message || "Profile update failed")
        //             })
        //     })
        //     .catch((er) => {
        //         console.error("Image upload error:", er);
        //         toast.error(er.message || "Image upload failed")
        //     });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full p-10 my-6 mx-2 rounded-2xl bg-base-100 grid grid-cols-2 place-content-center-safe gap-6" >
            <h1 className="text-4xl font-bold col-span-2">Parcel Information</h1>

            <fieldset className="grid grid-cols-2 col-span-2 gap-6">
                <legend className="font-semibold text-lg underline underline-offset-4 text-secondary mb-4">Parcel Details</legend>
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
                <div className="w-full flex flex-col justify-center h-full">
                    <p>Delivery Charge: d</p>
                    <p>Estimated Time: d</p>
                </div>
                <div className="w-full">
                    {errors.parcelTitle ? <p className="text-sm text-error">{errors.parcelTitle.message}</p> : <label htmlFor="parcelTitle">Parcel Title :</label>}
                    <input type="text" {...register("parcelTitle", { required: "parcel title is required" })} placeholder="Enter parcel title" id="parcelTitle" />
                </div>
                <div className="w-full">
                    {errors.weight ? <p className="text-sm text-error">{errors.weight.message}</p> : <label htmlFor="weight">Weight :</label>}
                    <input type="number" {...register("weight", { required: "weight is required" })} placeholder="Enter parcel weight" id="weight" />
                </div>
            </fieldset>

            <fieldset className="space-y-4">
                <legend className="font-semibold text-lg underline underline-offset-4 text-secondary">Sender Details</legend>
                <div className="w-full">
                    {errors.senderName ? <p className="text-sm text-rose-500">{errors.senderName.message}</p> : <label htmlFor="senderName">Sender Name :</label>}
                    <input type="text" {...register("senderName", { required: "senderName is required" })} placeholder="Enter sender name" id="senderName" />
                </div>
                <div className="w-full">
                    {errors.senderEmail ? <p className="text-sm text-rose-500">{errors.senderEmail.message}</p> : <label htmlFor="senderEmail">Sender Email :</label>}
                    <input type="email" {...register("senderEmail", { required: "sender email is required" })} placeholder="Enter sender email" id="senderEmail" />
                </div>
                <div className="w-full">
                    {errors.senderPhone ? <p className="text-sm text-error">{errors.senderPhone.message}</p> : <label htmlFor="senderPhone">Sender Phone :</label>}
                    <input type="tel" {...register("senderPhone", { required: "Sender phone number is required", minLength: { value: 11, message: "Phone number must be 11 digits" } })} placeholder="Enter sender phone number" id="senderPhone" />
                </div>
                <div className="w-full col-span-2">
                    {errors.senderDivision ? <p className="text-sm text-rose-500">{errors.senderDivision.message}</p> : <label htmlFor="senderDivision">Sender Division :</label>}
                    <select {...register("senderDivision", { required: "Sender Division is required", validate: value => value !== "" || "Sender Division is required" })} id="senderDivision" className="select" defaultValue="" >
                        <option value="" disabled>Select a Division</option>
                        {
                            divisionData?.map(e => <option key={e._id} value={e.name}>{e.name}</option>)
                        }
                    </select>
                </div>
                <div className="w-full col-span-2">
                    {errors.from ? <p className="text-sm text-rose-500">{errors.from.message}</p> : <label htmlFor="from">From :</label>}
                    <select {...register("from", { required: "Sender place is required", validate: value => value !== "" || "Sender place is required" })} id="from" className="select" defaultValue="" >
                        <option value="" disabled>Select a place</option>
                        {
                            sbranchesData?.map(e => <option key={e._id} value={e.district}>{e.district}</option>)
                        }
                    </select>
                </div>
                <div className="w-full">
                    {errors.senderAddress ? <p className="text-sm text-rose-500">{errors.senderAddress.message}</p> : <label htmlFor="senderAddress">Sender Address :</label>}
                    <textarea type="text" {...register("senderAddress", { required: "sender address is required" })} placeholder="Enter sender address" id="senderAddress" />
                </div>
            </fieldset>

            <fieldset className="space-y-4">
                <legend className="font-semibold text-lg underline underline-offset-4 text-secondary">Receiver Details</legend>
                <div className="w-full">
                    {errors.receiverName ? <p className="text-sm text-rose-500">{errors.receiverName.message}</p> : <label htmlFor="receiverName">Receiver Name :</label>}
                    <input type="text" {...register("receiverName", { required: "Receiver name is required" })} placeholder="Enter receiver name" id="receiverName" />
                </div>
                <div className="w-full">
                    {errors.receiverEmail ? <p className="text-sm text-rose-500">{errors.receiverEmail.message}</p> : <label htmlFor="receiverEmail">Receiver Email :</label>}
                    <input type="email" {...register("receiverEmail", { required: "Receiver email is required" })} placeholder="Enter receiver email" id="receiverEmail" />
                </div>
                <div className="w-full">
                    {errors.receiverPhone ? <p className="text-sm text-error">{errors.receiverPhone.message}</p> : <label htmlFor="receiverPhone">Receiver Phone :</label>}
                    <input type="tel" {...register("receiverPhone", { required: "Receiver phone number is required", minLength: { value: 11, message: "Phone number must be 11 digits" } })} placeholder="Enter receiver phone number" id="receiverPhone" />
                </div>
                <div className="w-full col-span-2">
                    {errors.receiverDivision ? <p className="text-sm text-rose-500">{errors.receiverDivision.message}</p> : <label htmlFor="receiverDivision">Receiver Division :</label>}
                    <select {...register("receiverDivision", { required: "Receiver Division is required", validate: value => value !== "" || "receiver Division is required" })} id="receiverDivision" className="select" defaultValue="" >
                        <option value="" disabled>Select a Division</option>
                        {
                            divisionData?.map(e => <option key={e._id} value={e.name}>{e.name}</option>)
                        }
                    </select>
                </div>
                <div className="w-full col-span-2">
                    {errors.to ? <p className="text-sm text-rose-500">{errors.to.message}</p> : <label htmlFor="to">To :</label>}
                    <select {...register("to", { required: "Receiver place is required", validate: value => value !== "" || "Receiver place is required" })} id="to" className="select" defaultValue="" >
                        <option value="" disabled>Select a place</option>
                        {
                            rbranchesData?.map(e => <option key={e._id} value={e.district}>{e.district}</option>)
                        }
                    </select>
                </div>
                <div className="w-full">
                    {errors.receiverAddress ? <p className="text-sm text-rose-500">{errors.receiverAddress.message}</p> : <label htmlFor="receiverAddress">Receiver Address :</label>}
                    <textarea type="text" {...register("receiverAddress", { required: "receiver address is required" })} placeholder="Enter receiver address" id="receiverAddress" />
                </div>
            </fieldset>
            <div className="col-span-2 flex flex-col items-center gap-2 text-center text-sm">
                <p>Click the Submit Button to Check the delivery cost and continue further proccess...</p>
                <button disabled={isSubmitting} type="submit" className="bttn trnsition rounded-md shadow-lg/20">{isSubmitting ? "Submitting..." : "Submit"}</button>
            </div>
        </form>
    )
}
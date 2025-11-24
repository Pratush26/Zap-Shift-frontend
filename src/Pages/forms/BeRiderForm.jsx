import axios from "axios"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import './style.css'
import { useQuery } from "@tanstack/react-query"
import Error from "../../Shared/Error"
import Loader from "../../Shared/Loader"
import { useContext } from "react"
import { UserContext } from "../../Context/AuthContext"
import { useAxios } from "../../Hooks/useAxios"

export default function BeRiderForm() {
    const { user } = useContext(UserContext)
    const Axios = useAxios()
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
        Axios.post("/rider-request", {
            ...data,
            name: user?.displayName,
            email: user?.email,
            image: user?.photoURL,
            requestedRole: "rider"
        }
        ).then((res) => {
            if(res.data.acknowledged) toast.success(`Your Request is successfully submitted,\nYou will be notified soon`)
            else toast.error("Submission failed, please try again later")
            reset()
        }).catch(err => {
            console.error("Something went wrong", err);
            toast.error(err.response?.data?.message || err.message || "Something went wrong, please try again later")
        })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full grid grid-cols-2 gap-4" >
            <h1 className="text-2xl text-secondary font-bold col-span-2">Tell us about yourself</h1>

            <div className="w-full">
                {errors.address ? <p className="text-sm text-error">{errors.address.message}</p> : <label htmlFor="address">Division :</label>}
                <select defaultValue="" {...register("address", { required: "Division is required" })} id="address" className="select">
                    <option disabled={true} value="" >Select your division</option>
                    {
                        divisionData?.map(e => <option key={e._id} value={e.name}>{e.name}</option>)
                    }
                </select>
            </div>
            <div className="w-full">
                {errors.nidNo ? <p className="text-sm text-error">{errors.nidNo.message}</p> : <label htmlFor="nidNo">NID No. :</label>}
                <input type="number" {...register("nidNo", { required: "NID No. is required" })} placeholder="Enter your NID No." id="nidNo" />
            </div>
            <div className="w-full">
                {errors.contact ? <p className="text-sm text-error">{errors.contact.message}</p> : <label htmlFor="contact">Contact :</label>}
                <input type="tel" {...register("contact", { required: "Contact number is required", minLength: { value: 11, message: "Phone number must be 11 digits" } })} placeholder="Enter your contact number" id="contact" />
            </div>
            <div className="w-full">
              {errors.DOB ? <p className="text-sm text-error">{errors.DOB.message}</p> : <label htmlFor="DOB">Date Of Birth :</label>}
              <input type="date" {...register("DOB", { required: "Date Of Birth is required" })} placeholder="Enter your Date Of Birth" id="DOB" />
            </div>
            <div className="w-full">
                {errors.bikeRegistrationNumber ? <p className="text-sm text-error">{errors.bikeRegistrationNumber.message}</p> : <label htmlFor="bikeRegistrationNumber">Bike Registration Number :</label>}
                <input type="text" {...register("bikeRegistrationNumber", { required: "Bike's Registration Number is required" })} placeholder="Enter your bike registration number" id="bikeRegistrationNumber" />
            </div>
            <div className="w-full">
                {errors.bikeInfo ? <p className="text-sm text-error">{errors.bikeInfo.message}</p> : <label htmlFor="bikeInfo">Bike Brand Model and Year :</label>}
                <input type="text" {...register("bikeInfo", { required: "Bike's information is required" })} placeholder="Enter your Bike Brand Model and Year" id="bikeInfo" />
            </div>
            <div className="w-full">
                {errors.dutyplace ? <p className="text-sm text-error">{errors.dutyplace.message}</p> : <label htmlFor="dutyplace">Which wire-house you want to work? :</label>}
                <select defaultValue="" {...register("dutyplace", { required: "Duty place is required" })} id="dutyplace" className="select">
                    <option disabled={true} value="" >Select your duty place</option>
                    {
                        branchesData?.map(e => <option key={e._id} value={e.district}>{e.district}</option>)
                    }
                </select>
            </div>
            <div className="w-full col-span-2">
                {errors.aboutSelf ? <p className="text-sm text-error">{errors.aboutSelf.message}</p> : <label htmlFor="aboutSelf">Tell Us About Yourself :</label>}
                <textarea type="text" {...register("aboutSelf", { required: "Self details is required" })} placeholder="Enter about yourself" id="aboutSelf" />
            </div>
            <button disabled={isSubmitting} type="submit" className="bttn trnsition rounded-full col-span-2 mt-2">{isSubmitting ? "Submitting..." : "Submit"}</button>
        </form>
    )
}
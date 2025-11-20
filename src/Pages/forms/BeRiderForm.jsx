import axios from "axios"
import { useForm } from "react-hook-form"
// import { toast } from "react-toastify"
import './style.css'
import { useQuery } from "@tanstack/react-query"
import Error from "../../Shared/Error"
import Loader from "../../Shared/Loader"

export default function BeRiderForm() {
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
        <form onSubmit={handleSubmit(onSubmit)} className="w-full grid grid-cols-2 gap-3" >
            <h1 className="text-2xl text-secondary font-bold col-span-2">Tell us about yourself</h1>

            <div className="w-full">
                {errors.name ? <p className="text-sm text-rose-500">{errors.name.message}</p> : <label htmlFor="name">Name :</label>}
                <input type="text" {...register("name", { required: "Name is required" })} placeholder="Enter your name" id="name" />
            </div>
            <div className="w-full">
                {errors.age ? <p className="text-sm text-rose-500">{errors.age.message}</p> : <label htmlFor="age">Age :</label>}
                <input type="number" {...register("age", { required: "Age is required" })} placeholder="Enter your age" id="age" />
            </div>
            <div className="w-full">
                {errors.email ? <p className="text-sm text-rose-500">{errors.email.message}</p> : <label htmlFor="email">Email :</label>}
                <input type="email" {...register("email", { required: "Email is required" })} placeholder="Enter your email" id="email" />
            </div>
            <div className="w-full">
                {errors.riderDivision ? <p className="text-sm text-rose-500">{errors.riderDivision.message}</p> : <label htmlFor="riderDivision">Division :</label>}
                <select defaultValue="Select your division" {...register("riderDivision", { required: "Division is required" })} id="riderDivision" className="select">
                    <option disabled={true}>Select your division</option>
                    {
                        divisionData?.map(e => <option key={e._id} value={e.name}>{e.name}</option>)
                    }
                </select>
            </div>
            <div className="w-full">
                {errors.nidNo ? <p className="text-sm text-rose-500">{errors.nidNo.message}</p> : <label htmlFor="nidNo">NID No. :</label>}
                <input type="number" {...register("nidNo", { required: "NID No. is required" })} placeholder="Enter your NID No." id="nidNo" />
            </div>
            <div className="w-full">
                {errors.contact ? <p className="text-sm text-rose-500">{errors.contact.message}</p> : <label htmlFor="contact">Contact :</label>}
                <input type="number" {...register("contact", { required: "Contact number is required" })} placeholder="Enter your contact number" id="contact" />
            </div>
            <div className="w-full col-span-2">
                {errors.dutyplaceriderDivision ? <p className="text-sm text-rose-500">{errors.dutyplace.message}</p> : <label htmlFor="dutyplace">Which wire-house you want to work? :</label>}
                <select defaultValue="Select your duty place" {...register("dutyplace", { required: "Duty place is required" })} id="dutyplace" className="select">
                    <option disabled={true}>Select your duty place</option>
                    {
                        branchesData?.map(e => <option key={e._id} value={e.district}>{e.district}</option>)
                    }
                </select>
            </div>

            <button disabled={isSubmitting} type="submit" className="bttn trnsition rounded-full col-span-2 mt-2">{isSubmitting ? "Submitting..." : "Submit"}</button>
        </form>
    )
}
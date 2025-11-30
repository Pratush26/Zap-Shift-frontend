import axios from "axios"
import { useForm, useWatch } from "react-hook-form"
import { toast } from "react-toastify"
import './style.css'
import imgIcon from "../../assets/image-upload-icon.png"
import { useQuery } from "@tanstack/react-query"
import Error from "../../Shared/Error"
import Loader from "../../Shared/Loader"
import { useContext, useEffect, useRef, useState } from "react"
import { UserContext } from "../../Context/AuthContext"
import { useAxios } from "../../Hooks/useAxios"

export default function BeRiderForm() {
    const { user } = useContext(UserContext)
    const Axios = useAxios()
    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(null);
    const { register, handleSubmit, reset, control, setError, clearErrors, formState: { errors, isSubmitting } } = useForm()
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

    const imageFile = useWatch({ control, name: 'image' });

    // Generate preview when file is selected
    useEffect(() => {
        if (imageFile && imageFile[0]) {
            const file = imageFile[0];
            const maxSize = 1024 * 1024; // 1MB

            if (file.size > maxSize) {
                setTimeout(() => {
                    setError("image", {
                        type: "manual",
                        message: `File must be less than 1MB (current: ${(file.size / 1024 / 1024).toFixed(2)}MB)`
                    });
                    setPreview(null);
                }, 0);
            } else {
                clearErrors("image");
                const reader = new FileReader();
                reader.onload = (e) => setPreview(e.target.result)
                reader.readAsDataURL(file)
            }
        }
        else setTimeout(() => setPreview(null), 0)
    }, [imageFile, setError, clearErrors]);

    const handleIconClick = () => {
        fileInputRef.current?.click();
    };

    if (branchesLoading || divisionLoading) return <Loader />;
    if (divisionError) return <Error msg={divisionError?.message} />;
    if (branchesError) return <Error msg={branchesError?.message} />;
    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("image", data.image[0]);

        axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_BB_KEY}`, formData)
            .then((ImgRes) => {
                Axios.post("/rider-request", {
                    ...data,
                    name: user?.displayName,
                    email: user?.email,
                    image: ImgRes.data.data.display_url,
                    requestedRole: "rider"
                }
                ).then((res) => {
                    if (res.data.acknowledged) toast.success(`Your Request is successfully submitted,\nYou will be notified soon`)
                    else toast.error("Submission failed, please try again later")
                    reset()
                }).catch(err => {
                    console.error("Something went wrong", err);
                    toast.error(err.response?.data?.message || err.message || "Something went wrong, please try again later")
                })
            }).catch(err => {
                console.error("Something went wrong", err);
                toast.error(err.response?.data?.message || err.message || "Something went wrong, please try again later")
            })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full grid grid-cols-2 gap-4" >
            <h1 className="text-2xl text-secondary font-bold col-span-2">Tell us about yourself</h1>
            <div className="w-full">
                {errors.image ? <p className="text-sm text-rose-500">{errors.image.message}</p> : <label htmlFor="image">Image:</label>}
                <input type="file"
                    id="image"
                    {...register("image", { required: "image is required" })}
                    ref={(e) => {
                        fileInputRef.current = e;
                        register("image").ref(e);
                    }}
                    className="hidden"
                    accept="image/*" />

                <div onClick={handleIconClick} className="cursor-pointer w-fit">
                    {preview ?
                        <div className="flex items-center gap-3">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-14 h-14 shadow-lg/30 object-cover rounded-full"
                            />
                            <span className="text-sm text-blue-600">Click to change image</span>
                        </div>
                        :
                        <div className="flex items-center gap-3">
                            <img src={imgIcon} alt="image upload icon" className="rounded-full shadow-lg/30 h-14 w-14" />
                            <span className="mt-2 text-sm text-gray-600">Click to upload image <br /> PNG, JPG, JPEG up to 10MB</span>
                        </div>
                    }
                </div>
            </div>
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
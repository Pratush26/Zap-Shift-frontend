import axios from "axios"
import { useContext, useEffect, useRef, useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import { Link, useLocation, useNavigate } from "react-router"
import { toast } from "react-toastify"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import './style.css'
import imgIcon from "../../assets/image-upload-icon.png"
import { AuthContext } from "../../Context/AuthContext"

export default function RegisterForm() {
    const { user, createUser, updateUser, googleSignIn } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false)
    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate()
    const { state } = useLocation()
    const { register, handleSubmit, setError, control, clearErrors, reset, formState: { errors, isSubmitting } } = useForm()

    useEffect(() => {
        if (user) navigate(state || "/")
    }, [user, navigate, state])

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("image", data.image[0]);

        axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_BB_KEY}`, formData)
            .then((res) => {
                return createUser(data.email, data.password)
                    .then(() => {
                        return updateUser(data.name, res.data.data.display_url)
                    })
                    .then(() => {
                        toast.success("Registration Successful")
                        reset()
                    })
                    .catch(err => {
                        console.error("Update user error:", err);
                        toast.error(err.message || "Profile update failed")
                    })
            })
            .catch((er) => {
                console.error("Image upload error:", er);
                toast.error(er.message || "Image upload failed")
            });
    }

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(() => toast.success("Login Successful"))
            .catch(err => {
                console.error("Google login error:", err);
                toast.error(err.message || "Google login failed")
            })
    }

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
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full px-8 py-12 my-6 mx-2 rounded-lg flex flex-col items-center-safe justify-center-safe gap-3" >
            <h1 className="text-4xl font-bold">Create an Account</h1>
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
                {errors.name ? <p className="text-sm text-rose-500">{errors.name.message}</p> : <label htmlFor="name">Name :</label>}
                <input type="text" {...register("name", { required: "Name is required" })} placeholder="Enter your name" id="name" />
            </div>
            <div className="w-full">
                {errors.email ? <p className="text-sm text-rose-500">{errors.email.message}</p> : <label htmlFor="email">Email :</label>}
                <input type="email" {...register("email", { required: "Email is required" })} placeholder="Enter your email" id="email" />
            </div>
            <div className="w-full relative">
                {errors.password ? <p className="text-sm text-rose-500">{errors.password.message}</p> : <label htmlFor="password">Password :</label>}
                <input type={`${showPassword ? 'text' : 'password'}`} placeholder="Enter password" id="password"
                    {...register("password", { required: "Password is required", pattern: { value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, message: "Password must contain at least 6 characters including upper and lowercase letters" } })} />
                <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute p-1 right-2 bottom-0 -translate-y-1/3 cursor-pointer'>{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
            </div>
            <p className="font-semibold text-gray-700 text-sm my-4">Already have an account? <Link state={state || '/'} to='/login' className="text-sky-500 hover:text-blue-600 trnsition">Login</Link></p>
            <button disabled={isSubmitting} type="submit" className="bttn trnsition rounded-full">{isSubmitting ? "Registering..." : "Register"}</button>
            <button disabled={isSubmitting} type="button" onClick={handleGoogleLogin} className="bttn-outw bg-base-100 rounded-full hover:text-gray-500 trnsition my-1 flex items-center-safe gap-2"><FcGoogle />Sign in with Google</button>
        </form>
    )
}
import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from "react-router"
import { toast } from "react-toastify"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import './style.css'

export default function LoginForm() {
    // const { user, createUser, updateUser, googleSignIn } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const { state } = useLocation()
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()
    // if (user) navigate(state || "/");

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("image", data.image[0]);
        // axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_BB_KEY}`, formData).then((res) => {
        //     createUser(data.email, data.password).then(() => {
        //         updateUser(data.name, res.data.data.display_url).then(() => {
        //             toast.success("Registration Successful")
        //             reset()
        //         }).catch(err => toast.error(err))
        //     }).catch(e => toast.error(e))
        // }).catch((er) => toast.error(er));
    }

    const handleGoogleLogin = () => {
        // googleSignIn().then(() => {
        //     toast.success("Login Successful")
        //     navigate(state || "/")
        // }).catch(err => toast.error(err))
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full px-8 py-12 my-6 mx-2 rounded-lg flex flex-col items-center-safe justify-center-safe gap-3" >
            <h1 className="text-4xl font-bold">Log In</h1>
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
            <p className="font-semibold text-gray-700 text-sm my-4">Don't have an account? <Link state={state || '/'} to='/register' className="text-sky-500 hover:text-blue-600 trnsition">Register</Link></p>
            <button disabled={isSubmitting} type="submit" className="bttn trnsition rounded-full">{isSubmitting ? "Login in..." : "Login"}</button>
            <button disabled={isSubmitting} type="button" onClick={handleGoogleLogin} className="bttn-outw rounded-full hover:text-gray-500 trnsition my-1 flex items-center-safe gap-2"><FcGoogle />Log in with Google</button>
        </form>
    )
}
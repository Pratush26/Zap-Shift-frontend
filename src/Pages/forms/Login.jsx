import { useContext, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from "react-router"
import { toast } from "react-toastify"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import './style.css'
import { AuthContext } from "../../Context/AuthContext"

export default function LoginForm() {
    const { user, sigInUser, googleSignIn } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const { state } = useLocation()
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

    useEffect(() => {
        if (user) navigate(state || "/")
    }, [user, navigate, state])

    const onSubmit = (data) => {
        sigInUser(data.email, data.password)
            .then((res) => {
                toast.success(`Welcome Back, ${res.user?.displayName}`)
                reset()
                navigate(state || "/")
            })
            .catch(err => {
                console.error("Login error:", err);
                toast.error(err.message || "Login failed")
            })
    }

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(res => {
                toast.success(`Welcome Back, ${res.user?.displayName}`)
                navigate(state || "/")
            })
            .catch(err => toast.error(err.message || "Google login failed"))
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
                    {...register("password", {
                        required: "Password is required",
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                            message: "Password must contain at least 6 characters including upper and lowercase letters"
                        }
                    })} />
                <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute p-1 right-2 bottom-0 -translate-y-1/3 cursor-pointer'>{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
            </div>
            <p className="font-semibold text-gray-700 text-sm my-4 flex gap-3 w-full">Don't have an account? <Link state={state || '/'} to='/register' className="text-sky-500 hover:text-blue-600 trnsition">Register</Link></p>
            <button disabled={isSubmitting} type="submit" className="bttn trnsition rounded-full">{isSubmitting ? "Logging in..." : "Login"}</button>
            <button disabled={isSubmitting} type="button" onClick={handleGoogleLogin} className="bttn-outw bg-base-100 rounded-full hover:text-gray-500 trnsition my-1 flex items-center-safe gap-2"><FcGoogle />Log in with Google</button>
        </form>
    )
}
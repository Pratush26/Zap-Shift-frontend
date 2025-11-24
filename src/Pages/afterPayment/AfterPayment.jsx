import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router"
import { toast } from "react-toastify";

export default function AfterPaymentHandlerPage() {
    const [paymentData, setPaymentData] = useState({})
    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get("session_id");
    useEffect(() => {
        if (!sessionId) return;
        axios.patch(`${import.meta.env.VITE_SERVER}/update-paymentStatus`, { session_id: sessionId })
            .then(res => setPaymentData(res.data))
            .catch(err => {
                toast.error(err.message || "Some error occur!")
                console.error(err)
            });
    }, [sessionId]);
    
    if(searchParams.get("success") === "false") return <h1 className="text-4xl text-secondary font-bold m-10 animate-bounce">Payment Unsuccessful!</h1>
    
    return (
        <main className="flex flex-col items-center justify-center gap-3 mx-4 my-8">
            <h1 className="text-3xl text-secondary font-bold">Payment Successful!</h1>
            <p>You successfully paid {paymentData?.currency || "="} {paymentData?.cost || 0}</p>
            <Link to='/' className="bttn rounded-lg trnsition shadow-md">Back to home</Link>
        </main>
    )
}
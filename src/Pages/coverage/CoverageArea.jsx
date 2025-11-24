import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../Shared/Loader";
import ErrorPage from "../../Layouts/ErrorPage";
import Error from "../../Shared/Error";

export default function CoverageAreaPage() {
    const mapRef = useRef(null)
    const [targetPosition, setTargetPosition] = useState({})
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

    const { data, isLoading, error: dataError } = useQuery({
        queryKey: ['reviews'],
        queryFn: () => axios(`${import.meta.env.VITE_SERVER}/ware-houses`).then(res => res.data),
        staleTime: 5 * 60 * 1000,
    })

    useEffect(() => {
        const viewZoom = 18
        mapRef?.current?.flyTo([targetPosition.latitude, targetPosition.longitude], viewZoom)
    }, [targetPosition])


    if (isLoading) return <Loader />;
    if (dataError) return <Error msg={dataError.message} />;
    const onSubmit = (typed) => {
        const target = data.find(e => e.district.toLowerCase().includes(typed.search.toLowerCase()))
        setTargetPosition({latitude: target.latitude, longitude: target.longitude})
    }
    return (
        <main className="my-8 w-full">
            <h1 className="text-4xl text-secondary font-extrabold">Explore Our Branches throughout the country</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex items-end gap-2 w-fit my-6">
                <div className="w-full">
                    {errors.search ? <p className="text-sm text-rose-500">{errors.search?.message}</p> : <label htmlFor="search">Search by city:</label>}
                    <input type="text" {...register("search", { required: "valid city is required" })} placeholder="Enter city name" id="search" />
                </div>
                <button disabled={isSubmitting} type="submit" className="bttn rounded-full shadow-md/20 trnsition" >{isSubmitting ? "Searching" : "Search"}</button>
            </form>
            <div className="p-2 rounded-xl bg-base-100">
                <MapContainer ref={mapRef} center={[23.6850, 90.3563]} zoom={8} scrollWheelZoom={false} className="w-full min-h-[80vh]">
                    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {
                        data?.map(e => (
                            <Marker key={e._id} position={[e.latitude, e.longitude]}>
                                <Popup>
                                    <p><span className="font-bold">City: </span>{e.city}</p>
                                    <p><span className="font-bold">Branch: </span>{e.covered_area.join(", ")}</p>
                                </Popup>
                            </Marker>
                        ))
                    }
                </MapContainer>
            </div>
        </main>
    )
}
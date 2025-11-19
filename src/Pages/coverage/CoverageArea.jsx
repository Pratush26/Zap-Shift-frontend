import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import { useLoaderData } from "react-router";
import { useForm } from "react-hook-form";
import { useRef } from "react";

export default function CoverageAreaPage() {
    const { data } = useLoaderData()
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
    const mapRef = useRef(null)
    const onSubmit = (typed) => {
        const target = data.find(e => e.city.toLowerCase().includes(typed.search.toLowerCase()))
        const viewZoom = 18
        if(target) mapRef?.current?.flyTo([target.latitude, target.longitude],viewZoom)
    }
    return (
        <main className="my-8">
            <h1 className="text-4xl text-secondary font-extrabold">Explore Our Branches throughout the country</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex items-end gap-2 w-fit my-6">
                <div className="w-full">
                    {errors.search ? <p className="text-sm text-rose-500">{errors.search?.message}</p> : <label htmlFor="search">Search by city:</label>}
                    <input type="text" {...register("search", { required: "valid city is required" })} placeholder="Enter city name" id="search" />
                </div>
                <button disabled={isSubmitting} type="submit" className="bttn rounded-full shadow-md/20 trnsition" >{isSubmitting ? "Searching" : "Search"}</button>
            </form>
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
        </main>
    )
}
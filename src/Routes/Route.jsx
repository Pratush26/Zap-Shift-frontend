import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../Pages/home/HomePage";
import AuthLayout from "../Layouts/Auth";
import RegisterForm from "../Pages/forms/register";
import LoginForm from "../Pages/forms/Login";
import NotFoundPage from "../Layouts/NotFound";
import AboutUsPage from "../Pages/about/About";
import CoverageAreaPage from "../Pages/coverage/CoverageArea";
import SendParcel from "../Pages/sendParcel/SendParcel";
import axios from "axios";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                index: true,
                loader: async () => {
                    const service = await axios(`${import.meta.env.VITE_SERVER}/services`)
                    const review = await axios(`${import.meta.env.VITE_SERVER}/reviews`)
                    return { services: service.data, reviews: review.data}
                },
                Component: HomePage
            },
            {
                path: "/about",
                Component: AboutUsPage
            },
            {
                path: "/coverage",
                Component: CoverageAreaPage
            },
            {
                path: "/parcel",
                Component: SendParcel
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: "/register",
                Component: RegisterForm
            },
            {
                path: "/login",
                Component: LoginForm
            }
        ]
    },
    {
        path: '*',
        Component: NotFoundPage
    }
])
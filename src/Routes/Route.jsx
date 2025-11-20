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
import LoadingUi from "../Layouts/LoadingUi";
import ErrorPage from "../Layouts/ErrorPage";
import BeRider from "../Pages/BeARider/BeRider";
import PriceCalculationPage from "../Pages/priceCalculator/PriceCalculator";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        hydrateFallbackElement: <LoadingUi />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
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
                path: "/be-rider",
                Component: BeRider
            },
            {
                path: "/price-calculator",
                Component: PriceCalculationPage
            },
            {
                path: "/send-parcel",
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
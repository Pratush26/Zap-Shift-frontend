import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../Pages/home/HomePage";
import AuthLayout from "../Layouts/Auth";
import LoginForm from "../Pages/forms/Login";
import NotFoundPage from "../Layouts/NotFound";
import AboutUsPage from "../Pages/about/About";
import CoverageAreaPage from "../Pages/coverage/CoverageArea";
import LoadingUi from "../Layouts/LoadingUi";
import ErrorPage from "../Layouts/ErrorPage";
import BeRider from "../Pages/BeARider/BeRider";
import PriceCalculationPage from "../Pages/priceCalculator/PriceCalculator";
import SendParcelForm from "../Pages/forms/ParcelForm";
import AfterPaymentHandlerPage from "../Pages/afterPayment/AfterPayment";
import DashboardLayout from "../Layouts/Dashboard";
import RegisterForm from "../Pages/forms/RegisterPage";
import ChangePassword from "../Pages/dashboard/ChangePassword";
import AddRiderPage from "../Pages/dashboard/tables/AddRider";
import AssignParcel from "../Pages/dashboard/tables/AssignParcel";
import DeliverParcel from "../Pages/dashboard/tables/DeliverParcel";
import MyParcelPage from "../Pages/dashboard/tables/MyParcel";
import HelpCenter from "../Pages/Help";
import TrackOrder from "../Pages/forms/TrackOrder";
import DashboardOverviewPage from "../Pages/dashboard/overview/Overview";

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
                Component: SendParcelForm
            },
            {
                path: "/after-payment",
                Component: AfterPaymentHandlerPage
            },
            {
                path: "/track-order",
                Component: TrackOrder
            },
            {
                path: "/help-center",
                Component: HelpCenter
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
        path: '/dashboard',
        Component: DashboardLayout,
        children: [
            {
                index: true,
                Component: DashboardOverviewPage
            },
            {
                path: 'overview',
                Component: DashboardOverviewPage
            },
            {
                path: "change-password",
                Component: ChangePassword
            },
            {
                path: "add-rider",
                Component: AddRiderPage
            },
            {
                path: "assign-parcel",
                Component: AssignParcel
            },
            {
                path: "deliver-parcel",
                Component: DeliverParcel
            },
            {
                path: "my-parcel",
                Component: MyParcelPage
            },
        ]
    },
    {
        path: '*',
        Component: NotFoundPage
    }
])
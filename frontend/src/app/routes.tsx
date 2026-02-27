import { createBrowserRouter } from "react-router";
import { RoleSelector } from "./components/RoleSelector";
import { PassengerLayout } from "./components/passenger/PassengerLayout";
import { PassengerHome } from "./components/passenger/PassengerHome";
import { PassengerOnboarding } from "./components/passenger/PassengerOnboarding";
import { BusSearch } from "./components/passenger/BusSearch";
import { SeatSelection } from "./components/passenger/SeatSelection";
import { Payment } from "./components/passenger/Payment";
import { TicketConfirmation } from "./components/passenger/TicketConfirmation";
import { MyTickets } from "./components/passenger/MyTickets";
import { Wallet } from "./components/passenger/Wallet";
import { ComplaintChat } from "./components/passenger/ComplaintChat";
import { Profile } from "./components/passenger/Profile";
import { QRScan } from "./components/passenger/QRScan";
import { ConductorLayout } from "./components/conductor/ConductorLayout";
import { ConductorDashboard } from "./components/conductor/ConductorDashboard";
import { TicketScanner } from "./components/conductor/TicketScanner";
import { TripManagement } from "./components/conductor/TripManagement";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RoleSelector />,
    },
    {
        path: "/onboarding",
        element: <PassengerOnboarding />,
    },
    {
        path: "/passenger",
        element: <PassengerLayout />,
        children: [
            {
                index: true,
                element: <PassengerHome />,
            },
            {
                path: "search",
                element: <BusSearch />,
            },
            {
                path: "seats",
                element: <SeatSelection />,
            },
            {
                path: "payment",
                element: <Payment />,
            },
            {
                path: "confirmation",
                element: <TicketConfirmation />,
            },
            {
                path: "tickets",
                element: <MyTickets />,
            },
            {
                path: "wallet",
                element: <Wallet />,
            },
            {
                path: "complaints",
                element: <ComplaintChat />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
            {
                path: "scan",
                element: <QRScan />,
            },
        ],
    },
    {
        path: "/conductor",
        element: <ConductorLayout />,
        children: [
            {
                index: true,
                element: <ConductorDashboard />,
            },
            {
                path: "scan",
                element: <TicketScanner />,
            },
            {
                path: "trips",
                element: <TripManagement />,
            },
        ],
    },

]);
import {createBrowserRouter, RouteObject} from "react-router-dom";
import App from "../App.tsx";
import Dashboard from "../components/dashboard/dashboard.tsx";
import AccountDashboard from "../components/accounts/accountDashboard.tsx";
import AccountDetails from "../components/accounts/accountDetails.tsx";

export const routes: RouteObject[] = [
    {path: '/', element: <App/>},
    {path: '/app', element: <Dashboard/>},
    {path: '/accounts', element: <AccountDashboard/>},
    {path: '/account/:id', element: <AccountDetails/>},
]
export const router = createBrowserRouter(routes);
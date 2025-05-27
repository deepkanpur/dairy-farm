import { createBrowserRouter, Navigate, RouteObject} from "react-router-dom";
import App from "../layout/App";
import TestErrors from "../../features/Errors/TestError";
import NotFound from "../../features/Errors/NotFound";
import ServerError from "../../features/Errors/ServerError";
import ProfilePage from "../../features/Profiles/ProfilePage";
import DairyDashboard from "../../features/dairy-farms/dashboard/DairyDashboard";
import DairyDetails from "../../features/dairy-farms/detail/DairyDetails";
import DairyForm from "../../features/dairy-farms/form/DairyForm";
import RequireAuth from "./RequireAuth";
import AddRevenue from "../../features/revenue/add/Add";
import RevenueDetails from "../../features/revenue/detail/Detail";
import RevenueDashboard from "../../features/revenue/dashboard/Dashboard";
import AddExpense from "../../features/expense/add/add";
import ExpenseDashboard from "../../features/expense/dashboard/Dashboard";
import ExpenseDetails from "../../features/expense/detail/detail";
import SaleRegister from "../../features/sale/add/SaleRegister";
import SaleDashboard from "../../features/sale/dashboard/dashboard";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            {element: <RequireAuth />, children: [
                {path: "addDairy",element: <DairyForm key='create' />},
                {path: "sales",element: <SaleDashboard fromDate={new Date()} toDate={new Date()}/>},
                {path: "sales/add",element: <SaleRegister key='create' />},
                {path: "revenues",element: <RevenueDashboard />},
                {path: "revenues/add",element: <AddRevenue key='add-revenue'/>},
                {path: "revenues/:id",element: <RevenueDetails/>},
                {path: "expenses",element: <ExpenseDashboard />},
                {path: "expenses/add",element: <AddExpense key='add-revenue'/>},
                {path: "expenses/:id",element: <ExpenseDetails/>},
                {path: "profiles/:userName",element: <ProfilePage />},
                {path: "errors",element: <TestErrors />},
            ]},            
            {path: "dairies",element: <DairyDashboard />},
            {path: "dairies/:id",element: <DairyDetails />},
            {path: "not-found",element: <NotFound />},
            {path: "server-error",element: <ServerError />},
            {path: "*",element: <Navigate replace to='/not-found' />}            
        ]
    }
];

export const router = createBrowserRouter(routes);
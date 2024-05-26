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

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            {element: <RequireAuth />, children: [
                {path: "addDairy",element: <DairyForm key='create' />},
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
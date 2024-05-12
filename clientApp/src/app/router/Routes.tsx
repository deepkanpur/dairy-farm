import { createBrowserRouter, Navigate, RouteObject} from "react-router-dom";
import App from "../layout/App";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/Errors/TestError";
import NotFound from "../../features/Errors/NotFound";
import ServerError from "../../features/Errors/ServerError";
import LoginForm from "../../features/users/LoginForm";
import ProfilePage from "../../features/Profiles/ProfilePage";
import DairyDashboard from "../../features/dairy-farms/dashboard/DairyDashboard";
import DairyDetails from "../../features/dairy-farms/detail/DairyDetails";
import DairyForm from "../../features/dairy-farms/form/DairyForm";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            {path: "activities",element: <ActivityDashboard />},
            {path: "activities/:id",element: <ActivityDetails />},
            {path: "createActivity",element: <ActivityForm key='create' />},
            {path: "manageActivity/:id",element: <ActivityForm key='manage' />},
            {path: "dairies",element: <DairyDashboard />},
            {path: "dairies/:id",element: <DairyDetails />},
            {path: "addDairy",element: <DairyForm key='create' />},
            {path: "profiles/:userName",element: <ProfilePage />},
            {path: "login",element: <LoginForm />},
            {path: "errors",element: <TestErrors />},
            {path: "not-found",element: <NotFound />},
            {path: "server-error",element: <ServerError />},
            {path: "*",element: <Navigate replace to='/not-found' />}            
        ]
    }
];

export const router = createBrowserRouter(routes);
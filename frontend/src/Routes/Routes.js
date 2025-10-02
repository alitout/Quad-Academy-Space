import React from "react";
import { useRoutes } from 'react-router-dom'
import LandingPage from "../Pages/LandingPage";
import SignIn from "../Pages/SignIn";

export const AccessDenied = () => <div>You can't access this page</div>

const Routes = () => {
    const routes = useRoutes([
        { path: '/', element: <LandingPage /> },
        { path: '/programs', element: <LandingPage /> },
        { path: '/masterclasses', element: <LandingPage /> },
        { path: '/community', element: <LandingPage /> },
        { path: '/academycoffeespace', element: <LandingPage /> },
        { path: '/sign-in', element: <SignIn />}
    ]);

    return routes;
};

export default Routes;
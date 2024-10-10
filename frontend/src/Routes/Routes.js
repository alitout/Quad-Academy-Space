import React from "react";
import { useRoutes } from 'react-router-dom'
import LandingPage from "../Pages/LandingPage";

export const AccessDenied = () => <div>You can't access this page</div>

const Routes = () => {
    const routes = useRoutes([
        { path: '/', element: <LandingPage /> },
        { path: '/programs', element: <LandingPage /> },
        { path: '/masterclasses', element: <LandingPage /> },
        { path: '/community', element: <LandingPage /> },
        { path: '/academycoffeespace', element: <LandingPage /> },
    ]);

    return routes;
};

export default Routes;
import React from "react";
import { useRoutes } from 'react-router-dom'
import LandingPage from "../Pages/LandingPage";
import SignUpPage from "../Pages/SignUpPage";
import SignInPage from "../Pages/SignInPage";

export const AccessDenied = () => <div>You can't access this page</div>

const Routes = () => {
    const routes = useRoutes([
        { path: '/', element: <LandingPage /> },
        { path: '/programs', element: <LandingPage /> },
        { path: '/masterclasses', element: <LandingPage /> },
        { path: '/community', element: <LandingPage /> },
        { path: '/academycoffeespace', element: <LandingPage /> },
        { path: '/sign-up', element: <SignUpPage /> },
        { path: '/sign-in', element: <SignInPage />}
    ]);

    return routes;
};

export default Routes;
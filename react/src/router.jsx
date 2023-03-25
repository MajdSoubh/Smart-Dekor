import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./layouts/defaultLayout";
import GuestLayout from "./layouts/guestLayout";
import Login from "./views/login";
import NotFound from "./views/notfound";
import Contact from "./views/contact";
import Signup from "./views/signup";
const router = createBrowserRouter([
    {
        path: "/admin",
        element: <DefaultLayout />,
        children: [{ path: "/admin/contact", element: <Contact /> }],
    },
    {
        path: "/admin",
        element: <GuestLayout />,
        children: [
            { path: "/admin/login", element: <Login /> },
            { path: "/admin/signup", element: <Signup /> },
        ],
    },
    { path: "*", element: <NotFound /> },
]);

export default router;

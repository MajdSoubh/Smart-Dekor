import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./layouts/defaultLayout";
import AdminDefaultLayout from "./layouts/adminDefaultLayout";
import AdminGuestLayout from "./layouts/adminGuestLayout";
import Login from "./views/login";
import Home from "./views/home";
import NotFound from "./views/notfound";
import Contact from "./views/admin/contact";
import Signup from "./views/signup";
import Projects from "./views/admin/projects";
import Categories from "./views/admin/categories";
import ProjectForm from "./views/admin/projectForm";
import CategoryForm from "./views/admin/categoryForm";
import IntroForm from "./views/admin/introForm";
import OutroForm from "./views/admin/outroForm";
const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [{ path: "/", element: <Home /> }],
    },
    {
        path: "/admin",
        element: <AdminDefaultLayout />,
        children: [
            { path: "/admin/contact", element: <Contact /> },
            { path: "/admin/projects", element: <Projects /> },
            { path: "/admin/project/add", element: <ProjectForm /> },
            { path: "/admin/project/modify/:id", element: <ProjectForm /> },
            { path: "/admin/categories", element: <Categories /> },
            { path: "/admin/category/add", element: <CategoryForm /> },
            { path: "/admin/category/modify/:id", element: <CategoryForm /> },
            { path: "/admin/intro", element: <IntroForm /> },
            { path: "/admin/outro", element: <OutroForm /> },
        ],
    },
    {
        path: "/admin",
        element: <AdminGuestLayout />,
        children: [
            { path: "/admin/login", element: <Login /> },
            { path: "/admin/signup", element: <Signup /> },
        ],
    },
    { path: "*", element: <NotFound /> },
]);

export default router;

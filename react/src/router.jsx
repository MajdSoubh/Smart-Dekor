import { createBrowserRouter } from "react-router-dom";
/* layouts  */
import DefaultLayout from "./layouts/defaultLayout";
import AdminDefaultLayout from "./layouts/adminDefaultLayout";
import AdminGuestLayout from "./layouts/adminGuestLayout";
/* home components */
import Login from "./views/login";
import Home from "./views/home";
import NotFound from "./views/notfound";
import Signup from "./views/signup";
import Projects from "./views/projects";
/* admin components */
import AdminProjects from "./views/admin/projects";
import Categories from "./views/admin/categories";
import ProjectForm from "./views/admin/projectForm";
import CategoryForm from "./views/admin/categoryForm";
import IntroForm from "./views/admin/introForm";
import OutroForm from "./views/admin/outroForm";
import Contact from "./views/admin/contact";
const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/projects", element: <Projects /> },
        ],
    },
    {
        path: "/admin",
        element: <AdminDefaultLayout />,
        children: [
            { path: "/admin/contact", element: <Contact /> },
            { path: "/admin/projects", element: <AdminProjects /> },
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

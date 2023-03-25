import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/contextProvider";
const GuestLayout = () => {
    const { user, token } = useStateContext();
    if (token) {
        return <Navigate to="/admin" />;
    }
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default GuestLayout;

import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/context.js";

const RequireAuth = ({ allowedRoles }) => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const location = useLocation();
    // console.log(currentUser)
    // const roles = JSON.parse(currentUser.role)
    // console.log("Allowed roles : ", allowedRoles)
    // console.log("These are the current user's roles : ", currentUser.role)
    // console.log(allowedRoles);

    return (
      // <Navigate to="/register" state={{ from: location }} replace />
        // currentUser?.role?.find(role => allowedRoles?.includes(role))
        // allowedRoles.includes(currentUser?.role)
        allowedRoles.some(role => currentUser.role.includes(role))
            ? <Outlet />
            : currentUser?.id
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/register" state={{ from: location }} replace />
    );
}

export default RequireAuth;
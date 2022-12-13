import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";


const PrivateRoute = ({ component: Component, ...rest }) => {
    const { currentUser } = useAuth();
    let navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate("/LogIn");
        }
    }, [])
    return <Outlet />
}

export default PrivateRoute;
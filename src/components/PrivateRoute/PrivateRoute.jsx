import useAuth from "../../customHooks/useAuth";
import LogIn from "../LogIn/LogIn";
import "../../App.css";

const PrivateRoute = ({ children }) => {
    const { existToken } = useAuth();
    return !existToken ? <LogIn /> : children;
}

export default PrivateRoute;
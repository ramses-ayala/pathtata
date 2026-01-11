import { useSelector } from "react-redux";

const useAuth = () => {
    const { name: userName, token: existToken } = useSelector((state) => state.authUser);
    // const [userName] = useState("myUser");
    // const [existToken] = useState(false);
    return {
        existToken,
        userName
    }
}

export default useAuth;
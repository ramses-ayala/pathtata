import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../Common/Input/Input";
import Header from "../Header/Header";
import Spinner from "../Common/Spinner/Spinner";
import TextButton from "../Common/TextButton/TextButton";
import { LOGIN_TEXT } from "../../constants";
import { useLoginMutation } from "../../services/auth/auth";

const LogIn = () => {
    const [loginData, setLoginData] = useState({
        "email": "",
        "password": ""
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [loginUser, { isLoading: isLogging }] = useLoginMutation()

    const handleChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = {};
        if (!loginData.email) newErrors.email = "Email is required";
        if (!loginData.password) newErrors.password = "Password is required";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                setErrors({});
                const { data } = await loginUser(loginData).unwrap();
                if (data) navigate('/profile');
            } catch (error) {
                if (error?.status === 401) setErrors({ ...error, password: error.data.error });
                else console.error("Unexpected signIn error:", error);
            }
        }
    }

    if (isLogging) return <Spinner />

    return (
        <>
            <Header />
            <div className="title-center">
                <h1>Login</h1>
            </div>
            <div className="container-form">
                <form onSubmit={handleSubmit}>
                    <Input
                        type="email"
                        label="email"
                        text="Email"
                        name="email"
                        placeHolder="Your email"
                        value={loginData.email}
                        classes="font-bold"
                        classesInput="input-form"
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                    <Input
                        type="password"
                        label="password"
                        text="Password"
                        name="password"
                        placeHolder="Password"
                        fontWeightLabel="bold"
                        value={loginData.password}
                        classes="input-form font-bold"
                        classesInput="input-form"
                        onChange={handleChange}
                    />
                    {errors.password && <p className="error-message">{errors.password}</p>}
                    <TextButton
                        colorText="white"
                        buttonText={LOGIN_TEXT}
                        isSubmit={true}
                        isLoading={isLogging}
                        fontWeight="bold"
                        myClasses='h-md-button gradient-tata'
                    />
                    <div className="text-center mt1">
                        <p>If you don't have an account you may <Link className="link" to="/signUp">Registration</Link></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default LogIn;
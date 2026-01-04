import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Input from "../Common/Input/Input";
import TextButton from "../Common/TextButton/TextButton";
import { useSignUpMutation } from "../../services/auth/auth";
import { SIGNUP_TEXT } from "../../constants";
import "./SignUp.css";


const SignUp = () => {
    const [signUpData, setSignUpData] = useState({
        "name": "",
        "email": "",
        "password": ""
    });

    const [createUser, { isLoading: isSigningUp }] = useSignUpMutation();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleChange = (e) => setSignUpData({ ...signUpData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newErrors = {};
        if (!signUpData.name) newErrors.name = "Name is required";
        if (!signUpData.email) newErrors.email = "Email is required";
        if (!signUpData.password) newErrors.password = "Password is required";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const { data } = await createUser(signUpData);
            if (data?.successful) navigate('/logIn');
        }
    }

    return (
        <>
            <Header />
            <div className="title-center">
                <h1>Registration</h1>
            </div>
            <form className="form-registration" onSubmit={handleSubmit}>
                <div>
                    <Input
                        type="text"
                        label="name"
                        text="Name"
                        placeHolder="Name"
                        name="name"
                        value={signUpData.name}
                        classes="font-bold"
                        onChange={handleChange}
                    />
                    {errors.name && <p className="error-message">{errors.name}</p>}
                </div>
                <div>
                    <Input
                        type="email"
                        label="email"
                        text="Email"
                        placeHolder="Email"
                        name="email"
                        value={signUpData.email}
                        classes="font-bold"
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                </div>
                <div>
                    <Input
                        type="password"
                        label="password"
                        text="Password"
                        placeHolder="Password"
                        name="password"
                        value={signUpData.password}
                        classes="font-bold"
                        onChange={handleChange}
                    />
                    {errors.password && <p className="error-message">{errors.password}</p>}
                </div>
                <div>
                    <TextButton myClasses='w-100 h-md-button gradient-tata' colorText="white" fontWeight="bold" buttonText={SIGNUP_TEXT} isSubmit={true} isLoading={isSigningUp} />
                </div>
                <div className="text-center mt1">
                    <p>If you have an account you may <Link className="link" to="/logIn">LogIn</Link></p>
                </div>
            </form>
        </>
    )
}

export default SignUp;
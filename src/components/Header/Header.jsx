import { useNavigate } from 'react-router-dom';
import Logo from '../Common/Logo/Logo.jsx';
import TextButton from '../Common/TextButton/TextButton.jsx';
import { LOGOUT } from '../../constants.js';
import { logout } from '../../store/auth/authUserSlice.js';
import { useDispatch } from 'react-redux';
import useAuth from '../../customHooks/useAuth.jsx';
import "./Header.css"

const Header = () => {
    const { userName, existToken } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOut = async () => {
        localStorage.clear();
        dispatch(logout());
        navigate('/logIn');
    }

    return (
        <div className='gradient-tata'>
            <div className='center-div95 display-container inner-space-1'>
                <Logo />
                {existToken && <div className='display-container width-20'>
                    <span className='text-userName my-1 mr-2'>{userName}</span>
                    <TextButton
                        colorText='white'
                        fontWeight='bold'
                        myClasses='padding-sm bg-blue'
                        buttonText={LOGOUT}
                        onClick={logOut}
                    />
                </div>}
            </div>
        </div>
    )
}

export default Header;
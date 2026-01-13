import { useNavigate } from "react-router-dom";
import "./RegistrationModalSuccess.css"

const RegistrationModalSuccess = ({ setShowSuccessModal }) => {
    const navigate = useNavigate();

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>Account created</h2>
                <p>Your account was created successfully.</p>
                <button
                    className="modal-btn"
                    onClick={() => {
                        setShowSuccessModal(false);
                        navigate("/logIn");
                    }}
                >
                    OK
                </button>
            </div>
        </div>
    )
}

export default RegistrationModalSuccess;
import "./Spinner.css";

const Spinner = () => {
    return (
        <div className="loading-backdrop">
            <div className="spinner" />
            <p>Logging in...</p>
        </div>
    )
}

export default Spinner;
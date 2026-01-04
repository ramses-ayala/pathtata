const Input = ({ type, label, text, name, placeHolder, value, classes, onChange }) => {
    return (
        <>
            <label className={classes} htmlFor={label}>{text}</label>
            <input type={type} id={label} name={name} placeholder={placeHolder} value={value} onChange={onChange}/>
        </>
    )
}

export default Input;
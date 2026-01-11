const Input = ({ type, label, text, name, placeHolder, value, classes, classesInput, onChange }) => {
    return (
        <>
            <label className={classes} htmlFor={label}>{text}</label>
            <input className={classesInput} type={type} id={label} name={name} placeholder={placeHolder} value={value} onChange={onChange}/>
        </>
    )
}

export default Input;
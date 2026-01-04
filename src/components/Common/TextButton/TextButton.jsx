import "./TextButton.css";

const TextButton = ({ myClasses, colorText = 'black', fontWeight = 'normal', buttonText = '', isSubmit = false, isLoading = false , onClick }) => {
   const classes = `pointer border-btn ${myClasses}`;
   return <button 
         style={{ color: colorText, fontWeight }} 
         className={classes} 
         type={isSubmit ? 'submit' : 'button'}
         disabled={isLoading}
         onClick={onClick}
      >
         {buttonText}
      </button>
}

export default TextButton;
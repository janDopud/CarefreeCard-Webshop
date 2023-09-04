import React from "react";

// Importing the style file
import "./Input.css";

// Creating the Input component
const Input = React.forwardRef(
  ({ name = "", placeholder = "", type = "", required }, ref) => {
    return (
      <div className="input-container">
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          required={required}
          name={name}
        />
      </div>
    );
  }
);

// Exporting the Input component
export default Input;

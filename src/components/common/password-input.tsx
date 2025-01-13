import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import styles from "./popup-style.module.css"
interface PasswordInputProps {
  placeholder: string;
  field: any;
  classNameInput: string,
  classNameButton: string,
}

const PasswordInput: React.FC<PasswordInputProps> = ({ placeholder, field , classNameInput, classNameButton}) => {// eslint-disable-line @typescript-eslint/no-unused-vars
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        {...field}
        className={classNameInput}
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className={styles.passwordIconEyes}
      >
        {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
      </button>
    </div>
  );
};

export default PasswordInput;

import InputBox from "./InputBox";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";

const PasswordInputField = ({ callback, value, id }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <InputBox
        id={id}
        label="Password"
        placeholder="Your Password"
        value={value}
        callback={callback}
        type={showPassword ? "text" : "password"}
      />
      <i
        onClick={() => setShowPassword(!showPassword)}
        className="absolute bottom-3 right-3"
        aria-label="toggle password visibility"
        role="button"
      >
        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
      </i>
    </>
  );
};

export default PasswordInputField;

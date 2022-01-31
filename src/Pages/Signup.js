import { useState } from "react";
import { Link } from "react-router-dom";
import InputBox from "../Components/InputBox";
import PasswordInputField from "../Components/PasswordInputField";
import { useAuth } from "../hooks/useAuth";

export const Signup = () => {
  const { signUpUser } = useAuth();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [signupError, setSignupError] = useState("");

  const isPasswordMatched =
    formState.confirmPassword !== "" &&
    formState.confirmPassword === formState.password;

  const checkUserInput =
    formState.name !== "" && formState.email !== "" && isPasswordMatched;

  const isPasswordValid = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(
    formState.password
  );

  const onChange = ({ target }) =>
    setFormState({ ...formState, [target.id]: target.value });

  const path = location.state?.from;
  const addTo = location.state?.addTo;
  const productId = location.state?.productId;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSignupError("");
    setLoading(true);
    if (checkUserInput) {
      if (!isPasswordValid) {
        setSignupError("INVALID_PASSWORD");
        setLoading(false);
        return;
      }
      const res = await signUpUser(formState, addTo, path, productId);
      !res && setSignupError("SIGNUP_ERROR");
      setLoading(false);
      return;
    }
    setSignupError("EMPTY_FIELDS");
    setLoading(false);
  };

  const showError = () => {
    if (formState.confirmPassword !== "" && !isPasswordMatched) {
      return "Both passwords must match!";
    }

    switch (signupError) {
      case "INVALID_PASSWORD":
        if (!isPasswordValid)
          return "Password must be 8 characters long, have one upper and lower case character and one number.";
        break;
      case "SIGNUP_ERROR":
        return "Error signing up! Try again.";
      case "EMPTY_FIELDS":
        return "All fields are required. Fill all fields and try again!";
      default:
        return "";
    }
  };

  return (
    <div className="flex justify-center items-start h-screen w-full py-20">
      <div className="flex flex-col shadow-lg rounded-md p-6 text-center w-80">
        <h2 className="text-2xl font-semibold my-2 tracking-wide">Sign Up</h2>
        <p className="text-red-600">{showError()}</p>
        <form onSubmit={handleSubmit} className="text-left w-full">
          <div className="my-2">
            <InputBox
              id="name"
              label="Name"
              placeholder="Enter your name"
              value={formState.name}
              callback={onChange}
            />
          </div>
          <div className="my-2">
            <InputBox
              id="email"
              label="Email"
              placeholder="Your Email"
              value={formState.email}
              callback={onChange}
            />
          </div>
          <div className="my-2 relative">
            <PasswordInputField
              id="password"
              value={formState.password}
              callback={onChange}
            />
          </div>
          <div className="my-2">
            <InputBox
              id="confirmPassword"
              label="Confirm Password"
              placeholder="Enter the same password"
              value={formState.confirmPassword}
              callback={onChange}
              type="password"
            />
          </div>
          <button
            type="submit"
            className="bg-black py-2 px-3 rounded-sm font-semibold text-white tracking-wide w-full my-2"
            disabled={!checkUserInput}
          >
            {loading ? " Signing Up..." : "Sign Up"}
          </button>
        </form>
        <div>
          {`Already have an account? `}
          <Link to="/login" className="font-medium">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

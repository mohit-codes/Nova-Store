import { useState } from "react";
import { Link } from "react-router-dom";
import InputBox from "../Components/InputBox";
import PasswordInputField from "../Components/PasswordInputField";
import { useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { logUserIn } = useAuth();

  const path = location.state?.from;
  const addTo = location.state?.addTo;
  const productId = location.state?.productId;
  const message = location.state?.message;

  const getPathName = (path) => path[1].toUpperCase() + path.slice(2);
  const useTestCredentials = () => {
    setEmail("test@test.com");
    setPassword("Test@123");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError(false);
    setLoading(true);
    const res = await logUserIn(email, password, addTo, path, productId);
    !res && setLoginError(true);
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-start h-screen w-full py-32">
      <div className="flex flex-col shadow-lg rounded-md p-6 text-center w-80">
        <h2 className="text-2xl font-semibold my-2 tracking-wide">Login</h2>
        {path && !message && (
          <p className="font-medium">{`Login to continue to ${getPathName(
            path
          )}`}</p>
        )}
        {path && message && <p className="font-medium">{message}</p>}
        {loginError && (
          <p className="text-red-600">Invalid credentials! Try again.</p>
        )}
        <form onSubmit={handleSubmit} className="text-left w-full">
          <div className="my-2">
            <InputBox
              id="email"
              label="Email"
              type="email"
              placeholder="Your Email"
              value={email}
              callback={({ target }) => setEmail(target.value)}
            />
          </div>
          <div className="my-2 relative">
            <PasswordInputField
              id="password"
              value={password}
              callback={({ target }) => setPassword(target.value)}
            />
          </div>
          <button
            disabled={email === "" || password === ""}
            type="submit"
            className="bg-black py-2 px-3 rounded-sm font-semibold text-white tracking-wide w-full mt-1"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
          <button
            className="bg-white py-2 px-3 rounded-sm font-medium border border-black tracking-wide w-full my-3"
            onClick={useTestCredentials}
          >
            Use test credentials
          </button>
        </form>
        <div>
          {`Don't have an account? `}
          <Link
            to="/signup"
            className="font-medium"
            state={{ from: path, addTo, productId }}
          >
            SignUp
          </Link>
        </div>
      </div>
    </div>
  );
};

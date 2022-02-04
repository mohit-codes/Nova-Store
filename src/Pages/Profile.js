import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";

export const Profile = () => {
  const { userProfile, logUserOut } = useAuth();
  return (
    <div className="flex justify-center items-start h-screen w-full py-20">
      <div className="flex flex-col shadow-lg rounded-md p-6 items-center w-80">
        <h2 className="text-2xl font-semibold my-2 tracking-wide">
          My account
        </h2>
        <FaUserCircle className="text-4xl mb-1" />
        <p className="my-1 text-xl font-medium">{userProfile?.name}</p>
        <p className="my-1 space-x-2 text-lg">
          <span className="font-medium">Email:</span>
          <span>{userProfile?.email}</span>
        </p>
        <button
          className="bg-black w-full py-2 rounded-sm font-semibold text-white mt-2"
          onClick={logUserOut}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

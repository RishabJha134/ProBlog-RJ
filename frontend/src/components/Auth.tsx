import { useState, ChangeEvent } from "react";
import { SignupInput } from "@rishabjha/common";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../utils/config";

const Auth = ({ type }: { type: string }) => {
  const navigate = useNavigate();

  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "Signup" ? "signup" : "signin"}`,
        postInputs
      );
      const { jwt, id, name } = response.data;

      // Store token and user details in localStorage
      localStorage.setItem("id", id);
      localStorage.setItem("name", name);
      localStorage.setItem("token", jwt);

      navigate("/blogs");
    } catch (err) {
      setError("Failed to authenticate. Please check your details and try again.");
      console.error("Error during authentication:", err);
    }
  }

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-extrabold text-gray-800">
          {type === "Signin" ? "Sign In" : "Create an Account"}
        </h2>
        <p className="text-gray-500">
          {type === "Signin" ? "Don't have an account?" : "Already have an account?"}
          <Link
            className="text-blue-600 underline ml-1"
            to={type === "Signin" ? "/signup" : "/signin"}
          >
            {type === "Signin" ? "Sign Up" : "Sign In"}
          </Link>
        </p>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="space-y-6">
          {type === "Signup" && (
            <LabeledInput
              label="Name"
              placeholder="Your full name"
              onChange={(e) => setPostInputs({ ...postInputs, name: e.target.value })}
            />
          )}
          <LabeledInput
            label="Username"
            placeholder="Email address"
            onChange={(e) => setPostInputs({ ...postInputs, username: e.target.value })}
          />
          <LabeledInput
            label="Password"
            type="password"
            placeholder="••••••••"
            onChange={(e) => setPostInputs({ ...postInputs, password: e.target.value })}
          />

          <button
            type="button"
            onClick={sendRequest}
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 transition duration-150"
          >
            {type === "Signup" ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

interface LabeledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const LabeledInput = ({
  label,
  placeholder,
  onChange,
  type = "text",
}: LabeledInputType) => (
  <div>
    <label className="block mb-2 text-sm font-semibold text-gray-700">{label}</label>
    <input
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      required
      className="w-full p-2.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);

export default Auth;

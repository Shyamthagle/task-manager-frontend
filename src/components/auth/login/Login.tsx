"use client";
import { ContextData } from "@/context/ContextProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { login as loginAPI } from "@/api/user";

const Login = () => {
  const { login } = useContext(ContextData);
const router = useRouter()
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");


const handleLogin = async () => {
  try {
    const { token } = await loginAPI({ email, password });
    login(token); // Update context with token
    router.push("/");
  } catch (err) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("An unknown error occurred.");
    }
  }
};
  return (
    <div className="h-[90vh] flex items-center justify-center">
    <div className="md:w-2/6 p-4 rounded bg-gray-800">
      <div className="text-2xl font-semibold">LogIn</div>
      {error && <div className="text-red-500">{error}</div>}
      <input
        type="text"
        name="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
      />
      <div className="w-full flex items-center justify-between">
        <button
          onClick={handleLogin}
          className="bg-blue-400 px-3 py-2 rounded text-black font-semibold"
        >
          LogIn
        </button>
        <Link
          href="./signup"
          className="text-sm text-gray-400 hover:text-gray-200"
        >
          Don't have an account?
        </Link>
      </div>
      <div className="mt-2 text-end">
        <Link
          href="./forgot-password"
          className="text-sm text-gray-400 hover:text-gray-200"
        >
          Forgot Password?
        </Link>
      </div>
    </div>
  </div>
  );
};

export default Login;

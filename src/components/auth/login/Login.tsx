"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
const router = useRouter()
  const handelLogin = () =>{
    router.push("/")
  }
  return (
    <div className="h-[90vh] flex items-center justify-center">
      <div className="w-2/6 p-4 rounded bg-gray-800">
        <div className="text-2xl font-semibold">LogIn</div>
        <input
          type="text"
          name="username"
          placeholder="Enter Name"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
        />
        <div className="w-full flex items-center justify-between">
          <button onClick={handelLogin} className="bg-blue-400  px-3 py-2 rounded text-black font-semibold">
            LogIn
          </button>
          <Link
            href="./signup"
            className=" text-sm  text-gray-400 hover:text-gray-200"
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

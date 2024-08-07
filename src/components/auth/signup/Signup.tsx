
'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Signup = () => {
  const router = useRouter()

  const handelSignUp = () =>{
    router.push("/login")
  }
  return (
    <div className="h-[90vh] flex items-center justify-center">
      <div className="w-2/6 p-4 rounded bg-gray-800">
        <div className="text-2xl font-semibold">Signup</div>
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
        />
         <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
        />
        <input
          type="password"
          name="confirmpassword"
          placeholder="Confirm Password"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
        />
        <div className="w-full flex items-center justify-between gap-8">
          <button onClick={handelSignUp} className="bg-blue-400 text-xl px-3 py-2 rounded text-black font-semibold">
            SignUp
          </button>
          <Link
            href="./login"
            className=" text-sm  text-gray-400 hover:text-gray-200"
          >
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;

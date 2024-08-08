'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { signup } from "../../../api/user"; // Adjust the path as necessary

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handelSignUp = async () => {
    try {
      await signup(formData);
      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="h-[90vh] flex items-center justify-center">
      <div className="md:w-2/6 p-4 rounded bg-gray-800">
        <div className="text-2xl font-semibold">Signup</div>
        {error && <div className="text-red-500 my-2">{error}</div>}
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
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

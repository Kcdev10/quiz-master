"use client";
import React, { useState } from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!email && !password) return alert("please fill the form!");

    const formResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN_URL}api/v1/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const formResponseData = await formResponse.json();
    if (formResponseData.success) {
      navigate.push("/");
      localStorage.setItem(
        "auth_user_access_token",
        formResponseData.data.accessToken
      );
      Cookie.set("auth_user_access_token", formResponseData.data.accessToken, {
        expires: 2,
        path: "/",
      });
      setLoading(false);
    }
    setLoading(false);
    alert(formResponseData.message);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>
      </div>

      {loading && <Loader />}
    </div>
  );
}

"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
export default function Header() {
  const [token, setToken] = useState("");
  const [render, setRender] = useState(false);
  const navigate = useRouter();
  useEffect(() => {
    if (window !== undefined) {
      const token = localStorage.getItem("auth_user_access_token") as string;
      setToken(token);
    }
  }, [render, token]);

  return (
    <header className="fixed top-0 left-0 w-full bg-blue-600">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">
        <div>
          <Link href={"/"}>Quiz Master</Link>
        </div>

        <div className="flex items-center gap-6 capitalize text-sm font-medium">
          <Link href={"/"}>Home</Link>
          {token && (
            <button
              onClick={() => {
                localStorage.clear();
                Cookies.remove("auth_user_access_token", { path: "/" });
                setRender(!render);
                navigate.push("/");
              }}
            >
              Logout
            </button>
          )}
          {!token && <Link href={"/auth/login"}>Login</Link>}
          {!token && <Link href={"/auth/register"}>Regsiter</Link>}
        </div>
      </nav>
    </header>
  );
}

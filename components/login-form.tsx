"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Eye, EyeOff } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const domain_name = "example.com";

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success) {
        router.push("/dashboard");
      } else {
        setErrorMsg(data.error || "Email atau password salah!");
        setIsLoading(false);
      }
    } catch (err) {
      setErrorMsg("Terjadi kesalahan server.");
      setIsLoading(false);
    }
  }

  return (
    <>
      <h2 className="text-xl font-regulard mb-6 text-center text-white">
        Masuk ke akun anda
      </h2>
      {errorMsg && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-100 text-sm text-center">
          {errorMsg}
        </div>
      )}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <div className="flex items-center">
            <input
              className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
              id="email"
              type="email"
              placeholder={`Email (ex. username@${domain_name})`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="bg-[rgb(52,108,155)] rounded-md p-3 flex items-center pointer-events-none">
              <User className="text-white size-5" />
            </div>
          </div>
        </div>
        <div className="mb-6">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="password"
          >
            Kata Sandi
          </label>
          <div className="flex items-center">
            <input
              className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Kata Sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="bg-[rgb(52,108,155)] rounded-md p-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <Eye className="text-white size-5" />
              ) : (
                <EyeOff className="text-white size-5" />
              )}
            </div>
          </div>
          <div className="text-left mt-3">
            <a
              href="/forgot-password"
              className="text-[rgb(52,108,155)] hover:underline"
            >
              Lupa Kata Sandi?
            </a>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <button
            className={`w-full bg-[rgb(52,108,155)] hover:bg-[rgb(42,98,145)] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Memuat..." : "Masuk"}
          </button>
        </div>
      </form>
    </>
  );
}

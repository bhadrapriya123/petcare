"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        className="bg-white-100 p-8 rounded-lg shadow-md w-80"
        onSubmit={handleLogin}
      >
        <h1 className="text-xl font-bold mb-4">Login</h1>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white w-full p-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
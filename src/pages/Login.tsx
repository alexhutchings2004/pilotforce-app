import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      alert("Login successful!");
      navigate("/");
    } else {
      alert("Invalid credentials.");
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-1/2">
        <img src="/login-image.avif" alt="Login" className="w-full h-full object-cover" />
      </div>
      <div className="w-1/2 flex flex-col items-center justify-center p-8">
        <h2 className="text-5xl font-extrabold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-4 rounded-lg mb-4"
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-4 rounded-lg mb-4"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-4 rounded-lg">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

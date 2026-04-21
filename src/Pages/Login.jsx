import React, { useContext, useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import { api } from "../utils/api";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/api/v1/user/login", { email, password }, { withCredentials: true });

      if (data.user.role !== "Patient") {
        toast.error("Unauthorized: Only patients can log in here");
        return;
      }

      toast.success(data.message);
      setIsAuthenticated(true);
      localStorage.setItem("isAuth", "true");
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/"); // ✅ redirect to home after login
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <section className="container form-component">
      <h1 className="form-title">User Login</h1>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>

      <p>
        Not registered yet? <Link to="/register">Sign Up</Link>
      </p>
    </section>
  );
};

export default UserLogin;



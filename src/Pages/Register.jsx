import { api } from "../utils/api";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    nic: "", dob: "", gender: "", password: "", confirmPassword: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const { data } = await api.post(
        "/api/v1/user/patient/register",
        {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          nic: form.nic,
          dob: form.dob,
          gender: form.gender,
          password: form.password,
        },
        { withCredentials: true }
      );

      toast.success(data.message);
      setIsAuthenticated(true);
      localStorage.setItem("isAuth", "true");
      navigate("/profile"); // ✅ redirect to profile/dashboard
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="container form-component register-form">
      <h2>Sign Up</h2>

      <form onSubmit={handleRegistration}>
        <input name="firstName" type="text" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
        <input name="lastName" type="text" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="phone" type="text" placeholder="Phone (11 digits)" value={form.phone} onChange={handleChange} required />
        <input name="nic" type="text" placeholder="NIC (13 digits)" value={form.nic} onChange={handleChange} required />
        <input name="dob" type="date" value={form.dob} onChange={handleChange} required />

        <div className="gender-options">
          <label>
            <input type="radio" name="gender" value="Male" checked={form.gender === "Male"} onChange={handleChange} /> Male
          </label>
          <label>
            <input type="radio" name="gender" value="Female" checked={form.gender === "Female"} onChange={handleChange} /> Female
          </label>
        </div>

        <input name="password" type="password" placeholder="Password (min 8 chars)" value={form.password} onChange={handleChange} required />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required />

        <button type="submit">Register</button>

        <p>
          Already Registered? <Link to="/login">Login Now</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

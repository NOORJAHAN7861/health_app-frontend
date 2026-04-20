import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { api } from "../utils/api";
import { toast } from "react-toastify";
import { Context } from "../main";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { data } = await api.get("/api/v1/user/logout", {
        withCredentials: true,
      });

      toast.success(data.message);
      setIsAuthenticated(false);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <nav className="container">
      <img src="/logo3.jpg" alt="Noor hospital" className="logo" />

      <div className={show ? "navLinks showmenu" : "navLinks"}>
        <div className="links">
          <Link to="/" onClick={() => setShow(false)}>Home</Link>
          <Link to="/appointment" onClick={() => setShow(false)}>Appointment</Link>
          <Link to="/about" onClick={() => setShow(false)}>About Us</Link>
        </div>

        {isAuthenticated ? (
          <button className="logoutBtn btn" onClick={handleLogout}>
            LOGOUT
          </button>
        ) : (
          <div className="auth-buttons">
            <button className="loginBtn btn" onClick={goToLogin}>
              LOGIN
            </button>
            <button className="registerBtn btn" onClick={goToRegister}>
              REGISTER
            </button>
          </div>
        )}
      </div>

      <div className="hamburger" onClick={() => setShow(!show)}>
        <GiHamburgerMenu />
      </div>
    </nav>
  );
};

export default Navbar;



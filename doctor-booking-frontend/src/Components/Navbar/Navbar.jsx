
import { NavLink, useNavigate } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("patientId");

    navigate("/login");
  };

  return (
    <nav className="main-navbar">
      <div className="navbar-container">

        {/* Logo */}

        <NavLink to="/home" className="navbar-brand">
          <div className="brand-icon">
            🩺
          </div>

          <div className="brand-text">
            <span className="brand-name">
              Doctor Booking
            </span>

            <small>
              Healthcare made simple
            </small>
          </div>
        </NavLink>


        {/* Navigation Links */}

        <div className="navbar-links">

          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive
                ? "navbar-link active"
                : "navbar-link"
            }
          >
            Home
          </NavLink>


          <NavLink
            to="/doctors"
            className={({ isActive }) =>
              isActive
                ? "navbar-link active"
                : "navbar-link"
            }
          >
            Doctors
          </NavLink>


          {role === "PATIENT" && (
            <NavLink
              to="/appointments"
              className={({ isActive }) =>
                isActive
                  ? "navbar-link active"
                  : "navbar-link"
              }
            >
              My Appointments
            </NavLink>
          )}


          {role === "DOCTOR" && (
            <NavLink
              to="/doctor-dashboard"
              className={({ isActive }) =>
                isActive
                  ? "navbar-link active"
                  : "navbar-link"
              }
            >
              Doctor Dashboard
            </NavLink>
          )}


          {role === "ADMIN" && (
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                isActive
                  ? "navbar-link active"
                  : "navbar-link"
              }
            >
              Admin Dashboard
            </NavLink>
          )}

        </div>


        {/* User Section */}

        <div className="navbar-user">

          <div className="user-avatar">
            {email ? email.charAt(0).toUpperCase() : "U"}
          </div>


          <div className="user-details">

            <span className="user-label">
              SIGNED IN AS
            </span>

            <span className="user-email">
              {email || "User"}
            </span>

          </div>


          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;


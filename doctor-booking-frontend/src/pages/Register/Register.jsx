
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("PATIENT");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (event) => {

    event.preventDefault();

    setMessage("");
    setError("");

    try {

      const response = await axios.post(
        "http://localhost:8081/api/auth/register",
        {
          name,
          email,
          password,
          phone,
          role
        }
      );

      console.log(
        "Register response:",
        response.data
      );

      setMessage(
        "Account created successfully! Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {

      console.error(
        "Registration error:",
        error
      );

      if (error.response) {

        setError(
          error.response.data?.message ||
          "Registration failed. Please try again."
        );

      } else {

        setError(
          "Cannot connect to backend."
        );

      }
    }
  };

  return (
    <div className="register-page">

      <div className="register-card">

        {/* Header */}

        <div className="register-header">

          <div className="register-logo">
             🩺
          </div>

          <h1>
            Doctor Booking
          </h1>

          <p>
            Create your account
          </p>

        </div>


        {/* Form */}

        <form onSubmit={handleRegister}>

          {/* Name */}

          <div className="register-field">

            <label>
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              required
            />

          </div>


          {/* Email */}

          <div className="register-field">

            <label>
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />

          </div>


          {/* Password */}

          <div className="register-field">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />

          </div>


          {/* Phone */}

          <div className="register-field">

            <label>
              Phone Number
            </label>

            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(event) =>
                setPhone(event.target.value)
              }
              required
            />

          </div>


          {/* Role */}

          <div className="register-field">

            <label>
              Register As
            </label>

            <div className="role-options">

              <label
                className={`role-option ${
                  role === "PATIENT"
                    ? "active"
                    : ""
                }`}
              >

                <input
                  type="radio"
                  name="role"
                  value="PATIENT"
                  checked={role === "PATIENT"}
                  onChange={(event) =>
                    setRole(event.target.value)
                  }
                />

                <span>
                  👤
                </span>

                Patient

              </label>


              <label
                className={`role-option ${
                  role === "DOCTOR"
                    ? "active"
                    : ""
                }`}
              >

                <input
                  type="radio"
                  name="role"
                  value="DOCTOR"
                  checked={role === "DOCTOR"}
                  onChange={(event) =>
                    setRole(event.target.value)
                  }
                />

                <span>
                  👨‍⚕️
                </span>

                Doctor

              </label>

            </div>

          </div>


          {/* Success */}

          {message && (

            <div className="register-success">
              ✓ {message}
            </div>

          )}


          {/* Error */}

          {error && (

            <div className="register-error">
              ! {error}
            </div>

          )}


          {/* Register button */}

          <button
            type="submit"
            className="register-btn"
          >
            Create Account
          </button>

        </form>


        {/* Login */}

        <div className="register-login">

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Register;


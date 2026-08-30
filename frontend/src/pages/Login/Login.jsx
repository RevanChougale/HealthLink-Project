
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import API_URL from "../../api";



function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {

    event.preventDefault();

    try {

      setLoading(true);
      setMessage("");

      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        {
          email: email,
          password: password
        }
      );

      const data = response.data;

      console.log(
        "Login response:`",
        JSON.stringify(data, null, 2)
      );

     localStorage.setItem("token", data.token);
localStorage.setItem("email", data.email);
localStorage.setItem("role", data.role);
localStorage.setItem("patientId", data.patientId);

      setMessage("Login successful!");

      setTimeout(() => {
        navigate("/home");
      }, 700);

    } catch (error) {

      console.error("Login error:`", error);

      if (error.response) {

        setMessage(
          error.response.data?.message ||
          "Invalid email or password"
        );

      } else {

        setMessage("Cannot connect to backend");

      }

    } finally {

      setLoading(false);

    }
  };


  return (

    <div className="login-page">

      <div className="login-card">

        {/* Logo / Application Name */}

        <div className="login-brand">

          <div className="login-logo">
            🧑‍⚕️
          </div>

          <h1>
            Doctor Booking
          </h1>

          <p>
            Your health, our priority
          </p>

        </div>


        {/* Heading */}

        <div className="login-heading">

          <h2>
            Welcome Back
          </h2>

          <p>
            Login to manage your appointments
          </p>

        </div>


        {/* Login Form */}

        <form onSubmit={handleLogin}>

          {/* Email */}

          <div className="login-field">

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

          <div className="login-field">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />

          </div>


          {/* Login Button */}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >

            {loading
              ? "Signing in..."
              : "Login"
            }

          </button>

        </form>


        {/* Message */}

        {message && (

          <div
            className={`login-message ${
              message === "Login successful!"
                ? "success"
                : "error"
            }`}
          >
            {message}
          </div>

        )}


        {/* Register */}

        <div className="register-section">

          <span>
            Don't have an account?
          </span>

          <Link to="/register">
            Create an account
          </Link>

        </div>


        {/* Footer */}

        <div className="login-footer">
          Secure access to your healthcare account
        </div>

      </div>

    </div>
  );
}

export default Login;



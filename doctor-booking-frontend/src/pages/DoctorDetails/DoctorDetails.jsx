
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../../Components/Navbar/Navbar";
import "./DoctorDetails.css";

function DoctorDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchDoctor = async () => {

      try {

        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please login first.");
          setLoading(false);
          return;
        }

        if (!id) {
          setError("Doctor ID is missing.");
          setLoading(false);
          return;
        }

        console.log("Loading doctor ID:", id);

        const response = await axios.get(
          `http://localhost:8081/api/doctors/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Doctor response:", response.data);

        setDoctor(response.data);

      } catch (error) {

        console.error(
          "Error fetching doctor:",
          error
        );

        if (error.response?.status === 401) {

          setError(
            "Your login session has expired. Please login again."
          );

        } else if (error.response?.status === 404) {

          setError("Doctor not found.");

        } else {

          setError(
            "Unable to load doctor details."
          );
        }

      } finally {

        setLoading(false);

      }
    };

    fetchDoctor();

  }, [id]);


  // =========================================
  // LOADING
  // =========================================

  if (loading) {

    return (
      <>
        <Navbar />

        <div className="doctor-details-page">

          <div className="doctor-loading">

            <div className="loading-spinner"></div>

            <p>
              Loading doctor details...
            </p>

          </div>

        </div>
      </>
    );
  }


  // =========================================
  // ERROR
  // =========================================

  if (error) {

    return (
      <>
        <Navbar />

        <div className="doctor-details-page">

          <div className="doctor-error">

            {error}

            <button
              onClick={() => navigate("/doctors")}
              className="back-doctors-btn"
            >
              ← Back to Doctors
            </button>

          </div>

        </div>
      </>
    );
  }


  // =========================================
  // DOCTOR NOT FOUND
  // =========================================

  if (!doctor) {

    return (
      <>
        <Navbar />

        <div className="doctor-details-page">

          <div className="doctor-error">
            Doctor information not available.
          </div>

        </div>
      </>
    );
  }


  // =========================================
  // DOCTOR DETAILS
  // =========================================

  return (
    <>
      <Navbar />

      <div className="doctor-details-page">

        <div className="doctor-profile-card">


          {/* =================================
              PROFILE HEADER
          ================================= */}

          <div className="doctor-profile-header">

            <div className="doctor-avatar">
              👨‍⚕️
            </div>

            <div className="doctor-main-info">

              <div className="doctor-name-row">

                <h1>
                  {doctor.name}
                </h1>

                <span className="verified-badge">
                  ✓ Verified
                </span>

              </div>


              <p className="doctor-specialization">
                {doctor.specialization}
              </p>


              <p className="doctor-location">
                📍 {doctor.city}
              </p>

            </div>

          </div>


          {/* =================================
              DOCTOR INFORMATION
          ================================= */}

          <div className="doctor-info-section">

            <h2>
              Doctor Information
            </h2>


            <div className="doctor-info-grid">


              {/* Experience */}

              <div className="info-box">

                <div className="info-icon">
                  💼
                </div>

                <div>

                  <span>
                    Experience
                  </span>

                  <strong>
                    {doctor.experience} years
                  </strong>

                </div>

              </div>


              {/* Location */}

              <div className="info-box">

                <div className="info-icon">
                  📍
                </div>

                <div>

                  <span>
                    Location
                  </span>

                  <strong>
                    {doctor.city}
                  </strong>

                </div>

              </div>


              {/* Phone */}

              <div className="info-box">

                <div className="info-icon">
                  📞
                </div>

                <div>

                  <span>
                    Phone
                  </span>

                  <strong>
                    {doctor.phone}
                  </strong>

                </div>

              </div>


              {/* Email */}

              <div className="info-box">

                <div className="info-icon">
                  ✉️
                </div>

                <div>

                  <span>
                    Email
                  </span>

                  <strong>
                    {doctor.email}
                  </strong>

                </div>

              </div>

            </div>

          </div>


          {/* =================================
              APPOINTMENT SECTION
          ================================= */}

          <div className="appointment-section">

            <div>

              <h3>
                Ready to book an appointment?
              </h3>

              <p>
                Choose your preferred date and
                available time slot.
              </p>

            </div>


            <button
              className="book-appointment-btn"
              onClick={() =>
                navigate(
                  `/appointments/book/${doctor.id}`
                )
              }
            >
              📅 Book Appointment
            </button>

          </div>


          {/* =================================
              BACK BUTTON
          ================================= */}

          <button
            className="back-doctors-btn"
            onClick={() =>
              navigate("/doctors")
            }
          >
            ← Back to Doctors
          </button>


        </div>

      </div>
    </>
  );
}

export default DoctorDetails;

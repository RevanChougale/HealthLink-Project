
import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../../Components/Navbar/Navbar";
import "./Appointments.css";

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================
  // FETCH APPOINTMENTS
  // =========================================

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");

      if (!token || !email) {
        setError("Please login first.");
        setLoading(false);
        return;
      }

      // =========================================
      // GET PATIENT
      // =========================================

      const patientResponse = await axios.get(
        `http://localhost:8081/api/patients/email/${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const patientId = patientResponse.data.id;

      // =========================================
      // GET APPOINTMENTS
      // =========================================

      const response = await axios.get(
        `http://localhost:8081/api/appointments/patient/${patientId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "FULL APPOINTMENT:",
        JSON.stringify(response.data, null, 2)
      );

      // =========================================
      // LOAD DOCTOR + SLOT INFORMATION
      // =========================================

      const enrichedAppointments = await Promise.all(
        response.data.map(async (appointment) => {
          let doctor = null;
          let slot = null;

          // -------------------------------
          // Get Doctor
          // -------------------------------

          try {
            const doctorResponse = await axios.get(
              `http://localhost:8081/api/doctors/${appointment.doctorId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            doctor = doctorResponse.data;
          } catch (doctorError) {
            console.error(
              "Error loading doctor:",
              doctorError
            );
          }

          // -------------------------------
          // Get Time Slot
          // -------------------------------

          try {
            const slotResponse = await axios.get(
              `http://localhost:8081/api/slots/${appointment.timeSlotId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            slot = slotResponse.data;
          } catch (slotError) {
            console.error(
              "Error loading time slot:",
              slotError
            );
          }

          return {
            ...appointment,
            doctor: doctor,
            timeSlot: slot,
          };
        })
      );

      console.log(
        "ENRICHED APPOINTMENTS:",
        enrichedAppointments
      );

      setAppointments(enrichedAppointments);
    } catch (error) {
      console.error(
        "Error fetching appointments:",
        error
      );

      setError(
        "Unable to load your appointments."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // =========================================
  // CANCEL APPOINTMENT
  // =========================================

  const handleCancel = async (appointmentId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (!confirmCancel) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:8081/api/appointments/${appointmentId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchAppointments();
    } catch (error) {
      console.error(
        "Error cancelling appointment:",
        error
      );

      setError(
        "Unable to cancel appointment."
      );
    }
  };

  // =========================================
  // FORMAT DATE
  // =========================================

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =========================================
  // FORMAT TIME
  // =========================================

  const formatTime = (time) => {
    if (!time) {
      return "N/A";
    }

    return time;
  };

  // =========================================
  // STATUS
  // =========================================

  const getStatusText = (status) => {
    if (!status) {
      return "Unknown";
    }

    switch (status.toUpperCase()) {
      case "BOOKED":
        return "✓ Booked";

      case "CANCELLED":
        return "Cancelled";

      case "COMPLETED":
        return "Completed";

      default:
        return status;
    }
  };

  // =========================================
  // UI
  // =========================================

  return (
    <>
      <Navbar />

      <main className="appointments-page">

        {/* HERO */}

        <section className="appointments-hero">

          <div className="appointments-container">

            <span className="appointments-label">
              MY HEALTHCARE
            </span>

            <h1>
              My Appointments
            </h1>

            <p>
              View and manage your upcoming and
              previous doctor appointments.
            </p>

          </div>

        </section>


        <div className="appointments-container">

          {/* LOADING */}

          {loading && (

            <div className="appointments-loading">

              <div className="appointment-spinner"></div>

              <p>
                Loading your appointments...
              </p>

            </div>

          )}


          {/* ERROR */}

          {!loading && error && (

            <div className="appointments-error">
              {error}
            </div>

          )}


          {/* EMPTY */}

          {!loading &&
            !error &&
            appointments.length === 0 && (

              <div className="appointments-empty">

                <div className="empty-icon">
                  📅
                </div>

                <h2>
                  No appointments yet
                </h2>

                <p>
                  You haven't booked any doctor
                  appointments yet.
                </p>

                <a
                  href="/doctors"
                  className="find-doctor-btn"
                >
                  Find a Doctor →
                </a>

              </div>

            )}


          {/* APPOINTMENT LIST */}

          {!loading &&
            !error &&
            appointments.length > 0 && (

              <section className="appointment-section">

                {/* HEADING */}

                <div className="appointment-heading">

                  <div>

                    <span>
                      YOUR BOOKINGS
                    </span>

                    <h2>
                      Appointment History
                    </h2>

                  </div>

                  <div className="appointment-count">

                    <strong>
                      {appointments.length}
                    </strong>

                    <small>
                      Appointment
                      {appointments.length !== 1
                        ? "s"
                        : ""}
                    </small>

                  </div>

                </div>


                {/* CARDS */}

                <div className="appointments-list">

                  {appointments.map(
                    (appointment) => (

                    <article
                      className="appointment-card"
                      key={appointment.id}
                    >

                      {/* =================================
                          DOCTOR
                      ================================= */}

                      <div className="appointment-doctor">

                        <div className="appointment-avatar">
                          👨‍⚕️
                        </div>

                        <div>

                          <span className="appointment-small-label">
                            DOCTOR
                          </span>

                          <h3>
                            {appointment.doctorName ||
                              "Doctor"}
                          </h3>

                          <p>
                            {appointment.doctor
                              ?.specialization ||
                              "Specialist"}
                          </p>

                        </div>

                      </div>


                      {/* =================================
                          INFORMATION
                      ================================= */}

                      <div className="appointment-info">

                        {/* DATE */}

                        <div className="appointment-info-item">

                          <span className="info-icon">
                            📅
                          </span>

                          <div>

                            <small>
                              DATE
                            </small>

                            <strong>
                              {formatDate(
                                appointment.appointmentDate
                              )}
                            </strong>

                          </div>

                        </div>


                        {/* TIME */}

                        <div className="appointment-info-item">

                          <span className="info-icon">
                            🕐
                          </span>

                          <div>

                            <small>
                              TIME
                            </small>

                            <strong>

                              {formatTime(
                                appointment.timeSlot
                                  ?.startTime
                              )}

                              {" - "}

                              {formatTime(
                                appointment.timeSlot
                                  ?.endTime
                              )}

                            </strong>

                          </div>

                        </div>


                        {/* LOCATION */}

                        <div className="appointment-info-item">

                          <span className="info-icon">
                            📍
                          </span>

                          <div>

                            <small>
                              LOCATION
                            </small>

                            <strong>
                              {appointment.doctor
                                ?.city ||
                                "Clinic"}
                            </strong>

                          </div>

                        </div>

                      </div>


                      {/* =================================
                          ACTIONS
                      ================================= */}

                      <div className="appointment-actions">

                        <span
                          className={`appointment-status ${
                            appointment.status
                              ?.toLowerCase()
                          }`}
                        >

                          {getStatusText(
                            appointment.status
                          )}

                        </span>


                        {appointment.status
                          ?.toUpperCase() ===
                          "BOOKED" && (

                          <button
                            className="cancel-appointment-btn"
                            onClick={() =>
                              handleCancel(
                                appointment.id
                              )
                            }
                          >
                            Cancel Appointment
                          </button>

                        )}

                      </div>

                    </article>

                  ))}

                </div>

              </section>

            )}

        </div>

      </main>
    </>
  );
}

export default Appointments;


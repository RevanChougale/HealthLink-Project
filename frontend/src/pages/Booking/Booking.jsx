
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import "./Booking.css";
import Navbar from "../../Components/Navbar/Navbar";

function Booking() {

  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [patientId, setPatientId] = useState(null);

  const [loadingDoctor, setLoadingDoctor] = useState(true);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  // =========================================
  // LOAD PATIENT AND DOCTOR
  // =========================================

  useEffect(() => {

    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    if (!email || !token) {

      setError("Please login first.");
      setLoadingDoctor(false);

      return;
    }


    if (!doctorId) {

      setError("Doctor ID is missing.");
      setLoadingDoctor(false);

      return;
    }


    const loadInformation = async () => {

      try {

        setLoadingDoctor(true);
        setError("");


        // -----------------------------
        // GET PATIENT
        // -----------------------------

        const patientResponse = await axios.get(
          `http://localhost:8081/api/patients/email/${email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPatientId(patientResponse.data.id);


        // -----------------------------
        // GET DOCTOR
        // -----------------------------

        console.log(
          "Loading doctor:",
          doctorId
        );

        const doctorResponse = await axios.get(
          `http://localhost:8081/api/doctors/${doctorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );


        console.log(
          "Doctor information:",
          doctorResponse.data
        );


        setDoctor(doctorResponse.data);

      } catch (error) {

        console.error(
          "Error loading booking information:",
          error
        );


        if (error.response?.status === 401) {

          setError(
            "Your login session has expired. Please login again."
          );

        } else if (error.response?.status === 404) {

          setError("Doctor or patient information not found.");

        } else {

          setError(
            "Unable to load booking information."
          );
        }

      } finally {

        setLoadingDoctor(false);

      }
    };


    loadInformation();

  }, [doctorId]);


  // =========================================
  // GET AVAILABLE SLOTS
  // =========================================

  const fetchAvailableSlots = async () => {

    if (!date) {

      setError("Please select a date.");

      return;
    }


    try {

      setLoading(true);
      setError("");
      setMessage("");
      setSelectedSlot(null);


      const token = localStorage.getItem("token");


      if (!token) {

        setError("Please login first.");
        return;
      }


      const response = await axios.get(
        "http://localhost:8081/api/slots/available",
        {
          params: {
            doctorId: doctorId,
            date: date,
          },

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      console.log(
        "Available slots:",
        response.data
      );


      setSlots(response.data);

    } catch (error) {

      console.error(
        "Error fetching available slots:",
        error
      );


      if (error.response?.status === 401) {

        setError(
          "Your login session has expired. Please login again."
        );

      } else {

        setError(
          "Unable to load available time slots."
        );
      }


      setSlots([]);

    } finally {

      setLoading(false);

    }
  };


  // =========================================
  // SELECT SLOT
  // =========================================

  const handleSlotSelect = (slot) => {

    setSelectedSlot(slot);

    setMessage("");
    setError("");

  };


  // =========================================
  // BOOK APPOINTMENT
  // =========================================

  const handleBooking = async () => {

    if (!selectedSlot) {

      setError(
        "Please select a time slot."
      );

      return;
    }


    if (!patientId) {

      setError(
        "Patient information not available."
      );

      return;
    }


    try {

      setError("");
      setMessage("");


      const token = localStorage.getItem("token");


      if (!token) {

        setError(
          "Please login first."
        );

        return;
      }


      const bookingData = {

        doctorId: Number(doctorId),

        patientId: patientId,

        timeSlotId: selectedSlot.id,

        appointmentDate: date,

      };


      console.log(
        "Booking request:",
        bookingData
      );


      const response = await axios.post(
        "http://localhost:8081/api/appointments",
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      console.log(
        "Booking response:",
        response.data
      );


      setMessage(
        "Appointment booked successfully!"
      );


      // Remove booked slot

      setSlots((previousSlots) =>
        previousSlots.filter(
          (slot) =>
            slot.id !== selectedSlot.id
        )
      );


      setSelectedSlot(null);

    } catch (error) {

      console.error(
        "Booking error:",
        error
      );


      if (error.response?.status === 401) {

        setError(
          "Your login session has expired. Please login again."
        );

      } else if (error.response) {

        setError(
          error.response.data?.message ||
          "Unable to book appointment."
        );

      } else {

        setError(
          "Cannot connect to backend."
        );
      }
    }
  };


  // =========================================
  // UI
  // =========================================

  return (

    <div className="booking-page">

      <Navbar />


      {/* =====================================
          HEADER
      ===================================== */}

      <section className="booking-header">

        <div className="container">

          <button
            className="back-doctor-btn"
            onClick={() =>
              navigate(
                `/doctors/${doctorId}`
              )
            }
          >
            ← Back to Doctor
          </button>


          <div className="booking-header-content">

            <div>

              <span className="booking-label">
                APPOINTMENT
              </span>


              <h1>
                Book an Appointment
              </h1>


              <p>
                Select your preferred date and
                choose an available time slot.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================
          MAIN
      ===================================== */}

      <main className="booking-main">

        <div className="container">

          <div className="booking-wrapper">

            <div className="booking-card">


              {/* =================================
                  DOCTOR INFORMATION
              ================================= */}

              <div className="doctor-booking-info">


                <div className="doctor-avatar">
                  👨‍⚕️
                </div>


                <div>

                  <span className="doctor-small-label">
                    APPOINTMENT WITH
                  </span>


                  <h2>

                    {loadingDoctor
                      ? "Loading doctor..."
                      : doctor?.name
                        ? `Dr. ${doctor.name}`
                        : "Doctor information unavailable"}

                  </h2>


                  <p>

                    {loadingDoctor
                      ? "Loading doctor information..."
                      : doctor
                        ? `${doctor.specialization || "Doctor"} • ${doctor.city || "Location not available"}`
                        : "Unable to load doctor information."}

                  </p>

                </div>

              </div>


              <div className="booking-divider"></div>


              {/* =================================
                  DATE
              ================================= */}

              <div className="date-section">

                <div className="section-title">

                  <div className="section-icon">
                    📅
                  </div>


                  <div>

                    <h3>
                      Select Appointment Date
                    </h3>


                    <p>
                      Choose the date you want to
                      visit the doctor.
                    </p>

                  </div>

                </div>


                <label>
                  Appointment Date
                </label>


                <input
                  type="date"
                  value={date}
                  onChange={(event) => {

                    setDate(
                      event.target.value
                    );

                    setSlots([]);

                    setSelectedSlot(null);

                    setMessage("");

                    setError("");

                  }}
                />

              </div>


              {/* =================================
                  CHECK SLOTS
              ================================= */}

              <button
                className="check-slots-btn"
                onClick={
                  fetchAvailableSlots
                }
                disabled={
                  loading ||
                  loadingDoctor ||
                  !doctor
                }
              >

                {loading
                  ? "Checking availability..."
                  : "Check Available Slots →"}

              </button>


              {/* =================================
                  LOADING SLOTS
              ================================= */}

              {loading && (

                <div className="booking-loading">

                  <div className="loading-spinner"></div>

                  <p>
                    Checking available time slots...
                  </p>

                </div>

              )}


              {/* =================================
                  ERROR
              ================================= */}

              {error && (

                <div className="booking-alert error-alert">

                  <span>!</span>

                  <p>
                    {error}
                  </p>

                </div>

              )}


              {/* =================================
                  SUCCESS
              ================================= */}

              {message && (

                <div className="booking-alert success-alert">

                  <span>✓</span>

                  <div>

                    <strong>
                      Booking Successful
                    </strong>


                    <p>
                      {message}
                    </p>

                  </div>

                </div>

              )}


              {/* =================================
                  AVAILABLE SLOTS
              ================================= */}

              {!loading &&
                slots.length > 0 && (

                  <section className="slots-section">


                    <div className="slots-heading">

                      <div>

                        <span className="booking-label">
                          AVAILABILITY
                        </span>


                        <h3>
                          Available Time Slots
                        </h3>


                        <p>
                          Select one available
                          time for your appointment.
                        </p>

                      </div>


                      <span className="slots-count">

                        {slots.filter(
                          (slot) =>
                            slot.available
                        ).length}{" "}

                        available

                      </span>

                    </div>


                    {/* TIME SLOTS */}

                    <div className="slots-grid">

                      {slots

                        .filter(
                          (slot) =>
                            slot.available
                        )

                        .map((slot) => (

                          <button
                            key={slot.id}
                            className={`time-slot ${
                              selectedSlot?.id ===
                              slot.id
                                ? "selected"
                                : ""
                            }`}
                            onClick={() =>
                              handleSlotSelect(
                                slot
                              )
                            }
                          >

                            <span className="time-icon">
                              🕐
                            </span>


                            <strong>
                              {slot.startTime}
                            </strong>


                            <small>
                              to {slot.endTime}
                            </small>

                          </button>

                        ))}

                    </div>


                    {/* =================================
                        SELECTED APPOINTMENT
                    ================================= */}

                    {selectedSlot && (

                      <div className="selected-appointment">


                        <div className="selected-header">

                          <div>

                            <span>
                              SELECTED SLOT
                            </span>


                            <h3>
                              Appointment Details
                            </h3>

                          </div>


                          <div className="selected-check">
                            ✓
                          </div>

                        </div>


                        <div className="appointment-details">


                          {/* DATE */}

                          <div className="appointment-detail">

                            <span>
                              📅
                            </span>


                            <div>

                              <small>
                                Date
                              </small>


                              <strong>
                                {date}
                              </strong>

                            </div>

                          </div>


                          {/* TIME */}

                          <div className="appointment-detail">

                            <span>
                              🕐
                            </span>


                            <div>

                              <small>
                                Time
                              </small>


                              <strong>
                                {selectedSlot.startTime}
                                {" - "}
                                {selectedSlot.endTime}
                              </strong>

                            </div>

                          </div>


                          {/* DOCTOR */}

                          <div className="appointment-detail">

                            <span>
                              👨‍⚕️
                            </span>


                            <div>

                              <small>
                                Doctor
                              </small>


                              <strong>
                                {doctor?.name
                                  ? `Dr. ${doctor.name}`
                                  : `Doctor #${doctorId}`}
                              </strong>

                            </div>

                          </div>

                        </div>


                        {/* CONFIRM */}

                        <button
                          className="confirm-btn"
                          onClick={
                            handleBooking
                          }
                        >
                          ✓ Confirm Appointment
                        </button>

                      </div>

                    )}

                  </section>

                )}


              {/* =================================
                  NO SLOTS
              ================================= */}

              {!loading &&
                date &&
                slots.length === 0 &&
                !error && (

                  <div className="no-slots">

                    <div className="no-slots-icon">
                      🕐
                    </div>


                    <h3>
                      No available slots
                    </h3>


                    <p>
                      There are no available
                      appointments for this date.
                    </p>


                    <span>
                      Please select another date.
                    </span>

                  </div>

                )}

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Booking;


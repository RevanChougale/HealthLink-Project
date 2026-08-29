
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../../Components/Navbar/Navbar";
import "./Doctors.css";

function Doctors() {

  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);

  const [city, setCity] = useState("");
  const [specialization, setSpecialization] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // Fetch doctors
  const fetchDoctors = async () => {

    try {

      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      let response;

      if (city || specialization) {

        response = await axios.get(
          "http://localhost:8081/api/doctors/search",
          {
            params: {
              city: city || undefined,
              specialization: specialization || undefined,
            },

            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      } else {

        response = await axios.get(
          "http://localhost:8081/api/doctors",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      }

      setDoctors(response.data);

    } catch (error) {

      console.error(
        "Error fetching doctors:",
        error
      );

      setError("Unable to load doctors.");

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {
    fetchDoctors();
  }, []);


  // Search
  const handleSearch = (event) => {

    event.preventDefault();

    fetchDoctors();

  };


  // Clear search
  const clearSearch = () => {

    setCity("");
    setSpecialization("");

    setTimeout(() => {
      fetchDoctors();
    }, 0);

  };


  return (
    <>
      <Navbar />

      <main className="doctors-page">


        {/* Page Header */}

        <section className="doctors-hero">

          <div className="doctors-container">

            <div>

              <span className="doctors-label">
                FIND YOUR DOCTOR
              </span>

              <h1>
                Find the right doctor
                <span> for your health</span>
              </h1>

              <p>
                Search trusted doctors by city and
                specialization and book your appointment
                easily.
              </p>

            </div>

          </div>

        </section>



        <div className="doctors-container">


          {/* Search */}

          <section className="doctor-search-card">

            <div className="search-title">

              <div className="search-icon">
                🔎
              </div>

              <div>

                <h2>
                  Search Doctors
                </h2>

                <p>
                  Find a specialist near you
                </p>

              </div>

            </div>


            <form onSubmit={handleSearch}>

              <div className="search-grid">


                {/* City */}

                <div className="search-field">

                  <label>
                    City
                  </label>

                  <div className="input-wrapper">

                    <span>
                      📍
                    </span>

                    <input
                      type="text"
                      placeholder="e.g. Pune"
                      value={city}
                      onChange={(event) =>
                        setCity(event.target.value)
                      }
                    />

                  </div>

                </div>


                {/* Specialization */}

                <div className="search-field">

                  <label>
                    Specialization
                  </label>

                  <div className="input-wrapper">

                    <span>
                      🩺
                    </span>

                    <input
                      type="text"
                      placeholder="e.g. Cardiologist"
                      value={specialization}
                      onChange={(event) =>
                        setSpecialization(
                          event.target.value
                        )
                      }
                    />

                  </div>

                </div>


                {/* Search Button */}

                <button
                  type="submit"
                  className="doctor-search-btn"
                >
                  Search Doctors
                </button>

              </div>


              {(city || specialization) && (

                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={clearSearch}
                >
                  Clear search
                </button>

              )}

            </form>

          </section>



          {/* Doctors Heading */}

          <div className="doctors-heading">

            <div>

              <span>
                OUR SPECIALISTS
              </span>

              <h2>
                Available Doctors
              </h2>

              <p>
                Choose a doctor and book your
                appointment.
              </p>

            </div>


            {!loading && !error && (

              <div className="doctor-count">

                <strong>
                  {doctors.length}
                </strong>

                <span>
                  Doctors
                </span>

              </div>

            )}

          </div>



          {/* Loading */}

          {loading && (

            <div className="doctors-loading">

              <div className="loading-spinner"></div>

              <p>
                Finding doctors...
              </p>

            </div>

          )}



          {/* Error */}

          {error && (

            <div className="doctors-error">
              {error}
            </div>

          )}



          {/* No Doctors */}

          {!loading &&
            !error &&
            doctors.length === 0 && (

              <div className="no-doctors">

                <div className="no-doctor-icon">
                  🩺
                </div>

                <h3>
                  No doctors found
                </h3>

                <p>
                  Try changing your city or
                  specialization.
                </p>

              </div>

            )}



          {/* Doctor Cards */}

          {!loading &&
            !error &&
            doctors.length > 0 && (

              <div className="doctors-grid">

                {doctors.map((doctor) => (

                  <article
                    className="doctor-card"
                    key={doctor.id}
                  >


                    {/* Card Header */}

                    <div className="doctor-card-top">

                      <div className="doctor-card-avatar">
                        👨‍⚕️
                      </div>

                      <span className="verified-small">
                        ✓ Verified
                      </span>

                    </div>


                    {/* Doctor Info */}

                    <div className="doctor-card-body">

                      <h3>
                        {doctor.name}
                      </h3>

                      <span className="doctor-specialty">
                        {doctor.specialization}
                      </span>


                      <div className="doctor-details-list">

                        <div>
                          <span className="detail-icon">
                            📍
                          </span>

                          <span>
                            {doctor.city}
                          </span>
                        </div>


                        <div>
                          <span className="detail-icon">
                            💼
                          </span>

                          <span>
                            {doctor.experience} years
                            experience
                          </span>
                        </div>


                        <div>
                          <span className="detail-icon">
                            📞
                          </span>

                          <span>
                            {doctor.phone}
                          </span>
                        </div>

                      </div>


                      <button
                        className="view-doctor-btn"
                        onClick={() =>
                          navigate(
                            `/doctors/${doctor.id}`
                          )
                        }
                      >
                        View Doctor Details
                        <span>→</span>
                      </button>

                    </div>

                  </article>

                ))}

              </div>

            )}

        </div>


        {/* Bottom CTA */}

        {!loading &&
          !error &&
          doctors.length > 0 && (

            <section className="doctors-bottom-cta">

              <div>

                <h2>
                  Need help choosing a doctor?
                </h2>

                <p>
                  Find a specialist that matches
                  your healthcare needs.
                </p>

              </div>

              <span>
                🩺
              </span>

            </section>

          )}

      </main>
    </>
  );
}

export default Doctors;


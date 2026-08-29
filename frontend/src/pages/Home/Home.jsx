
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import "./Home.css";

function Home() {
  return (
    <>
      <Navbar />

      {/* ================================
          HERO
      ================================= */}

      <section className="home-hero">
        <div className="container">
          <div className="row align-items-center">

            {/* LEFT */}

            <div className="col-lg-6">

              <div className="welcome-tag">
                🩺 Your Health, Our Priority
              </div>

              <h1>
                Find the right doctor.
                <br />
                <span>Get the right care.</span>
              </h1>

              <p className="hero-description">
                Find trusted doctors, check available time slots,
                book appointments, and manage your healthcare
                journey from one simple platform.
              </p>

              <div className="hero-actions">

                <Link
                  to="/doctors"
                  className="primary-btn"
                >
                  Find a Doctor →
                </Link>

                <Link
                  to="/appointments"
                  className="secondary-btn"
                >
                  My Appointments
                </Link>

              </div>


              {/* STATS */}

              <div className="hero-stats">

                <div className="stat">
                  <strong>100+</strong>
                  <span>Doctors</span>
                </div>

                <div className="stat-divider"></div>

                <div className="stat">
                  <strong>500+</strong>
                  <span>Patients</span>
                </div>

                <div className="stat-divider"></div>

                <div className="stat">
                  <strong>24/7</strong>
                  <span>Healthcare</span>
                </div>

              </div>

            </div>


            {/* RIGHT */}

            <div className="col-lg-6">

              <div className="hero-visual">

                <div className="circle-bg"></div>

                <div className="doctor-image">
                  🩺
                </div>


                {/* CONFIRMED CARD */}

                <div className="appointment-card">

                  <div className="appointment-icon">
                    ✓
                  </div>

                  <div>
                    <small>Appointment</small>
                    <strong>Confirmed</strong>
                  </div>

                </div>


                {/* DOCTOR CARD */}

                <div className="doctor-card-mini">

                  <div className="mini-avatar">
                    🩺
                  </div>

                  <div>
                    <strong>Trusted Doctors</strong>
                    <span>Available Today</span>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>
      </section>


      {/* ================================
          QUICK SEARCH
      ================================= */}

      <section className="quick-search">

        <div className="container">

          <div className="search-box">

            <div className="search-title">

              <div className="search-icon">
                🔎
              </div>

              <div>

                <h4>
                  Find the right doctor
                </h4>

                <p>
                  Search doctors by city or specialization
                </p>

              </div>

            </div>

            <Link
              to="/doctors"
              className="search-button"
            >
              Search Doctors →
            </Link>

          </div>

        </div>

      </section>


      {/* ================================
          HOW IT WORKS
      ================================= */}

      <section className="services-section">

        <div className="container">

          <div className="section-header">

            <span>
              HOW IT WORKS
            </span>

            <h2>
              Healthcare made simple
            </h2>

            <p>
              Find a doctor and manage your appointments in three simple steps.
            </p>

          </div>


          <div className="row g-4">


            {/* STEP 1 */}

            <div className="col-md-4">

              <div className="service-card">

                <div className="service-number">
                  01
                </div>

                <div className="service-icon blue">
                  🩺
                </div>

                <h4>
                  Find a Doctor
                </h4>

                <p>
                  Browse doctors and find the right specialist
                  based on your healthcare needs.
                </p>

                <Link to="/doctors">
                  Explore Doctors →
                </Link>

              </div>

            </div>


            {/* STEP 2 */}

            <div className="col-md-4">

              <div className="service-card">

                <div className="service-number">
                  02
                </div>

                <div className="service-icon green">
                  📅
                </div>

                <h4>
                  Book Appointment
                </h4>

                <p>
                  Select an available date and time slot
                  and book your appointment easily.
                </p>

                <Link to="/doctors">
                  Book Now →
                </Link>

              </div>

            </div>


            {/* STEP 3 */}

            <div className="col-md-4">

              <div className="service-card">

                <div className="service-number">
                  03
                </div>

                <div className="service-icon purple">
                  📋
                </div>

                <h4>
                  Manage Visits
                </h4>

                <p>
                  View your appointment history and manage
                  your upcoming doctor visits.
                </p>

                <Link to="/appointments">
                  View Appointments →
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================================
          CTA
      ================================= */}

      <section className="home-cta">

        <div className="container">

          <div className="cta-content">

            <div>

              <span>
                NEED MEDICAL CARE?
              </span>

              <h2>
                Your health deserves the right care.
              </h2>

              <p>
                Find a trusted doctor and book your appointment today.
              </p>

            </div>

            <Link
              to="/doctors"
              className="cta-button"
            >
              Find a Doctor →
            </Link>

          </div>

        </div>

      </section>

    </>
  );
}

export default Home;


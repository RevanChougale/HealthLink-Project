
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Doctors from "./pages/Doctors/Doctors";
import DoctorDetails from "./pages/DoctorDetails/DoctorDetails";
import Booking from "./pages/Booking/Booking";
import Appointments from "./pages/Appointments/Appointments";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<Home />} />

        <Route path="/doctors" element={<Doctors />} />

        <Route
          path="/doctors/:id"
          element={<DoctorDetails />}
        />

        <Route
          path="/appointments"
          element={<Appointments />}
        />

        <Route
          path="/appointments/book/:doctorId"
          element={<Booking />}
        />

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;


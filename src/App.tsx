import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import MakeBooking from "./pages/MakeBooking";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Assets from "./pages/Assets";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/make-booking" element={<MakeBooking />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/assets" element={<Assets />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;

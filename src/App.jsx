import React from "react";
import "./App.css";
import Form from "./Form";
import Landingpage from "./Landing_Page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Components/Header";
import Login from "./admin/Login";
import Register from "./admin/Register";
import Dashboard from "./admin/Dashboard";
import Events from "./admin/Events";
import Users from "./admin/Users";
import { useAppContext } from "./context/store";
import { Toaster } from "react-hot-toast";
import Protected from "./IsAuthenticated";
import NotFound from "./NotFound";

function App() {
  const { dark, Authenticated } = useAppContext();
  return (
    <div
      className={`${
        dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/form" element={<Form />} />
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/api/v1/admin/register"
            element={
              <Protected isLoggedIn={Authenticated}>
                <Register />
              </Protected>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <Protected isLoggedIn={Authenticated}>
                <Dashboard />
              </Protected>
            }
          />
          <Route
            path="/admin/event/:id"
            element={
              <Protected isLoggedIn={Authenticated}>
                <Events />
              </Protected>
            }
          />
          <Route
            path="/admin/users"
            element={
              <Protected isLoggedIn={Authenticated}>
                <Users />
              </Protected>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </Router>
    </div>
  );
}

export default App;

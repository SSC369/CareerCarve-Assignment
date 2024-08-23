import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import MentorHome from "./pages/MentorHome";
import StudentMeets from "./pages/StudentMeets";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/mentor" element={<MentorHome />} />
        <Route path="/meets" element={<StudentMeets />} />
      </Routes>
      <Toaster reverseOrder={false} position="top-center" />
    </>
  );
};

export default App;

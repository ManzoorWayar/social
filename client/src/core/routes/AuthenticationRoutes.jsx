import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../../pages/Auth/Login";
import Register from "../../pages/Auth/Register";
import Verification from "../../pages/Auth/Verification";
import ForgotPassword from "../../pages/Auth/ForgotPassword";
import NotFound from "../../pages/Auth/NotFound";
import ResetPassword from "../../pages/Auth/ResetPassword";

const AuthenticationRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="verification/:verifyToken" element={<Verification />} />
      <Route path="verification" element={<Verification />} />
      <Route path="forgotpassword" element={<ForgotPassword />} />
      <Route path="resetpassword/:resetToken" element={<ResetPassword />} />
      <Route path="404" element={<NotFound />} />
    </Routes>
  );
};

export default AuthenticationRoutes;

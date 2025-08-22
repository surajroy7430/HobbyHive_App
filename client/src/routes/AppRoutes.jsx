import { Route, Routes } from "react-router-dom";
import SignupPage from "../auth/signup-page";
import SigninPage from "../auth/signin-page";
import ForgotPassword from "../auth/forgot-password";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<SigninPage />} />
      <Route path="/register" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
};

export default AppRoutes;

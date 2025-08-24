import { Navigate, Route, Routes } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";

import SigninPage from "../auth/signin/signin-page";
import SignupPage from "../auth/signup/signup-page";
import ForgotPassword from "../auth/password/forgot-password";
import ResetPassword from "../auth/password/reset-password";

import AdminDashboard from "../pages/AdminDashboard";
import Dashboard from "../pages/Dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<SigninPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      {/* Admin Specific Route */}
      <Route element={<PrivateRoute roles={["admin"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Route>

      {/* Protected Routes */}
      <Route element={<PrivateRoute roles={["user", "admin"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Route>

      {/* Invalid Routes */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;

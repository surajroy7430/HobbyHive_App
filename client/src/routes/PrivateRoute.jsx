import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { TailChase } from "ldrs/react";

const PrivateRoute = ({ roles }) => {
  const { user, token, loading } = useAuth();

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <TailChase color="#f37656" size={30} speed={2.5} />
      </div>
    );

  if (!token) return <Navigate to="/login" replace />;

  if (roles && user && !roles.includes(user.role))
    return <Navigate to="/dashboard" replace />;

  return <Outlet />;
};

export default PrivateRoute;

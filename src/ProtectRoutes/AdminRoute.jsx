import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, isLoading, getUser } = useContext(AuthContext);
  const location = useLocation();
  const userInfo = getUser();
console.log(user);

  if (isLoading || !user) {
    return <div>Loading.....</div>;
  }
  if (userInfo.userInfo.role === "admin") {
    return children;
  }
  return <Navigate to="/signin" state={{ from: location }} replace />;
};

export default AdminRoute;

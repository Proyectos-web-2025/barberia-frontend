import { useSession } from "../hooks/auth/useSession";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useSession();
  if (isLoading) {
    return <div>Page loading...</div>;
    return;
  }
  if (isError) {
    navigate("//");
    return null;
  }
  if (!allowedRoles.includes(data.role)) {
    navigate("/unauthorized");
    return null;
  }
  return <>{children}</>;
};

export default ProtectedRoute;

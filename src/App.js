import Login from "./component/auth/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "./context/Auth";
import CreatePasswordModel from "./models/CreatePasswordModel";
import { Protected } from "./utils/ProtectedRoute";
import IndexDashboard from "./component/dashboard";
import { memo, useEffect } from "react";
import { isAuthenticated } from "./utils/api";
import Error from "./component/Error";

function App() {
  const navigate = useNavigate();
  const { token } = isAuthenticated();

  useEffect(() => {
    if (token) {
      // navigate("/dashboard/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route exact element={<Protected />}>
          <Route exact path="/dashboard/*" element={<IndexDashboard />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default memo(App);

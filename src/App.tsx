import "react-toastify/dist/ReactToastify.css";
import { useLogMeQuery } from "./features/auth/state/authApiSlice";
import AppRoutes from "./routes/AppRoutes";
import { useEffect, useRef } from "react";

function App() {
  const assAppRendered = useRef(false);

  useLogMeQuery(undefined, { skip: assAppRendered.current });
  useEffect(() => {
    if (!assAppRendered.current) {
      assAppRendered.current = true;
      console.log("app has been rendered! ^^");
      return;
    }
  }, []);

  return <AppRoutes />;
}

export default App;

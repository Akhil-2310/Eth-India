import "./App.css";
import { AnonAadhaarProvider } from "anon-aadhaar-react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";

const app_id = process.env.NEXT_PUBLIC_APP_ID || "";

function App() {
  return (
    <>
      <AnonAadhaarProvider _appId={app_id} _testing={false}>
        <Router>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/explore" exact element={<Explore />} />
          </Routes>
        </Router>
      </AnonAadhaarProvider>
    </>
  );
}

export default App;

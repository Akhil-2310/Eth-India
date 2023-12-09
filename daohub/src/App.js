import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/explore" exact element={<Explore/>} />
      </Routes>
    </Router>
    //<Home/>
  );
}

export default App;

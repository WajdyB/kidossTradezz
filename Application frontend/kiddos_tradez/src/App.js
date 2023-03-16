import "./App.css";
import Aboutus from "./Pages/Aboutus/Aboutus";
import Myaccount from "./Pages/Myaccount/Myaccount";
import Discover from "./Pages/Discover/Discover";
import Userinterface from "./User/Userinterface";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import NavBareElement from "./Sup Components/NavBareElement";
import Signin from "./Components/Signin/Signin";
import Forgotpassword from "./Components/Forgotpassword/Forgotpassword";
import Test from "./Test";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const excludeNavBar = location.pathname === "/discover";

  return (
    <div style={{ backgroundColor: "white" }}>
      {!excludeNavBar && <NavBareElement /> && <Test />}
      <Routes>
        <Route exact path="/" element={<Userinterface />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/myaccount" element={<Myaccount />} />
        <Route path="/myaccount/signin" element={<Signin />} />
        <Route path="/myaccount/forgotpassword" element={<Forgotpassword />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;

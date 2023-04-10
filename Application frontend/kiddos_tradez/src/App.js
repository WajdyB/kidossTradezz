import Aboutus from "./Pages/Aboutus/Aboutus";
import Myaccount from "./Pages/Myaccount/Myaccount";
import Discover from "./Pages/Discover/Discover";
import Home from "./Pages/Home/Home";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBareElement from "./Sup Components/NavBareElement";
import Signin from "./Components/Signin/Signin";
import Forgotpassword from "./Components/Forgotpassword/Forgotpassword";
import Test from "./Test/Test.js";
import Conditionsandterms from "./Components/Conditionsandterms/Conditionsandterms";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Profile from "./Pages/profile/Profile";
import opening from "./Asserts/Video/opening.mp4";
import React, { useEffect, useRef } from "react";

function App() {
  const [IsSignedUp, setIsSignedUp] = useState(
    localStorage.getItem("username") && localStorage.getItem("password")
  );

  return (
    <div>
      <BrowserRouter>
        <AppContent IsSignedUp={IsSignedUp} setIsSignedUp={setIsSignedUp} />
      </BrowserRouter>
    </div>
  );
}

function AppContent({ IsSignedUp, setIsSignedUp }) {
  console.log("_____is___", !IsSignedUp);
  const location = useLocation();
  const excludeNavBar = location.pathname === "/discover";
  const excludeNavBar2 = location.pathname === "/test";
  const excludeNavBar3 = location.pathname === "/myprofile";

  return (
    <div style={{ backgroundColor: "white" }}>
      {!excludeNavBar && !excludeNavBar2 && !excludeNavBar3 && (
        <NavBareElement />
      )}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/aboutus" element={<Aboutus />} />
        {!IsSignedUp ? (
          <Route>
            <Route
              exact
              path="/myaccount"
              element={<Myaccount setIsSignedUp={setIsSignedUp} />}
            />
            <Route
              exact
              path="/signin"
              element={<Signin setIsSignedUp={setIsSignedUp} />}
            />
            <Route exact path="/forgotpassword" element={<Forgotpassword />} />
            <Route exact path="/condition" element={<Conditionsandterms />} />
          </Route>
        ) : (
          <Route
            exact
            path="/myprofile"
            setIsSignedUp={setIsSignedUp}
            element={<Profile />}
          />
        )}
        <Route exact path="/discover" element={<Discover />} />
        <Route exact path="/test" element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;

import "./App.css";
import Aboutus from "./Pages/Aboutus/Aboutus";
import Myaccount from "./Pages/Myaccount/Myaccount";
import Discover from "./Pages/Discover/Discover";
import Userinterface from "./User/Userinterface";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBareElement from "./Sup Components/NavBareElement";
import Signin from "./Components/Signin/Signin";
import Forgotpassword from "./Components/Forgotpassword/Forgotpassword";
import Test from "./Test";

function App() {
  return (
    <div class="container">
    <p>Dear User,</p>
    <p>We have received a request to reset your password for our application. If you did not initiate this request, please ignore this email.</p>
    <p>To proceed with resetting your password, please click on the button below:</p>
    <form action="https://www.youtube.com/watch?v=WcIcVapfqXw" class="div">
    
      <button class="divbtn">Click</button>
    </form>
    <p>If the button does not work, you can also copy and paste the following URL into your browser:</p>

    <p>Thank you for using our application!</p>
    <p>The My App Team</p>
  </div>
  );
}

export default App;

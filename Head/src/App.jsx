import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import Header from "./Content/Header";
import RegisterationForm from "./Content/RegistrationForm";
import Integration from "./Content/Integration";

const App = () => (
 <div>
  <Header />
  {/* <RegisterationForm /> */}
  <Integration />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));

import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import Header from "./Content/Header";
import RegisterationForm from "./Content/RegistrationForm";

const App = () => (
 <div>
  <Header />
  <RegisterationForm />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));

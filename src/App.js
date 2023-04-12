import React from "react";
import "./App.css";
import "./css/home.css";
import "./css/bookDetail.css";
import "./css/index.css";
import "./css/login.css";
import HomeView from "./view/HomeView";
import LoginView from "./view/LoginView";
import { Route, Routes } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/*" element={<HomeView />} />
      </Routes>
    );
  }
}

export default App;

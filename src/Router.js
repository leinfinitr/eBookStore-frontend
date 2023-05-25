import React from "react";
import HomeView from "./view/HomeView";
import LoginView from "./view/LoginView";
import {Route, Routes} from "react-router-dom";

class BasicRoute extends React.Component {
    render() {
        return (
            <Routes>
                <Route path="/" element={<LoginView/>}/>
                <Route path="/*" element={<HomeView/>}/>
            </Routes>
        );
    }
}

export default BasicRoute;

import React from "react";
import {Col, Row} from "antd";
import logo from "../assets/logo.svg";
import logoFont from "../assets/logo-name.svg";
import {UserAvatar} from "./UserAvatar";

class HeaderInfo extends React.Component {
    render() {
        return (
            <div id="header">
                <div id="header-content">
                    <Row>
                        <Col xs={24} sm={24} md={5} lg={5} xl={5} xxl={4}>
                            <a id="logo" href={"/"}>
                                <img
                                    alt="logo"
                                    className="logo"
                                    src={logo}
                                    style={{height: 45}}
                                />
                                <img
                                    alt="Book Store"
                                    className="logo-font"
                                    src={logoFont}
                                    style={{height: 40}}
                                />
                            </a>
                        </Col>
                        <Col xs={0} sm={0} md={19} lg={19} xl={19} xxl={20}>
                            <UserAvatar/>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default HeaderInfo;

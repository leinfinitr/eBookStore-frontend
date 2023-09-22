import React from "react";
import {Avatar, Button, Dropdown, Menu} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {logout} from "../services/loginService";

export class UserAvatar extends React.Component {
    render() {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        const menu = (
            <Menu>
                <Menu.Item>
                    <Button onClick={() => logout(userInfo.name)}>退出登录</Button>
                </Menu.Item>
            </Menu>
        );

        return (
            <div id="avatar">
                <span className="name">欢迎您, {userInfo.nickname}</span>
                <Dropdown overlay={menu} placement="bottomRight">
                    <Avatar
                        size="small"
                        icon={<UserOutlined/>}
                        style={{cursor: "pointer"}}
                    />
                </Dropdown>
            </div>
        );
    }
}

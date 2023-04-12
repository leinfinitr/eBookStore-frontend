import React from "react";
import { Avatar, Dropdown, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";

export class UserAvatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/getUser")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          userData: data,
        });
      });
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <a href="/profile">个人信息</a>
        </Menu.Item>
        <Menu.Item>
          <a href="/">退出登录</a>
        </Menu.Item>
      </Menu>
    );

    return (
      <div id="avatar">
        <span className="name">欢迎您, {this.state.userData.nickname}</span>
        <Dropdown overlay={menu} placement="bottomRight">
          <Avatar
            size="small"
            icon={<UserOutlined />}
            style={{ cursor: "pointer" }}
          />
        </Dropdown>
      </div>
    );
  }
}

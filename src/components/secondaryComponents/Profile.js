import React from "react";
import { Descriptions, Col, Button } from "antd";
import { EditOutlined, LogoutOutlined } from "@ant-design/icons";
import { logout } from "../../services/loginService";

export class Profile extends React.Component {
  render() {
    const info = JSON.parse(localStorage.getItem("userInfo"));

    return (
      <Col>
        <Descriptions title="个人信息" bordered="true" column={1} size="middle">
          <Descriptions.Item label="昵称">{info.nickname}</Descriptions.Item>
          <Descriptions.Item label="姓名">{info.name}</Descriptions.Item>
          <Descriptions.Item label="手机">{info.phone}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{info.email}</Descriptions.Item>
          <Descriptions.Item label="国家">{info.nation}</Descriptions.Item>
          <Descriptions.Item label="省份">{info.province}</Descriptions.Item>
          <Descriptions.Item label="地址">{info.address}</Descriptions.Item>
        </Descriptions>
        <div className={"button-groups"}>
          <Button type="danger" icon={<EditOutlined />} size={"large"}>
            修改信息
          </Button>

          <Button
            type="danger"
            icon={<LogoutOutlined />}
            size={"large"}
            style={{ marginLeft: "15%" }}
            onClick={() => logout()}
            ghost
          >
            退出登录
          </Button>
        </div>
      </Col>
    );
  }
}

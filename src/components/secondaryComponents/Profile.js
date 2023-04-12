import React from "react";
import { Descriptions, Col, Button } from "antd";
import { EditOutlined, LogoutOutlined } from "@ant-design/icons";

export class Profile extends React.Component {
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
    const info = this.state.userData;

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
            ghost
          >
            <a href="/">退出登录</a>
          </Button>
        </div>
      </Col>
    );
  }
}

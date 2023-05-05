import React from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Navigate } from "react-router-dom";
import { login } from "../services/loginService";
import { getUserInfoByName } from "../services/userService";

class LoginForm extends React.Component {
  state = {
    redirectToHome: false,
  };

  handleLogin = async (values) => {
    const { username, password } = values;
    let res = await login(username, password);
    if (res) {
      await getUserInfoByName(username);
      this.setState({
        redirectToHome: true,
      });
    } else {
      message.error("用户名或密码错误");
    }
  };

  render() {
    if (this.state.redirectToHome) {
      return <Navigate to="/home" />;
    }

    return (
      <Form className="login-form" onFinish={this.handleLogin}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="用户名"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>
          <a className="login-form-forgot" href="www.baidu.com">
            忘记密码
          </a>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登录
          </Button>
          <a href="www.baidu.com">注册</a>
        </Form.Item>
      </Form>
    );
  }
}

export default LoginForm;

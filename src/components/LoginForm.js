import React, {useRef, useState} from "react";
import {Button, Checkbox, Form, Input, message, Modal} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {Navigate} from "react-router-dom";
import {login} from "../services/loginService";
import {getUserInfoByName, registerUser} from "../services/userService";

const LoginForm = () => {
    const [redirectToHome, setRedirectToHome] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const formRef = useRef(null);

    const validateMessages = {
        required: "${label}不能为空",
        types: {
            email: "${label}格式不正确",
            phone: "${label}格式不正确",
        },
        string: {
            min: "${label}不能小于${min}个字符",
        },
        whitespace: "${label}不能为空字符",
        password: {
            different: "两次输入的密码不同",
        },
    };

    const handleLogin = async (values) => {
        const {username, password} = values;
        let res = await login(username, password);
        if (res.status === 200) {
            await getUserInfoByName(username);
            setRedirectToHome(true);
        } else {
            message.error(res.message);
        }
    };

    const handleRegister = async (values) => {
        let res = await registerUser(values);
        if (res.status === 200) {
            setShowModal(false);
            message.success(`用户 ${values.username} 注册成功！`);
        } else {
            message.error(res.message);
        }
    };

    const handleModalFinish = (values) => {
        handleRegister(values);
    };

    return (
        <>
            <Form className="login-form" onFinish={handleLogin}>
                <Form.Item
                    name="username"
                    rules={[{required: true, message: "请输入用户名"}]}
                >
                    <Input
                        prefix={<UserOutlined style={{color: "rgba(0,0,0,.25)"}}/>}
                        placeholder="用户名"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {required: true, message: "请输入密码"},
                        {min: 6, message: "密码不能小于6个字符"},
                    ]}
                >
                    <Input.Password placeholder="密码"/>
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>记住密码</Checkbox>
                    </Form.Item>
                    <a
                        className="login-form-forgot"
                        onClick={() => message.info("请联系管理员")}
                    >
                        忘记密码
                    </a>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        登录
                    </Button>
                    <a
                        onClick={() => {
                            setShowModal(true);
                            if (formRef.current) formRef.current.resetFields();
                        }}
                    >
                        注册
                    </a>
                </Form.Item>
            </Form>
            <Modal
                title="请填写注册信息"
                visible={showModal}
                okText="确认注册"
                cancelText="取消"
                onCancel={() => {
                    setShowModal(false);
                }}
                onOk={() => {
                    formRef.current.submit();
                }}
                afterClose={() => {
                    formRef.current.resetFields();
                }}
            >
                <Form
                    ref={formRef}
                    className={"register-form"}
                    onFinish={handleModalFinish}
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        name="username"
                        rules={[{required: true, message: "请输入用户名"}]}
                    >
                        <Input placeholder="用户名"/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {required: true, message: "请输入密码"},
                            {min: 6, message: "密码不能小于6个字符"},
                        ]}
                    >
                        <Input.Password placeholder="密码"/>
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        dependencies={["password"]}
                        rules={[
                            {required: true, message: "请再次输入密码"},
                            ({getFieldValue}) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject("密码不一致");
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="请再次输入密码"/>
                    </Form.Item>

                    <Form.Item
                        name="nickname"
                        rules={[{required: true, message: "请输入昵称"}]}
                    >
                        <Input placeholder="昵称"/>
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: "请输入手机号码",
                            },
                            {
                                pattern: /^1[3|4|5|6|7|8][0-9]\d{8}$/,
                                message: "手机号码格式不正确",
                            },
                        ]}
                    >
                        <Input placeholder="手机号码"/>
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "请输入邮箱",
                            },
                            {
                                type: "email",
                                message: "邮箱格式不正确",
                            },
                        ]}
                    >
                        <Input placeholder="邮箱"/>
                    </Form.Item>
                    <Form.Item
                        name="nation"
                        rules={[{required: true, message: "请输入国籍"}]}
                    >
                        <Input placeholder="国籍"/>
                    </Form.Item>
                    <Form.Item
                        name="province"
                        rules={[{required: true, message: "请输入省/市"}]}
                    >
                        <Input placeholder="省份"/>
                    </Form.Item>
                    <Form.Item
                        name="address"
                        rules={[{required: true, message: "请输入详细地址"}]}
                    >
                        <Input placeholder="详细地址"/>
                    </Form.Item>
                </Form>
            </Modal>
            {redirectToHome ? <Navigate to="/home"/> : null}
        </>
    );
};

export default LoginForm;

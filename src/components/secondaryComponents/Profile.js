import React, {useState} from "react";
import {Button, Col, Descriptions, Form, Input, message, Modal} from "antd";
import {EditOutlined, LogoutOutlined} from "@ant-design/icons";
import {logout} from "../../services/loginService";

export const Profile = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const info = JSON.parse(localStorage.getItem("userInfo"));

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        let values = form.getFieldsValue();
        values.userId = JSON.parse(localStorage.getItem("userInfo")).userId;
        localStorage.setItem("userInfo", JSON.stringify(values));
        fetch("http://localhost:8080/updateUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 200) {
                    message.success("修改成功");
                    this.forceUpdate();
                } else {
                    message.error("修改失败");
                }
            });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

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
                <Button
                    type="danger"
                    icon={<EditOutlined/>}
                    size={"large"}
                    onClick={showModal}
                >
                    修改信息
                </Button>

                <Button
                    type="danger"
                    icon={<LogoutOutlined/>}
                    size={"large"}
                    style={{marginLeft: "15%"}}
                    onClick={() => logout()}
                    ghost
                >
                    退出登录
                </Button>
            </div>
            <Modal
                title="修改个人信息"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                style={{top: 15}}
                okText="确认"
                cancelText="取消"
            >
                <Form form={form} layout="vertical" initialValues={info}>
                    <Form.Item label="昵称" name="nickname">
                        <Input/>
                    </Form.Item>
                    <Form.Item label="手机" name="phone">
                        <Input/>
                    </Form.Item>
                    <Form.Item label="邮箱" name="email">
                        <Input/>
                    </Form.Item>
                    <Form.Item label="国家" name="nation">
                        <Input/>
                    </Form.Item>
                    <Form.Item label="省份" name="province">
                        <Input/>
                    </Form.Item>
                    <Form.Item label="地址" name="address">
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
        </Col>
    );
};

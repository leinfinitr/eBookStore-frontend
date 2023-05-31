import React from "react";
import {Button, Col, Layout, Table, Typography} from "antd";

const {Column} = Table;
const {Content} = Layout;
const {Title} = Typography;

export class UserManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [],
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/getAllUsers")
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    userData: data,
                })
            });
    }

    // 更改账户状态
    modifyStatus = (id, status) => {
        fetch("http://localhost:8080/modifyUserStatus?id=" + id + "&status=" + status)
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 200) {
                    alert("修改成功！");
                    window.location.reload();
                } else {
                    alert("修改失败！");
                }
            });
    }

    render() {
        const userData = this.state.userData;
        return (
            <div>
                <Content>
                    <Col>
                        <Title level={2}>用户管理</Title>
                    </Col>
                </Content>
                <Table dataSource={userData} rowKey={(record, index) => index}>

                    <Column
                        title="昵称"
                        dataIndex="nickname"
                        key="nickname"
                        align="center"
                        width="10%"
                    />
                    <Column
                        title="姓名"
                        dataIndex="name"
                        key="name"
                        align="center"
                        width="10%"
                    />
                    <Column
                        title="手机号"
                        dataIndex="phone"
                        key="phone"
                        align="center"
                        width="15%"
                    />
                    <Column
                        title="邮箱"
                        dataIndex="email"
                        key="email"
                        align="center"
                        width="15%"
                    />
                    <Column
                        title="类型"
                        dataIndex="type"
                        key="type"
                        align="center"
                        width="10%"
                    />
                    <Column
                        title="状态"
                        dataIndex="status"
                        key="status"
                        align="center"
                        width="10%"
                    />
                    <Column
                        title="操作"
                        align="center"
                        width="10%"
                        render={(record) => (
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <Button
                                    style={{width: "100%", marginBottom: "10px"}}
                                    type="primary"
                                    onClick={() => this.modifyStatus(record.userId, "禁用")}
                                >
                                    禁用
                                </Button>
                                <Button
                                    style={{width: "100%"}}
                                    type="danger"
                                    onClick={() => this.modifyStatus(record.userId, "正常")}
                                >
                                    解禁
                                </Button>
                            </div>
                        )}
                    />
                </Table>
            </div>
        );
    }
}

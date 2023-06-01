import React from "react";
import {
    BarChartOutlined,
    BookOutlined,
    FileDoneOutlined,
    SettingOutlined,
    ShoppingCartOutlined,
    UnorderedListOutlined,
    UsergroupAddOutlined,
} from "@ant-design/icons";
import {Layout, Menu} from "antd";
import {Link} from "react-router-dom";

const {Sider} = Layout;

class SideBar extends React.Component {
    render() {
        const userData = JSON.parse(localStorage.getItem("userInfo"));
        if (userData.type === "管理员") {
            return (
                <Layout>
                    <Sider width="180px">
                        <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
                            <Menu.Item key="1" icon={<BookOutlined/>}>
                                <Link to="/home">书籍管理</Link>
                            </Menu.Item>
                            <Menu.Item key="3" icon={<UnorderedListOutlined/>}>
                                <Link to="/order">订单管理</Link>
                            </Menu.Item>
                            <Menu.Item key="4" icon={<SettingOutlined/>}>
                                <Link to="/profile">个人信息</Link>
                            </Menu.Item>
                            <Menu.Item key="5" icon={<UsergroupAddOutlined/>}>
                                <Link to="/userManagement">用户管理</Link>
                            </Menu.Item>
                            <Menu.Item key="6" icon={<BarChartOutlined/>}>
                                <Link to="/OrderStatistics">数据统计</Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                </Layout>
            );
        } else {
            return (
                <Layout>
                    <Sider width="180px">
                        <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
                            <Menu.Item key="1" icon={<BookOutlined/>}>
                                <Link to="/home">主页</Link>
                            </Menu.Item>
                            <Menu.Item key="2" icon={<ShoppingCartOutlined/>}>
                                <Link to="/cart">购物车</Link>
                            </Menu.Item>
                            <Menu.Item key="3" icon={<UnorderedListOutlined/>}>
                                <Link to="/order">订单</Link>
                            </Menu.Item>
                            <Menu.Item key="4" icon={<SettingOutlined/>}>
                                <Link to="/profile">个人信息</Link>
                            </Menu.Item>
                            <Menu.Item key="5" icon={<FileDoneOutlined/>}>
                                <Link to="/orderHistory">历史订单</Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                </Layout>
            );
        }
    }
}

export default SideBar;

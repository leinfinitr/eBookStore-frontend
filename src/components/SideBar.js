import React from "react";
import {
  BookTwoTone,
  ShoppingTwoTone,
  TabletTwoTone,
  SettingTwoTone,
} from "@ant-design/icons";
import { Menu, Layout } from "antd";
import { Link } from "react-router-dom";

const { Sider } = Layout;

class SideBar extends React.Component {
  render() {
    return (
      <Layout>
        <Sider width="180px">
          <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<BookTwoTone />}>
              <Link to="/home">主页</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<ShoppingTwoTone />}>
              <Link to="/cart">购物车</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<TabletTwoTone />}>
              <Link to="/order">订单</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<SettingTwoTone />}>
              <Link to="/profile">个人信息</Link>
            </Menu.Item>
          </Menu>
        </Sider>
      </Layout>
    );
  }
}

export default SideBar;

import React from "react";
import { Layout } from "antd";
import { Typography, Col } from "antd";
import { Table, Button } from "antd";
import ColumnGroup from "antd/es/table/ColumnGroup";
import { OrderDrawer } from "./OrderDrawer";

const { Column } = Table;
const { Content } = Layout;
const { Title } = Typography;

export class Order extends React.Component {
  componentDidMount() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    fetch("http://localhost:8080/getOrdersByUserName?name=" + userInfo.name)
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("orderData", JSON.stringify(data));
        this.forceUpdate();
      });
  }

  showDrawer = (orderId) => {
    const orderItems = fetch(
      "http://localhost:8080/getOrderItemsByOrderId?orderId=" + orderId
    )
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    let orderDetailData = [];
    orderItems.then((data) => {
      for (let i = 0; i < data.length; i++) {
        fetch("http://localhost:8080/bookDetail?id=" + data[i].bookId)
          .then((res) => res.json())
          .then((json) => {
            orderDetailData.push({
              bookImage: json.image,
              bookName: json.name,
              bookPrice: json.price,
              bookNum: data[i].bookNum,
              pay: data[i].pay,
              orderTime: data[i].orderTime,
              orderStatus: data[i].orderStatus,
            });
            localStorage.setItem(
              "orderDetailData",
              JSON.stringify(orderDetailData)
            );
            localStorage.setItem("visible", true);
            this.forceUpdate();
          });
      }
    });
  };

  render() {
    const orderData = JSON.parse(localStorage.getItem("orderData"));
    return (
      <div>
        <Content>
          <Col>
            <Title>我的订单</Title>
          </Col>
        </Content>
        <Table dataSource={orderData}>
          <Column
            title="收件人"
            dataIndex="userName"
            key="userName"
            align="center"
            width="10%"
          />
          <Column
            title="电话"
            dataIndex="phone"
            key="phone"
            align="center"
            width="10%"
          />
          <Column
            title="实付款"
            dataIndex="totalPrice"
            key="totalPrice"
            align="center"
            width="10%"
            render={(totalPrice) => <span>{"¥" + totalPrice}</span>}
          />
          <ColumnGroup title="收件地址">
            <Column
              title="国家"
              dataIndex="nation"
              key="nation"
              align="center"
              width="10%"
            />
            <Column
              title="省份"
              dataIndex="province"
              key="province"
              align="center"
              width="10%"
            />
            <Column
              title="详细地址"
              dataIndex="address"
              key="address"
              align="center"
              width="30%"
            />
          </ColumnGroup>
          <Column
            title="操作"
            dataIndex="orderId"
            key="action"
            align="center"
            width="10%"
            render={(orderId) => (
              <div>
                <Button type="primary" onClick={() => this.showDrawer(orderId)}>
                  详情
                </Button>
              </div>
            )}
          />
        </Table>
        <OrderDrawer />
      </div>
    );
  }
}

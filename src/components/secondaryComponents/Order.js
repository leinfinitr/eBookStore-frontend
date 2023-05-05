import React from "react";
import { Layout } from "antd";
import { Typography, Col } from "antd";
import { Table, Button } from "antd";
import ColumnGroup from "antd/es/table/ColumnGroup";

const { Column } = Table;
const { Content } = Layout;
const { Title } = Typography;

export class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderData: [],
    };
  }

  componentDidMount() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    fetch("http://localhost:8080/getOrdersByUserName?name=" + userInfo.name)
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("orderData", JSON.stringify(data));
        this.setState({
          orderData: data,
        });
      });
  }

  render() {
    return (
      <div>
        <Content>
          <Col>
            <Title>我的订单</Title>
          </Col>
        </Content>
        <Table dataSource={this.state.orderData}>
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
            key="action"
            align="center"
            width="10%"
            render={() => (
              <div>
                <Button type="primary">详情</Button>
                <Button type="danger">退货</Button>
              </div>
            )}
          />
        </Table>
      </div>
    );
  }
}

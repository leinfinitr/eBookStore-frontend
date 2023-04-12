import React from "react";
import { Layout } from "antd";
import { Typography, Col } from "antd";
import { Table, Button } from "antd";

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
    fetch("http://localhost:8080/getOrders")
      .then((res) => res.json())
      .then((data) => {
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
          <Column title="书名" dataIndex="bookName" key="bookName" />
          <Column title="收件人" dataIndex="addressee" key="addressee" />
          <Column title="电话" dataIndex="phone" key="phone" />
          <Column
            title="实付款"
            dataIndex="pay"
            key="pay"
            render={(pay) => <span>{"¥" + pay}</span>}
          />
          <Column title="收件地址" dataIndex="address" key="address" />

          <Column
            title="操作"
            key="action"
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

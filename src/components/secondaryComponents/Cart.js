import React from "react";
import { Layout } from "antd";
import { Typography, Col } from "antd";
import { Table, Button } from "antd";

const { Column, ColumnGroup } = Table;
const { Content } = Layout;
const { Title } = Typography;

export class Cart extends React.Component {
  render() {
    const cartData = JSON.parse(localStorage.getItem("cartData"));
    return (
      <div>
        <Content>
          <Col>
            <Title>我的购物车</Title>
          </Col>
        </Content>
        <Table dataSource={cartData} rowKey={(record, index) => index}>
          <ColumnGroup title="书籍">
            <Column
              title="封面"
              dataIndex="image"
              key="image"
              align="center"
              width="10%"
              render={(image) => (
                <img src={image} alt="book cover" style={{ width: "100px" }} />
              )}
            />
            <Column
              title="名称"
              dataIndex="name"
              key="name"
              align="center"
              width="20%"
            />
            <Column
              title="作者"
              dataIndex="author"
              key="author"
              align="center"
              width="10%"
            />
            <Column
              title="类型"
              dataIndex="type"
              key="type"
              align="center"
              width="15%"
            />
          </ColumnGroup>
          <Column
            title="数量"
            align="center"
            width="5%"
            render={(record) => (
              <div>
                <Button
                  style={{
                    width: "100%",
                    marginBottom: "10px",
                  }}
                  onClick={() => this.props.handleAddAmount(record.id)}
                >
                  +
                </Button>
                <div>{record.amount}</div>
                <Button
                  style={{
                    width: "100%",
                    marginBottom: "10px",
                    marginTop: "10px",
                  }}
                  onClick={() => this.props.handleDecreaseAmount(record.id)}
                >
                  -
                </Button>
              </div>
            )}
          />
          <Column
            title="单价"
            dataIndex="price"
            key="price"
            align="center"
            width="10%"
          />
          <Column
            title="操作"
            align="center"
            width="5%"
            render={(record) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Button
                  style={{ width: "100%", marginBottom: "10px" }}
                  type="primary"
                  onClick={() => this.props.handlePurchase(record.id)}
                >
                  购买
                </Button>
                <Button
                  style={{ width: "100%" }}
                  type="danger"
                  onClick={() => this.props.handleDeleteFromCart(record.id)}
                >
                  删除
                </Button>
              </div>
            )}
          />
        </Table>
      </div>
    );
  }
}

import React from "react";
import {Button, Col, Layout, Row, Table, Typography} from "antd";

const {Column, ColumnGroup} = Table;
const {Content} = Layout;
const {Title} = Typography;

export class Cart extends React.Component {

    emptyCart = () => {
        const cartData = JSON.parse(localStorage.getItem("cartData"));
        for(let i = 0; i < cartData.length; i++) {
            this.props.handleDeleteFromCart(cartData[i].id);
        }
    }

    render() {
        const cartData = JSON.parse(localStorage.getItem("cartData"));
        return (
            <div>
                <Content>
                    <Row>
                        <Col>
                            <Title>我的购物车</Title>
                        </Col>
                        <Col>
                            <Button
                                style={{
                                    marginLeft: "80px",
                                    marginRight: "16px",
                                    marginTop: "50px",
                                    backgroundColor: "#f0f2f5",
                                    color: "#333",
                                    border: "none"
                                }}
                                onClick={() => {this.emptyCart()}}
                            >
                                清空购物车
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                style={{marginTop: "50px", backgroundColor: "#1890ff", color: "#fff", border: "none"}}
                                onClick={() => this.props.handlePurchase(0)}
                            >
                                全部下单
                            </Button>
                        </Col>
                    </Row>
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
                                <img src={image} alt="book cover" style={{width: "100px"}}/>
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
                                    style={{width: "100%", marginBottom: "10px"}}
                                    type="primary"
                                    onClick={() => this.props.handlePurchase(record.id)}
                                >
                                    购买
                                </Button>
                                <Button
                                    style={{width: "100%"}}
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

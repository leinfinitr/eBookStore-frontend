import React from "react";
import {Button, Col, DatePicker, Layout, Table, Typography} from "antd";
import ColumnGroup from "antd/es/table/ColumnGroup";
import {OrderDrawer} from "./OrderDrawer";
import {SearchBar} from "../homeComponents/SearchBar";
import locale from "antd/es/date-picker/locale/zh_CN";

const {Column} = Table;
const {Content} = Layout;
const {Title} = Typography;
const {RangePicker} = DatePicker;

export class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderItems: [], // all orderItems of user
            search: false, // whether search
            searchListData: [], // orderList after search
        };
        this.handleSearchData = this.handleSearchData.bind(this);
    }

    componentDidMount() {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo.type === "用户") {
            fetch("http://localhost:8080/getOrdersByUserName?name=" + userInfo.name)
                .then((res) => res.json())
                .then((data) => {
                    localStorage.setItem("orderData", JSON.stringify(data));
                    this.setState({
                        searchListData: data,
                    })
                    this.forceUpdate();
                });
            fetch("http://localhost:8080/getOrderItemsByUserName?name=" + userInfo.name)
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        orderItems: data,
                    });
                });
        } else {
            fetch("http://localhost:8080/getOrders")
                .then((res) => res.json())
                .then((data) => {
                    localStorage.setItem("orderData", JSON.stringify(data));
                    this.setState({
                        searchListData: data,
                    })
                    this.forceUpdate();
                });
            fetch("http://localhost:8080/getOrderItems")
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        orderItems: data,
                    });
                });
        }
    }

    // handle search data
    handleSearchData(searchData) {
        let searchOrderId = [];
        for (let i = 0; i < searchData.length; i++) {
            searchOrderId.push(searchData[i].orderId);
        }
        searchOrderId = Array.from(new Set(searchOrderId));
        let searchListData = [];
        const orderData = JSON.parse(localStorage.getItem("orderData"));
        for (let i = 0; i < orderData.length; i++) {
            for (let j = 0; j < searchOrderId.length; j++) {
                if (orderData[i].orderId === searchOrderId[j]) {
                    searchListData.push(orderData[i]);
                    break;
                }
            }
        }
        this.setState({
            searchListData: searchListData,
        })
    }

    showDrawer = (orderId) => {
        fetch("http://localhost:8080/getOrderItemsByOrderId?orderId=" + orderId)
            .then((res) => res.json())
            .then((data) => {
                localStorage.setItem("orderDetailData", JSON.stringify(data));
                localStorage.setItem("visible", true);
                this.forceUpdate();
                return data;
            });
    };

    // handle date change
    handleDateChange = (dates) => {
        if (dates && dates.length === 2) {
            const startDate = dates[0];
            const endDate = dates[1];
            const orderData = JSON.parse(localStorage.getItem("orderData"));
            const filerOrderData = orderData.filter((item) => {
                const orderDate = new Date(item.time);
                return orderDate >= startDate && orderDate <= endDate;
            });
            this.setState({
                searchListData: filerOrderData,
            });
        }
    }

    render() {
        const userType = JSON.parse(localStorage.getItem("userInfo")).type;
        const title = userType === "用户" ? "我的订单" : "所有订单";
        return (<div>
            <Content>
                <Col>
                    <Title level={2}>{title}</Title>
                </Col>
            </Content>
            <SearchBar
                data={this.state.orderItems}
                onSearchData={this.handleSearchData}
            />
            <RangePicker locale={locale} onChange={this.handleDateChange}
                         style={{"marginBottom": "20px", "marginTop": "20px"}}/>
            <Table dataSource={this.state.searchListData}>
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
                    render={(orderId) => (<div>
                        <Button type="primary" onClick={() => this.showDrawer(orderId)}>
                            详情
                        </Button>
                    </div>)}
                />
            </Table>
            <OrderDrawer/>
        </div>);
    }
}

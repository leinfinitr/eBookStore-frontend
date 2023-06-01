import React, {useEffect, useState} from "react";
import {Col, DatePicker, Layout, Row, Table, Typography} from "antd";
import locale from 'antd/es/date-picker/locale/zh_CN';

const {Column} = Table;
const {Content} = Layout;
const {Title} = Typography;
const {RangePicker} = DatePicker;

export const OrderStatistics = () => {
    const [orderItems, setOrderItems] = useState([]);
    const [orderLists, setOrderLists] = useState([]);
    const [selectedStartDateItems, setSelectedStartDateItems] = useState(null);
    const [selectedEndDateItems, setSelectedEndDateItems] = useState(null);
    const [selectedStartDateLists, setSelectedStartDateLists] = useState(null);
    const [selectedEndDateLists, setSelectedEndDateLists] = useState(null);

    useEffect(() => {
        fetchOrderItems();
        fetchOrderLists();
    }, []);

    const fetchOrderItems = async () => {
        const res = await fetch("http://localhost:8080/getOrderItems");
        const data = await res.json();
        setOrderItems(data);
    };

    const fetchOrderLists = async () => {
        const res = await fetch("http://localhost:8080/getOrders");
        const data = await res.json();
        setOrderLists(data);
    }

    const filterOrderItemsByDate = () => {
        let filteredItems = [];
        if (selectedStartDateItems && selectedEndDateItems) {
            filteredItems = orderItems.filter(item => {
                const orderDate = new Date(item.time);
                return orderDate >= selectedStartDateItems && orderDate <= selectedEndDateItems;
            });
        } else {
            filteredItems = orderItems;
        }

        const mergedOrderItems = {};
        filteredItems.forEach(item => {
            if (item.name in mergedOrderItems) {
                mergedOrderItems[item.name].num += item.num;
                const pay = mergedOrderItems[item.name].pay + item.pay;
                mergedOrderItems[item.name].pay = parseFloat(pay.toFixed(2));
            } else {
                mergedOrderItems[item.name] = {name: item.name, num: item.num, pay: item.pay};
            }
        });

        // 将 mergedOrderItems 按照 num 降序排列
        const mergedOrderItemsArray = Object.values(mergedOrderItems);
        mergedOrderItemsArray.sort((a, b) => {
            return b.num - a.num;
        });

        return mergedOrderItemsArray;
    };

    const filterOrderListsByDate = () => {
        let filteredLists = [];
        if (selectedStartDateLists && selectedEndDateLists) {
            filteredLists = orderLists.filter(list => {
                const orderDate = new Date(list.time);
                return orderDate >= selectedStartDateLists && orderDate <= selectedEndDateLists;
            });
        } else {
            filteredLists = orderLists;
        }

        const mergedOrderLists = {};
        filteredLists.forEach(item => {
            if (item.userName in mergedOrderLists) {
                const totalPrice = mergedOrderLists[item.userName].totalPrice + item.totalPrice;
                mergedOrderLists[item.userName].totalPrice = parseFloat(totalPrice.toFixed(2));
            } else {
                mergedOrderLists[item.userName] = {userName: item.userName, totalPrice: item.totalPrice};
            }
        });

        // 将 filteredLists 按照 totalPrice 降序排列
        const mergedOrderListsArray = Object.values(mergedOrderLists);
        mergedOrderListsArray.sort((a, b) => {
            return b.totalPrice - a.totalPrice;
        });

        return mergedOrderListsArray;
    }

    const handleDateChangeItem = (dates) => {
        if (dates && dates.length === 2) {
            setSelectedStartDateItems(dates[0]);
            setSelectedEndDateItems(dates[1]);
        }
    };

    const handleDateChangeList = (dates) => {
        if (dates && dates.length === 2) {
            setSelectedStartDateLists(dates[0]);
            setSelectedEndDateLists(dates[1]);
        }
    }

    return (
        <div>
            <Content>
                <Col>
                    <Title level={2}>数据统计</Title>
                    <Row>
                        <Col span={12}>
                            <Title level={3}>热销榜</Title>
                            <RangePicker locale={locale} onChange={handleDateChangeItem}
                                         style={{"marginBottom": "20px", "marginTop": "20px"}}/>
                            <Table dataSource={filterOrderItemsByDate()}>
                                <Column title="书名" dataIndex="name" key="name"/>
                                <Column
                                    title="销量"
                                    dataIndex="num"
                                    key="num"
                                />
                                <Column title="销售额" dataIndex="pay" key="pay"/>
                            </Table>
                        </Col>
                        <Col span={12}>
                            <Title level={3}>消费榜</Title>
                            <RangePicker locale={locale} onChange={handleDateChangeList}
                                         style={{"marginBottom": "20px", "marginTop": "20px"}}/>
                            <Table dataSource={filterOrderListsByDate()}>
                                <Column title="用户名" dataIndex="userName" key="userName"/>
                                <Column
                                    title="总消费"
                                    dataIndex="totalPrice"
                                    key="totalPrice"
                                />
                            </Table>
                        </Col>
                    </Row>

                </Col>
            </Content>
        </div>
    );
};

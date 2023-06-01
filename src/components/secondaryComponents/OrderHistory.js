import React, {useEffect, useState} from "react";
import {Col, DatePicker, Layout, Table, Typography} from "antd";
import locale from 'antd/es/date-picker/locale/zh_CN';

const {Column} = Table;
const {Content} = Layout;
const {Title} = Typography;
const {RangePicker} = DatePicker;

export const OrderHistory = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const [orderItems, setOrderItems] = useState([]);
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    useEffect(() => {
        fetchOrderItems();
    }, []);

    const fetchOrderItems = async () => {
        const res = await fetch("http://localhost:8080/getOrderItemsByUserName?name=" + userInfo.name);
        const data = await res.json();
        setOrderItems(data);
    };

    const filterOrderItemsByDate = () => {
        let filteredItems = [];
        if (selectedStartDate && selectedEndDate) {
            filteredItems = orderItems.filter(item => {
                const orderDate = new Date(item.time);
                return orderDate >= selectedStartDate && orderDate <= selectedEndDate;
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

        return Object.values(mergedOrderItems);
    };

    const getTotalCount = () => {
        const filteredItems = filterOrderItemsByDate();
        return filteredItems.reduce((total, item) => {
            return total + item.num;
        }, 0);
    };

    const getTotalPrice = () => {
        const filteredItems = filterOrderItemsByDate();
        const totalPrice = filteredItems.reduce((total, item) => {
            return total + item.pay;
        }, 0);
        return totalPrice.toFixed(2); // 限制小数点后的位数为两位
    };

    const handleDateChange = (dates) => {
        if (dates && dates.length === 2) {
            setSelectedStartDate(dates[0]);
            setSelectedEndDate(dates[1]);
        }
    };

    return (
        <div>
            <Content>
                <Col>
                    <Title level={2}>历史订单</Title>
                    <RangePicker locale={locale} onChange={handleDateChange}
                                 style={{"marginBottom": "20px", "marginTop": "20px"}}/>
                    {orderItems.length > 0 ? (
                        <>
                            <p>购书总数量：{getTotalCount()}</p>
                            <p>总金额：{getTotalPrice()}</p>
                        </>
                    ) : (
                        <p>无订单数据</p>
                    )}
                    <Table dataSource={filterOrderItemsByDate()}>
                        <Column title="书名" dataIndex="name" key="name"/>
                        <Column
                            title="购买数量"
                            dataIndex="num"
                            key="num"
                        />
                        <Column title="总金额" dataIndex="pay" key="pay"/>
                    </Table>
                </Col>
            </Content>
        </div>
    );
};

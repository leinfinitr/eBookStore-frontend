import React from "react";
import {Avatar, Button, Drawer, List} from "antd";
import moment from "moment";

export class OrderDrawer extends React.Component {
    onClose() {
        localStorage.setItem("visible", false);
        this.forceUpdate();
    }

    render() {
        const orderDetailData = JSON.parse(localStorage.getItem("orderDetailData"));
        return (
            <div>
                <Drawer
                    title="订单详情"
                    placement="bottom"
                    closable={true}
                    visible={JSON.parse(localStorage.getItem("visible"))}
                    onClose={() => this.onClose()}
                    modalStyle={null}
                >
                    <List
                        itemLayout="horizontal"
                        dataSource={orderDetailData}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.image} size={64}/>}
                                    title={item.name}
                                />
                                <List.Item.Meta title={`数量：${item.num}`}/>
                                <List.Item.Meta title={`单价：${item.price}`}/>
                                <List.Item.Meta title={`实付款：${item.pay}`}/>
                                <List.Item.Meta
                                    title={`下单时间：${moment(item.time).format(
                                        "YYYY-MM-DD HH:mm:ss"
                                    )}`}
                                />
                                <List.Item.Meta title={`订单状态：${item.status}`}/>
                                <Button type="primary" onClick={() => this.onClose()}>
                                    退货
                                </Button>
                            </List.Item>
                        )}
                    />
                </Drawer>
            </div>
        );
    }
}

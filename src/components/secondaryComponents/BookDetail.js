import React from "react";
import { Descriptions, Button } from "antd";
import { ShoppingCartOutlined, PayCircleOutlined } from "@ant-design/icons";
import { Col } from "antd";

export class BookDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      bookID: 0,
      bookInfo: {},
    };
  }

  componentDidMount() {
    const s = decodeURI(window.location.search); // 获取 url ?id=x 数据(?id=0)
    const id = s.split("=")[1];
    setTimeout(() => {
      this.getBookInfo(id);
      this.setState({ bookID: id });
    }, 0);
  }

  // 从后端获取书籍信息
  getBookInfo = (id) => {
    fetch("http://localhost:8080/bookDetail?id=" + id)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ bookInfo: data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const info = this.state.bookInfo;

    return (
      <Col>
        <div className={"content"}>
          <div className={"book-detail"}>
            <div className={"book-image"}>
              <img
                alt="book"
                src={info.image}
                style={{ width: "350px", height: "350px" }}
              />
            </div>
            <div className={"descriptions"}>
              <Descriptions>
                <Descriptions.Item className={"title"} span={3}>
                  {info.name}
                </Descriptions.Item>
                <Descriptions.Item label={"作者"} span={3}>
                  {info.author}
                </Descriptions.Item>
                <Descriptions.Item label={"分类"} span={3}>
                  {info.type}
                </Descriptions.Item>
                <Descriptions.Item label={"定价"} span={3}>
                  {<span className={"price"}>{"¥" + info.price}</span>}
                </Descriptions.Item>
                <Descriptions.Item label={"状态 "} span={3}>
                  {info.inventory !== 0 ? (
                    <span>
                      有货{" "}
                      <span className={"inventory"}>
                        库存{info.inventory}件
                      </span>
                    </span>
                  ) : (
                    <span className={"status"}>无货</span>
                  )}
                </Descriptions.Item>
                <Descriptions.Item label={"作品简介"} span={3}>
                  {info.description}
                </Descriptions.Item>
              </Descriptions>
            </div>
          </div>
          <div className={"button-groups"}>
            <Button
              type="danger"
              icon={<ShoppingCartOutlined />}
              size={"large"}
              onClick={() => this.props.handleAddToCart(info.id)}
            >
              加入购物车
            </Button>

            <Button
              type="danger"
              icon={<PayCircleOutlined />}
              size={"large"}
              style={{ marginLeft: "15%" }}
              ghost
            >
              立即购买
            </Button>
          </div>
        </div>
      </Col>
    );
  }
}

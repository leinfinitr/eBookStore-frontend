import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";

const { Meta } = Card;

class Book extends React.Component {
  render() {
    const { info } = this.props;

    return (
      <Link
        to={{
          pathname: "/bookDetail",
          search: "?id=" + info.id,
        }}
      >
        <Card
          hoverable
          style={{ width: 181 }}
          cover={<img alt="book" src={info.image} className={"bookImg"} />}
        >
          <Meta title={info.name} description={"¥" + info.price} />
        </Card>
      </Link>
    );
  }
}

export default Book;

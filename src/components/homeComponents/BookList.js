import React from "react";
import { List } from "antd";
import Book from "./Book";

class BookList extends React.Component {
  render() {
    return (
      <List
        grid={{ gutter: 10, column: 4 }}
        dataSource={this.props.data}
        pagination={{
          pageSize: 16,
        }}
        renderItem={(item) => (
          <List.Item>
            <Book info={item} />
          </List.Item>
        )}
      />
    );
  }
}

export default BookList;

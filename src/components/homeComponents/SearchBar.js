import React from "react";
import { Button, Input, Form } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      search: false,
      searchData: [],
      input: [],
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchData = this.handleSearchData.bind(this);
  }

  handleSearch(e) {
    this.props.onSearch(e);
  }
  handleSearchData(e) {
    this.props.onSearchData(e);
  }

  // 将检索到的结果存入 searchData, 并将 search 置为 true
  // 如果输入的数据为空，则将 search 置为 false, 重置 searchData
  search = () => {
    // 若搜索栏为空，则重置所有数据后直接返回
    if (Array.prototype.isPrototypeOf(this.state.input)) {
      this.handleSearchData([]);
      this.setState({ searchData: [], search: false, input: [] });
      this.handleSearch(false);
      return;
    }

    // 若搜索栏不为空，则重置之前的检索数据后进行新的搜索
    this.handleSearchData([]);
    this.setState({ searchData: [] });

    this.props.data.map((item) => {
      if (item.name.indexOf(this.state.input) !== -1) {
        this.state.searchData.push(item);
      }
    });
    this.handleSearchData(this.state.searchData);
    this.handleSearch(true);
    this.setState({ search: true });
  };

  // 从 Input 获取输入的内容
  getInput = (event) => {
    this.setState({ input: event.target.value });
  };

  render() {
    return (
      <div className="global-search-wrapper">
        <Form
          className="global-search"
          size="large"
          style={{ width: "100%" }}
          optionLabelProp="text"
        >
          <Input
            id="q"
            placeholder="输入书籍名称以在商城中搜索"
            name="q"
            onChange={(event) => this.getInput(event)}
            suffix={
              <Button
                className="search-btn"
                style={{ marginRight: -12 }}
                size="large"
                type="primary"
                onClick={this.search}
              >
                <SearchOutlined />
              </Button>
            }
            onPressEnter={this.search}
          />
        </Form>
      </div>
    );
  }
}

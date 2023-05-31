import React from "react";
import {Button, Form, Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";

export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            searchData: this.props.data,
            input: [],
        };
        this.handleSearchData = this.handleSearchData.bind(this);
    }

    handleSearchData(e) {
        this.props.onSearchData(e);
    }

    search = () => {
        // 重置之前的检索数据后进行新的搜索
        this.handleSearchData([]);
        this.setState({searchData: []});

        // 根据 name 进行搜索
        this.props.data.map((item) => {
            if (item.name.indexOf(this.state.input) !== -1) {
                this.state.searchData.push(item);
            }
        });
        this.handleSearchData(this.state.searchData);
    };

    // 从 Input 获取输入的内容
    getInput = (event) => {
        this.setState({input: event.target.value});
    };

    render() {
        return (
            <div className="global-search-wrapper">
                <Form
                    className="global-search"
                    size="large"
                    style={{width: "100%"}}
                    optionLabelProp="text"
                >
                    <Input
                        id="q"
                        placeholder="输入书籍名称进行搜索"
                        name="q"
                        onChange={(event) => this.getInput(event)}
                        suffix={
                            <Button
                                className="search-btn"
                                style={{marginRight: -12}}
                                size="large"
                                type="primary"
                                onClick={this.search}
                            >
                                <SearchOutlined/>
                            </Button>
                        }
                        onPressEnter={this.search}
                    />
                </Form>
            </div>
        );
    }
}

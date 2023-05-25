import React from "react";
import {Layout} from "antd";
import BookList from "./BookList";
import {SearchBar} from "./SearchBar";
import {BookCarousel} from "./BookCarousel";

const {Content} = Layout;

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookData: [],
            search: false,
            searchData: [],
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSearchData = this.handleSearchData.bind(this);
    }

    componentDidMount = () => {
        fetch("http://localhost:8080/books")
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    bookData: data,
                });
            });
    };

    handleSearch(search) {
        this.setState(() => ({search: search}));
    }

    handleSearchData(searchData) {
        this.setState(() => ({searchData: searchData}));
    }

    render() {
        return (
            <div>
                <Content>
                    <SearchBar
                        data={this.state.bookData}
                        onSearch={this.handleSearch}
                        onSearchData={this.handleSearchData}
                    />
                    <BookCarousel/>
                    <BookList
                        data={
                            this.state.search === true
                                ? this.state.searchData
                                : this.state.bookData
                        }
                    />
                </Content>
            </div>
        );
    }
}

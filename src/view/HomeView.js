import React from "react";
import { Layout, message } from "antd";
import SideBar from "../components/SideBar";
import HeaderInfo from "../components/HeaderInfo";
import { Route, Routes } from "react-router-dom";
import { Home } from "../components/homeComponents/Home";
import { Cart } from "../components/secondaryComponents/Cart";
import { Order } from "../components/secondaryComponents/Order";
import { Profile } from "../components/secondaryComponents/Profile";
import { BookDetail } from "../components/secondaryComponents/BookDetail";

const { Header, Sider, Footer, Content } = Layout;

class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      bookData: [],
      cartData: [],
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handlePurchase = this.handlePurchase.bind(this);
    this.handleDeleteFromCart = this.handleDeleteFromCart.bind(this);
    this.handleAddAmount = this.handleAddAmount.bind(this);
    this.handleDecreaseAmount = this.handleDecreaseAmount.bind(this);
  }

  componentDidMount = () => {
    fetch("http://localhost:8080/books")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          bookData: data,
        });
      });
    fetch("http://localhost:8080/getUser")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          userData: data,
        });
      });
  };

  // 点击书籍详情页中的加入购物车按钮
  // 根据书籍id从bookData中获取书籍信息，并且添加到购物车
  handleAddToCart = (id) => {
    const book = this.state.bookData.find((book) => book.id === id);
    const cart = this.state.cartData.find((cart) => cart.name === book.name);
    if (cart) {
      cart.amount++;
    } else {
      let cartData = this.state.cartData;
      cartData.push({
        id: book.id,
        isbn: book.isbn,
        name: book.name,
        type: book.type,
        author: book.author,
        price: book.price,
        amount: 1,
        image: book.image,
      });
      this.setState({
        cartData: cartData,
      });
    }
    message.success("添加成功");
  };

  // 点击购物车中的购买按钮
  // 根据购物车中的书籍信息，向后端发送请求，生成订单
  handlePurchase = (id) => {
    // 根据id获取购物车中的书籍信息
    const dataIndex = this.state.cartData.findIndex((cart) => cart.id === id);
    const cartBuy = this.state.cartData[dataIndex];
    console.log(cartBuy);
    // 根据amount和price计算总价
    const pay = cartBuy.amount * cartBuy.price;
    const order = {
      id: "0", // 后端会自动生成订单id
      bookName: cartBuy.name,
      addresses: this.state.userData.addresses,
      phone: this.state.userData.phone,
      pay: pay,
      address:
        this.state.userData.nation +
        " " +
        this.state.userData.province +
        " " +
        this.state.userData.address,
    };
    fetch("http://localhost:8080/buy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          message.success("购买成功");
          let cartData = this.state.cartData;
          cartData = cartData.filter((cart) => cartBuy.id !== cart.id);
          this.setState({
            cartData: cartData,
          });
        } else {
          message.error("购买失败");
        }
      });
  };

  // 点击购物车中的删除按钮
  // 根据书籍id从购物车中删除书籍
  handleDeleteFromCart = (id) => {
    console.log(id);
    const cart = this.state.cartData.find((cart) => cart.id === id);
    if (cart) {
      let cartData = this.state.cartData;
      cartData = cartData.filter((cart) => cart.id !== id);
      this.setState({
        cartData: cartData,
      });
    }
    this.forceUpdate();
  };

  // 点击购物车中的添加按钮，书籍数量加一
  handleAddAmount = (id) => {
    const cart = this.state.cartData.find((cart) => cart.id === id);
    if (cart) {
      cart.amount++;
    }
    this.forceUpdate();
  };

  // 点击购物车中的减少按钮，书籍数量减一
  handleDecreaseAmount = (id) => {
    const cart = this.state.cartData.find((cart) => cart.id === id);
    if (cart) {
      cart.amount--;
      if (cart.amount === 0) {
        let cartData = this.state.cartData;
        cartData = cartData.filter((cart) => cart.id !== id);
        this.setState({
          cartData: cartData,
        });
      }
    }
    this.forceUpdate();
  };

  render() {
    return (
      <Layout>
        <Header>
          <HeaderInfo />
        </Header>
        <Layout>
          <Sider width={200}>
            <SideBar />
          </Sider>
          <Content>
            <div style={{ padding: 24, minHeight: 360 }}>
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route
                  path="/cart"
                  element={
                    <Cart
                      cartData={this.state.cartData}
                      handleAddAmount={this.handleAddAmount}
                      handleDecreaseAmount={this.handleDecreaseAmount}
                      handlePurchase={this.handlePurchase}
                      handleDeleteFromCart={this.handleDeleteFromCart}
                    />
                  }
                />
                <Route path="/order" element={<Order />} />
                <Route path="/profile" element={<Profile />} />
                <Route
                  path="/bookDetail"
                  element={
                    <BookDetail handleAddToCart={this.handleAddToCart} />
                  }
                />
              </Routes>
            </div>
          </Content>
        </Layout>
        <Footer style={{ textAlign: "center" }}>
          Online book store ©2023 Created by Leinfinitr
        </Footer>
      </Layout>
    );
  }
}

export default HomeView;

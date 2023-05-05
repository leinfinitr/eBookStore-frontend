import React from "react";
import { Layout, message } from "antd";
import { Navigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import HeaderInfo from "../components/HeaderInfo";
import { Route, Routes } from "react-router-dom";
import { Home } from "../components/homeComponents/Home";
import { Cart } from "../components/secondaryComponents/Cart";
import { Order } from "../components/secondaryComponents/Order";
import { Profile } from "../components/secondaryComponents/Profile";
import { BookDetail } from "../components/secondaryComponents/BookDetail";
import * as cartService from "../services/cartService";

const { Header, Sider, Content } = Layout;

class HomeView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {},
      bookData: [],
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handlePurchase = this.handlePurchase.bind(this);
    this.handleDeleteFromCart = this.handleDeleteFromCart.bind(this);
    this.handleAddAmount = this.handleAddAmount.bind(this);
    this.handleDecreaseAmount = this.handleDecreaseAmount.bind(this);
  }

  componentDidMount = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.setState({
      userData: userInfo,
    });
    fetch("http://localhost:8080/books")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          bookData: data,
        });
      });
    const cart = fetch(
      "http://localhost:8080/getCartByUserId?userId=" + userInfo.userId
    )
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    let cartData = [];
    cart.then((data) => {
      for (let i = 0; i < data.length; i++) {
        fetch("http://localhost:8080/bookDetail?id=" + data[i].bookId)
          .then((res) => res.json())
          .then((json) => {
            cartData.push({
              id: json.id,
              isbn: json.isbn,
              name: json.name,
              type: json.type,
              author: json.author,
              price: json.price,
              amount: data[i].bookNum,
              image: json.image,
            });
            localStorage.setItem("cartData", JSON.stringify(cartData));
          });
      }
    });
  };

  // 点击书籍详情页中的加入购物车按钮
  // 根据书籍id从bookData中获取书籍信息，并且添加到购物车
  handleAddToCart = (id) => {
    const book = this.state.bookData.find((book) => book.id === id);
    const cartData = JSON.parse(localStorage.getItem("cartData"));
    const cart = cartData.find((cart) => cart.name === book.name);
    if (cart) {
      cartData[cartData.indexOf(cart)].amount += 1;
      cartService.modifyCart({
        userId: this.state.userData.userId,
        bookId: book.id,
        bookNum: cartData[cartData.indexOf(cart)].amount,
      });
    } else {
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
      cartService.addCart({
        userId: this.state.userData.userId,
        bookId: book.id,
        bookNum: 1,
      });
    }
    localStorage.setItem("cartData", JSON.stringify(cartData));
    message.success("添加成功");
  };

  // 点击购物车中的购买按钮
  // 根据购物车中的书籍信息，向后端发送请求，生成订单
  handlePurchase = (id) => {
    const cartData = JSON.parse(localStorage.getItem("cartData"));
    // 根据id获取购物车中的书籍信息
    const dataIndex = cartData.findIndex((cart) => cart.id === id);
    const cartBuy = cartData[dataIndex];
    // 根据amount和price计算总价
    const pay = cartBuy.amount * cartBuy.price;
    const orderItem = {
      bookId: cartBuy.id,
      bookNum: cartBuy.amount,
      pay: pay,
      orderTime: new Date(),
      orderStatus: "待发货",
    };
    let orderList = [];
    orderList.push(orderItem);
    const order = {
      userId: this.state.userData.userId,
      totalPrice: pay,
      orderlist: orderList,
    };
    localStorage.setItem("order", JSON.stringify(order));
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
          const modifyCartData = cartData.filter(
            (cart) => cartBuy.id !== cart.id
          );
          this.handleDeleteFromCart(id);
          localStorage.setItem("cartData", JSON.stringify(modifyCartData));
          this.forceUpdate();
        } else {
          message.error("购买失败");
        }
      });
  };

  // 点击购物车中的删除按钮
  // 根据书籍id从购物车中删除书籍
  handleDeleteFromCart = (id) => {
    const cartData = JSON.parse(localStorage.getItem("cartData"));
    const cart = cartData.find((cart) => cart.id === id);
    if (cart) {
      cartData.splice(cartData.indexOf(cart), 1);
      cartService.deleteCart({
        userId: this.state.userData.userId,
        bookId: cart.id,
      });
      localStorage.setItem("cartData", JSON.stringify(cartData));
      this.forceUpdate();
    }
  };

  // 点击购物车中的添加按钮，书籍数量加一
  handleAddAmount = (id) => {
    const cartData = JSON.parse(localStorage.getItem("cartData"));
    const cart = cartData.find((cart) => cart.id === id);
    if (cart) {
      cartService.modifyCart({
        userId: this.state.userData.userId,
        bookId: cart.id,
        bookNum: cart.amount + 1,
      });
      cartData[cartData.indexOf(cart)].amount += 1;
      localStorage.setItem("cartData", JSON.stringify(cartData));
      this.forceUpdate();
    }
  };

  // 点击购物车中的减少按钮，书籍数量减一
  handleDecreaseAmount = (id) => {
    const cartData = JSON.parse(localStorage.getItem("cartData"));
    const cart = cartData.find((cart) => cart.id === id);
    if (cart) {
      const amount = cart.amount - 1;
      if (amount === 0) {
        this.handleDeleteFromCart(id);
        return;
      }
      cartService.modifyCart({
        userId: this.state.userData.userId,
        bookId: cart.id,
        bookNum: amount,
      });
      cartData[cartData.indexOf(cart)].amount -= 1;
      localStorage.setItem("cartData", JSON.stringify(cartData));
      this.forceUpdate();
    }
  };

  render() {
    let isLogin = localStorage.getItem("isLogin");
    if (isLogin === false) {
      return <Navigate to="/" />;
    }

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
      </Layout>
    );
  }
}

export default HomeView;

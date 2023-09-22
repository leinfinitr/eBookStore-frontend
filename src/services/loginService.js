import {message} from "antd";

// 通过向后端发送用户名和密码，判定是否登录成功
export async function login(username, password) {
    return fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
        credentials: "include",
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.status === 200) {
                localStorage.setItem("isLogin", true);
                return data;
            } else {
                return data;
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

// 退出登录
export async function logout(username) {
    localStorage.setItem("isLogin", false);
    localStorage.setItem("userInfo", null);
    localStorage.setItem("cartData", null);
    localStorage.setItem("order", null);
    localStorage.setItem("orderDetailData", null);
    localStorage.setItem("orderData", null);
    // 重定位到首页
    window.location.href = "/";
    // 得到本次登录时长并显示
    let res = await fetch("http://localhost:8080/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
        }),
        credentials: "include",
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
    message.info(`本次登录时长为 ${res.time} 秒`);
}

// 注册用户
export function registerUser(values) {
    return fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

// 通过用户名从后端获取用户信息
export async function getUserInfoByName(name) {
    await fetch("http://localhost:8080/getUserByUserName?name=" + name)
        .then((res) => res.json())
        .then((data) => {
            localStorage.setItem("userInfo", JSON.stringify(data));
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

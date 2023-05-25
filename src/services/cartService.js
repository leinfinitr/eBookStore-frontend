// 修改 cart 中已有的信息
export async function modifyCart(cart) {
    await fetch("http://localhost:8080/modifyCart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

// 删除 cart 中已有的信息
export async function deleteCart(cart) {
    await fetch("http://localhost:8080/deleteCart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

//向 cart 中添加信息
export async function addCart(cart) {
    await fetch("http://localhost:8080/addCart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

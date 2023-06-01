import React, {useEffect, useRef, useState} from "react";
import {Button, Col, Descriptions, Form, Input, message, Modal} from "antd";
import {ShoppingCartOutlined} from "@ant-design/icons";

export const BookDetail = (props) => {
    const [bookInfo, setBookInfo] = useState({});
    const [form] = Form.useForm();
    const [addForm] = Form.useForm();
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
    const userType = userInfo.type;
    const formRef = useRef(null);
    const addFormRef = useRef(null);

    useEffect(() => {
        const s = decodeURI(window.location.search); // 获取 url ?id=x 数据(?id=0)
        const id = s.split("=")[1];
        getBookInfo(id);
    }, []);

    // 从后端获取书籍信息
    const getBookInfo = (id) => {
        fetch("http://localhost:8080/bookDetail?id=" + id)
            .then((res) => res.json())
            .then((data) => {
                setBookInfo(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const updateBook = (values) => {
        fetch("http://localhost:8080/updateBook", {
            method: "POST", headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify(values),
        })
            .then((res) => {
                if (res.status === 200) {
                    setShowModal(false);
                    message.success("修改成功");
                    window.location.reload();
                } else {
                    message.error("修改失败");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const addBook = (values) => {
        fetch("http://localhost:8080/addBook", {
            method: "POST", headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify(values),
        })
            .then((res) => {
                if (res.status === 200) {
                    setShowAddModal(false);
                    message.success("添加成功");
                    window.location.reload();
                } else {
                    message.error("添加失败");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (<Col>
        <div className={"content"}>
            <div className={"book-detail"}>
                <div className={"book-image"}>
                    <img alt="book" src={bookInfo.image} style={{width: "350px", height: "350px"}}/>
                </div>
                <div className={"descriptions"}>
                    <Descriptions>
                        <Descriptions.Item className={"title"} span={3}>
                            {bookInfo.name}
                        </Descriptions.Item>
                        <Descriptions.Item label={"ISBN"} span={3}>
                            {bookInfo.isbn}
                        </Descriptions.Item>
                        <Descriptions.Item label={"作者"} span={3}>
                            {bookInfo.author}
                        </Descriptions.Item>
                        <Descriptions.Item label={"分类"} span={3}>
                            {bookInfo.type}
                        </Descriptions.Item>
                        <Descriptions.Item label={"定价"} span={3}>
                            {<span className={"price"}>{"¥" + bookInfo.price}</span>}
                        </Descriptions.Item>
                        <Descriptions.Item label={"状态 "} span={3}>
                            {bookInfo.inventory !== 0 ? (<span>有货{" "}<span
                                className={"inventory"}>库存{bookInfo.inventory}件</span></span>) : (
                                <span className={"status"}>无货</span>)}
                        </Descriptions.Item>
                        <Descriptions.Item label={"作品简介"} span={3}>
                            {bookInfo.description}
                        </Descriptions.Item>
                    </Descriptions>
                </div>
            </div>
            <div className={"button-groups"}>
                {userType === "管理员" ? (<Button
                    type="primary"
                    onClick={() => {
                        const {id, isbn, name, author, type, price, inventory, description, image} = bookInfo;
                        const fieldsValue = {
                            id,
                            isbn,
                            name,
                            author,
                            type,
                            price: price.toString(),
                            inventory: inventory.toString(),
                            description,
                            image,
                        };
                        form.setFieldsValue(fieldsValue);
                        setShowModal(true);
                    }}
                    style={{marginRight: "20px"}}
                >
                    更改书籍信息
                </Button>) : (<Button
                    type="danger"
                    icon={<ShoppingCartOutlined/>}
                    size={"large"}
                    onClick={() => props.handleAddToCart(bookInfo.id)}
                    style={{marginRight: "20px"}}
                >
                    加入购物车
                </Button>)}
                {userType === "管理员" && (<>
                    <Button
                        type="primary"
                        onClick={() => {
                            Modal.confirm({
                                title: "确认删除", content: (<div>
                                    确认删除<strong>{bookInfo.name}</strong>?
                                </div>), onOk() {
                                    fetch("http://localhost:8080/deleteBook", {
                                        method: "POST", headers: {
                                            "Content-Type": "application/json",
                                        }, body: JSON.stringify({id: bookInfo.id}),
                                    })
                                        .then((res) => {
                                            if (res.status === 200) {
                                                // 若删除成功，重定位到 /home;
                                                window.location.href = "/home";
                                            }
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                        });
                                }, onCancel() {
                                    console.log("cancel");
                                }, okText: "确认删除", cancelText: "取消",
                            });
                        }}
                        danger
                    >
                        删除书籍
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => {
                            setShowAddModal(true);
                        }}
                        style={{marginLeft: "20px"}}
                    >
                        添加书籍
                    </Button>
                </>)}
            </div>
            <Modal
                title="更改书籍信息"
                visible={showModal}
                okText="确认更改"
                cancelText="取消"
                style={{top: "20px"}}
                onOk={() => {
                    formRef.current.submit();
                }}
                onCancel={() => {
                    setShowModal(false);
                }}
                afterClose={() => {
                    formRef.current.resetFields();
                }}
            >
                <Form form={form} name="updateBookForm" onFinish={updateBook}
                      ref={formRef}
                      validateMessages={{required: "请输入 ${label}!"}}>
                    <Form.Item label="书籍ID" name="id">
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item label="书籍ISBN" name="isbn"
                               rules={[{required: true, message: "请输入书籍ISBN!"}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="书籍名称" name="name"
                               rules={[{required: true, message: "请输入书籍名称!"}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="作者" name="author"
                               rules={[{required: true, message: "请输入作者!"}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="分类" name="type"
                               rules={[{required: true, message: "请输入分类!"}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="定价" name="price"
                               rules={[{required: true, message: "请输入定价!"}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="库存" name="inventory"
                               rules={[{required: true, message: "请输入库存数量!"}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="作品简介"
                        name="description"
                        rules={[{required: true, message: "请输入作品简介!"}]}
                    >
                        <Input.TextArea rows={4}/>
                    </Form.Item>
                    <Form.Item label="封面图片" name="image"
                               rules={[{required: true, message: "请输入图片链接!"}]}>
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="添加书籍"
                visible={showAddModal}
                okText="确认添加"
                cancelText="取消"
                style={{top: "20px"}}
                onOk={() => {
                    addFormRef.current.submit();
                }}
                onCancel={() => {
                    setShowAddModal(false);
                }}
                afterClose={() => {
                    addFormRef.current.resetFields();
                }}
            >
                <Form form={addForm} name="addBookForm" onFinish={addBook}
                      validateMessages={{required: "请输入 ${label}!"}}
                      ref={addFormRef}>
                    <Form.Item label="书籍ISBN" name="isbn"
                               rules={[{required: true, message: "请输入书籍ISBN!"}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="书籍名称" name="name"
                               rules={[{required: true, message: "请输入书籍名称!"}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="作者" name="author"
                               rules={[{required: true, message: "请输入作者!"}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="分类" name="type"
                               rules={[{required: true, message: "请输入分类!"}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="定价" name="price"
                               rules={[{required: true, message: "请输入定价!"}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="库存"
                        name="inventory"
                        rules={[{required: true, message: "请输入库存数量!"}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="作品简介"
                        name="description"
                        rules={[{required: true, message: "请输入作品简介!"}]}
                    >
                        <Input.TextArea rows={4}/>
                    </Form.Item>
                    <Form.Item
                        label="封面图片"
                        name="image"
                        rules={[{required: true, message: "请输入图片链接!"}]}
                    >
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    </Col>);
};

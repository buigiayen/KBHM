import React from "react";
import { Button, Card, Form, Input } from "antd";

import "./index.css";
import { useNavigate } from "react-router-dom";
import { Get_Token } from "../../Data/Api/Login";
import { useState } from "react";

const App = () => {
  const [form] = Form.useForm();
  var Navigate = useNavigate();
  const [Login, SetLogin] = useState({ userID: null, PasswordWeb: null });
  const VeryfyLogin = async () => {
    form
      ?.validateFields()
      .then(async () => {
        const data = await Get_Token(Login);
        if (data !== undefined) {
          localStorage.setItem("Token", data?.token ?? "");
          localStorage.setItem("userID", data?.userID ?? "");
          Navigate("/DanhSachDangKyHienMau");
        }
      })
      .catch((e) => {});
  };

  return (
    <Card>
      <Form
        className="FormLogin"
        name="basic"
        onFinish={() => {
          VeryfyLogin();
        }}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{ maxWidth: 900, marginLeft: 10 }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            onPressEnter={() => {
              VeryfyLogin();
            }}
            onChange={(e) => {
              SetLogin({ ...Login, userID: e.target.value });
            }}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            onPressEnter={() => {
              VeryfyLogin();
            }}
            onChange={(e) => {
              SetLogin({ ...Login, PasswordWeb: e.target.value });
            }}
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type="primary"
            onClick={() => {
              VeryfyLogin();
            }}
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default App;

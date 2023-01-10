import React from "react";
import axios from "axios";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";

const AdminLoginForm = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const data = await axios.post(
        "http://localhost:5000/admin/login",
        values
      );

      if (data.data.success) {
        console.log(data);
        localStorage.setItem("admin-token", data.data.token);
        navigate("/admin-home");
      } else {
        console.log(data, "erorrr");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="email"
        label={<label style={{ color: "white" }}>Email</label>}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item
        label={<label style={{ color: "white" }}>Password</label>}
        name="password"
      >
        <Input placeholder="Password" type="password" />
      </Form.Item>
      <div className="d-flex flex-column">
        <Button
         className="d-flex flex-column"
          htmlType="submit"
        >
          Login
        </Button>
      </div>
    </Form>
  );
};

export default AdminLoginForm;

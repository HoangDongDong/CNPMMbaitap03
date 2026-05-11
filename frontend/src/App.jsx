import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, notification } from "antd";
import AuthContext from "./context/AuthContext";
import { loginApi } from "./util/api";
import "./App.css";

function App() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const onFinish = async (values) => {
    try {
      const { email, password } = values;
      const result = await loginApi(email, password);

      dispatch({
        type: "LOGIN",
        payload: {
          user: result.user,
          token: result.token,
        },
      });

      notification.success({
        message: "Login Successful",
        description: "Welcome back!",
        duration: 2,
      });

      form.resetFields();
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      notification.error({
        message: "Login Failed",
        description: error.message || "Invalid email or password.",
        duration: 3,
      });
    }
  };

  return (
    <div className="app-container">
      <Card className="login-card">
        <h2>Login</h2>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>

        <div className="auth-links">
          <p>
            Don't have an account?{" "}
            <a onClick={() => navigate("/register")}>Register here</a>
          </p>
          <p>
            <a onClick={() => navigate("/forgot-password")}>Forgot password?</a>
          </p>
        </div>
      </Card>
    </div>
  );
}

export default App;

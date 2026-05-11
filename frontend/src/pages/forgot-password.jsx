import { Form, Input, Button, Card, notification } from "antd";
import { forgotPasswordApi } from "../util/api";
import "./forgot-password.css";

const ForgotPassword = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const { email } = values;
      const result = await forgotPasswordApi(email);

      notification.success({
        message: "Success",
        description:
          result.message || "Password reset link has been sent to your email.",
        duration: 3,
      });

      form.resetFields();
    } catch (error) {
      notification.error({
        message: "Error",
        description:
          error.message || "Failed to process forgot password request.",
        duration: 3,
      });
    }
  };

  return (
    <div className="forgot-password-container">
      <Card className="forgot-password-card">
        <h2>Forgot Password</h2>
        <p>Enter your email address to receive a password reset link.</p>

        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email address" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Send Reset Link
            </Button>
          </Form.Item>
        </Form>

        <p>
          Remember your password? <a href="/login">Login here</a>
        </p>
      </Card>
    </div>
  );
};

export default ForgotPassword;

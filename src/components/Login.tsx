import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../styles/style.css";
import heroLogin from "../assets/hero-login.png";
import axios from "axios";

interface ILogin {
    identifier: string;
    password: string;
}

const Login: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
    const navigate = useNavigate();
    const [errors, setErrors] = useState<Record<string, string>>({});

    const initialValues: ILogin = {
        identifier: "",
        password: "",
    };

    const axiosLogin = (body: ILogin) => {
        return axios.post("http://192.168.23.195:8080/login", body);
    };

    const axiosForgotPassword = (email: string) => {
        return axios.post("http://192.168.23.195:8080/forgotpassword", {
            email,
        });
    };

    const onFinish = async (values: ILogin) => {
        // Reset lỗi trước khi validate
        setErrors({});

        const newErrors: Record<string, string> = {};

        // Validate email/phone
        const phoneRegex = /^0\d{9}$/; // Bắt đầu bằng 0 và có 10 chữ số
        const emailRegex = /^[a-z0-9._-]+@gmail\.com$/; // Email không chứa chữ hoa hoặc ký tự đặc biệt và kết thúc bằng @gmail.com

        if (!values.identifier) {
            newErrors.identifier = "Vui lòng nhập email hoặc số điện thoại.";
        } else if (phoneRegex.test(values.identifier)) {
            // Nếu là số điện thoại hợp lệ
        } else if (!emailRegex.test(values.identifier)) {
            newErrors.identifier = "Email không hợp lệ hoặc không phải Email.";
        }

        const passwordRegex =
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$#*!%&])[A-Za-z\d@$#*!%&]{8,}$/; // Mật khẩu có ít nhất 8 ký tự, ít nhất 1 chữ hoa, 1 chữ thường, 1 số, 1 ký tự đặc biệt
        if (!values.password) {
            newErrors.password = "Vui lòng nhập mật khẩu.";
        } else if (!passwordRegex.test(values.password)) {
            newErrors.password =
                "Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.";
        }

        // Nếu có lỗi, cập nhật state errors và dừng thực thi
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axiosLogin(values);
            if (response.status === 200) {
                message.success("Đăng nhập thành công!");
            }
        } catch (error: any) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                message.error(error.response.data.message);
            } else if (error.response && error.response.status === 404) {
                message.error("Tài khoản không tồn tại");
            } else {
                message.error("Đăng nhập thất bại");
            }
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Form failed:", errorInfo);
    };

    const handleForgotPassword = async () => {
        // Reset lỗi trước khi validate
        setErrors({});

        const newErrors: Record<string, string> = {};

        const emailRegex = /^[a-z0-9._-]+@gmail\.com$/;

        if (!forgotPasswordEmail) {
            newErrors.email = "Vui lòng nhập Email của bạn.";
        } else if (!emailRegex.test(forgotPasswordEmail)) {
            newErrors.email = "Email không hợp lệ hoặc không phải Email.";
        }

        // Nếu có lỗi, cập nhật state errors và dừng thực thi
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axiosForgotPassword(forgotPasswordEmail);
            if (response.status === 200) {
                message.success(
                    "Chúng tôi đã gửi mật khẩu mới về Email của bạn."
                );
                setIsModalVisible(false);
            } else {
                message.error("Có lỗi xảy ra. Vui lòng thử lại.");
            }
        } catch (error: any) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                message.error(error.response.data.message);
            } else {
                message.error("Có lỗi xảy ra. Vui lòng thử lại.");
            }
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-image">
                <img
                    src={heroLogin}
                    alt="Login"
                    style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                    }}
                />
                <div className="image-overlay">
                    <h2>Lorem Ipsum is simply</h2>
                    <p>Lorem Ipsum is simply</p>
                </div>
            </div>
            <div className="auth-form">
                <h2 className="auth-title">Welcome to lorem!</h2>
                <div className="auth-buttons">
                    <div className="btn">
                        <button className="auth-button active">Login</button>

                        <button
                            className="auth-button"
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </button>
                    </div>
                </div>
                <p className="auth-description">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                </p>
                <Form
                    name="basic"
                    initialValues={initialValues}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="vertical"
                >
                    <Form.Item
                        label="Email/Phonenumber"
                        name="identifier"
                        validateStatus={errors.identifier ? "error" : ""}
                        help={errors.identifier}
                    >
                        <Input
                            placeholder="Enter your User name"
                            className={`input-required ${
                                errors.identifier ? "input-error" : ""
                            }`}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        validateStatus={errors.password ? "error" : ""}
                        help={errors.password}
                    >
                        <Input.Password
                            placeholder="Enter your Password"
                            iconRender={(visible) =>
                                visible ? (
                                    <FontAwesomeIcon icon={faEyeSlash} />
                                ) : (
                                    <FontAwesomeIcon icon={faEye} />
                                )
                            }
                            className={`input-required ${
                                errors.password ? "input-error" : ""
                            }`}
                        />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                        <Link
                            to="#"
                            className="forgot-password"
                            onClick={() => setIsModalVisible(true)}
                        >
                            Forgot Password ?
                        </Link>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-button"
                            style={{
                                width: "300px",
                                height: "53px",
                                margin: "60px",
                                fontSize: "20px",
                                borderRadius: "36px",
                                background: "#49BBBD",
                                border: "none",
                            }}
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            {/* Modal for Forgot Password */}
            <Modal
                title="Forgot Password"
                visible={isModalVisible}
                onOk={handleForgotPassword}
                onCancel={() => setIsModalVisible(false)}
                okText="Confirm"
                cancelText="Cancel"
                className="custom-modal"
            >
                <Form layout="vertical">
                    <Form.Item
                        label="Email"
                        validateStatus={errors.email ? "error" : ""}
                        help={errors.email}
                    >
                        <Input
                            value={forgotPasswordEmail}
                            onChange={(e) => {
                                setForgotPasswordEmail(e.target.value);
                                if (errors.email) {
                                    setErrors((prevErrors) => ({
                                        ...prevErrors,
                                        email: "",
                                    }));
                                }
                            }}
                            placeholder="Enter your email"
                            className={errors.email ? "input-error" : ""}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Login;

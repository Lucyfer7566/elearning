import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../styles/style.css";
import heroRegister from "../assets/hero-register.png";
import axios from "axios";

interface IRegister {
    email: string;
    fullname: string;
    phonenumber: string;
    password: string;
}

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState<Record<string, string>>({});

    const initialValues: IRegister = {
        email: "",
        fullname: "",
        phonenumber: "",
        password: "",
    };

    const axiosRegister = (body: IRegister) => {
        return axios.post("http://192.168.23.195:8080/register", body);
    };

    const onFinish = async (values: IRegister) => {
        // Reset lỗi trước khi validate
        setErrors({});

        // Kiểm tra các trường không được bỏ trống
        const newErrors: Record<string, string> = {};
        if (!values.email) {
            newErrors.email = "Vui lòng nhập email.";
        }
        if (!values.fullname) {
            newErrors.fullname = "Vui lòng nhập họ và tên.";
        }
        if (!values.phonenumber) {
            newErrors.phonenumber = "Vui lòng nhập số điện thoại.";
        }
        if (!values.password) {
            newErrors.password = "Vui lòng nhập mật khẩu.";
        }

        // Nếu có lỗi, cập nhật state errors và dừng thực thi
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axiosRegister(values);
            if (response.status === 201) {
                message.success(
                    "Đăng ký thành công! Vui lòng kiểm tra email để xác nhận."
                );
            }
        } catch (error: any) {
            // Kiểm tra error.response và lấy thông báo lỗi từ response
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                message.error(error.response.data.message);
            } else {
                message.error("Đăng ký thất bại. Vui lòng thử lại.");
            }
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Form failed:", errorInfo);
    };

    return (
        <div className="auth-container">
            <div className="auth-image">
                <img
                    src={heroRegister}
                    alt="Register"
                    style={{
                        width: "731px",
                        height: "825px",
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
                        <button
                            className="auth-button"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>
                        <button className="auth-button active">Register</button>
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
                        label="Email Address"
                        name="email"
                        validateStatus={errors.email ? "error" : ""}
                        help={errors.email}
                    >
                        <Input
                            placeholder="Enter your Email Address"
                            className={`input-required ${
                                errors.email ? "input-error" : ""
                            }`}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Full Name"
                        name="fullname"
                        validateStatus={errors.fullname ? "error" : ""}
                        help={errors.fullname}
                    >
                        <Input
                            placeholder="Enter your Full Name"
                            className={`input-required ${
                                errors.fullname ? "input-error" : ""
                            }`}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Phonenumber"
                        name="phonenumber"
                        validateStatus={errors.phonenumber ? "error" : ""}
                        help={errors.phonenumber}
                    >
                        <Input
                            placeholder="Enter your Phone Number"
                            className={`input-required ${
                                errors.phonenumber ? "input-error" : ""
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

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="auth-button"
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
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Register;

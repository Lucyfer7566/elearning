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

        const newErrors: Record<string, string> = {};

        const emailAndGmailRegex = /^[a-z0-9._-]+@gmail\.com$/;
        if (!values.email) {
            newErrors.email = "Vui lòng nhập email.";
        } else if (!emailAndGmailRegex.test(values.email)) {
            newErrors.email = "Email không hợp lệ hoặc không phải Gmail.";
        }

        const fullNameRegex = /^[a-zA-Z0-9\s]{5,}$/; // Tên phải có ít nhất 5 ký tự, không chứa ký tự đặc biệt
        if (!values.fullname) {
            newErrors.fullname = "Vui lòng nhập họ và tên.";
        } else if (!fullNameRegex.test(values.fullname)) {
            newErrors.fullname =
                "Họ và tên phải có ít nhất 5 ký tự và không chứa ký tự đặc biệt.";
        }

        const phoneRegex = /^0\d{9}$/; // Số điện thoại bắt đầu bằng 0 và có 10 chữ số
        if (!values.phonenumber) {
            newErrors.phonenumber = "Vui lòng nhập số điện thoại.";
        } else if (!phoneRegex.test(values.phonenumber)) {
            newErrors.phonenumber = "Số điện thoại không hợp lệ.";
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
            const response = await axiosRegister(values);
            if (response.status === 201) {
                message.success(
                    "Đăng ký thành công! Vui lòng kiểm tra email để xác nhận."
                );
            }
        } catch (error: any) {
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

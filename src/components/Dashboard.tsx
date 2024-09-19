import React from "react";
import { Layout, Menu, Avatar, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Logo from "../assets/Logo-Dashboard.png";

const { Header, Content, Sider } = Layout;

const Dashboard: React.FC = () => {
    const menuItems = [
        "Quản lý khóa học",
        "Quản lý lớp học",
        "Quản lý môn học",
        "Quản lý câu hỏi",
        "Quản lý tài khoản",
    ];

    const userMenu = (
        <Menu>
            <Menu.Item key="1">Profile</Menu.Item>
            <Menu.Item key="2">Logout</Menu.Item>
        </Menu>
    );

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider width={200} style={{ background: "#95e1e6" }}>
                <div
                    className="logo"
                    style={{ padding: "20px", textAlign: "center" }}
                >
                    <img
                    src={Logo}
                    alt="Login"
                    style={{
                        width: "80px",
                        height: "60px",
                    }}
                />
                </div>
                <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
                    {menuItems.map((item, index) => (
                        <Menu.Item key={index + 1}>{item}</Menu.Item>
                    ))}
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{ padding: 0,height: 100, background: "#95e1e6" }}
                >
                    <div style={{ float: "right", padding: "16px" }}>
                        <Dropdown overlay={userMenu}>
                            <Avatar
                                style={{ backgroundColor: "#87d068" }}
                                icon={<UserOutlined />}
                            />
                        </Dropdown>
                        <span style={{ marginLeft: "10px" }}>
                            Nguyễn Văn Đại Cương
                        </span>
                    </div>
                </Header>
                <Content style={{ margin: "0 16px" }}>
                    <div
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: "#fff",
                        }}
                    >
                        {/* Nội dung của Dashboard */}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Dashboard;

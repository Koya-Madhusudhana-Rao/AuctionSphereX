import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './forgotpass.css';
import Nav from "../Navbar/Nav";
import Footer from "../Navbar/foot";

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [panSsnNumber, setPanSsnNumber] = useState(''); // New state for PAN/SSN
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async () => {
        try {
            setLoading(true);

            const response = await fetch(`/api/users/reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, panSsnNumber, newPassword }), // Include panSsnNumber in the request
            });

            const data = await response.json();

            if (response.ok) {
                message.success(data.message);
                // Handle success scenario
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    const passwordValidationRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

    return (
        <>
            <Nav />
            <div className="forgot-password-container">
                <div className="forgot-password-form">
                    <h1 className="name-sub">Set New Password</h1><br />
                    <Form layout="vertical">
                        <Form.Item
                            label="Email"
                            name="email"
                            className="email-label"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'Please enter a valid email address',
                                },
                                {
                                    required: true,
                                    message: 'Email is required',
                                },
                            ]}
                        >
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="PAN/SSN Number" // Label for PAN/SSN input
                            name="panSsnNumber" // Name for PAN/SSN field
                            className="pan-ssn-label"
                            rules={[
                                {
                                    required: true,
                                    message: 'PAN/SSN number is required',
                                },
                            ]}
                        >
                            <Input
                                placeholder="Enter PAN/SSN Number" // Placeholder for PAN/SSN input
                                value={panSsnNumber}
                                onChange={(e) => setPanSsnNumber(e.target.value)} // Handle PAN/SSN input change
                            />
                        </Form.Item>

                        <Form.Item
                            label="New Password"
                            name="newPassword"
                            className="new-password-label"
                            rules={[
                                {
                                    required: true,
                                    message: 'New password is required',
                                },
                                {
                                    pattern: passwordValidationRegex,
                                    message: <span style={{ fontSize: '11px' }}>
                                        Pass must 8+ char & must contain at least one upp-case, low-case, num, & spl char(!@#$%^&*).
                                    </span>
                                },
                            ]}
                        >
                            <Input.Password
                                placeholder="  Enter new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                onClick={handleForgotPassword}
                                htmlType="submit"
                                className="forgot-password-button"
                                type="primary"
                                loading={loading}
                            >
                                Set New Password
                            </Button>
                        </Form.Item>
                        <div className="arrow-icon">
                            <Link to="/login">
                                <ArrowLeftOutlined style={{ fontSize: '24px' }} />
                                <span>Login</span>
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ForgotPassword;

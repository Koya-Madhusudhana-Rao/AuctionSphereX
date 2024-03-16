import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Divider from "../../components/Divider";
import { LoginUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import Nav from "../Navbar/Nav";
import Footer from "../Navbar/foot";


const rules = [
  {
    required: true,
    message: "required",
  },
];
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true))
      const response = await LoginUser(values);
      dispatch(SetLoader(false))
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/";
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false))
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <div className="nav-div">
      <Nav />
      <div className='h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-300 via-teal-200  flex justify-center items-center'>
        <div className="bg-white p-10 rounded w-[420px]">
          <h1 className="text-primary text-2xl">
          AuctionSphereX - <span className="text-gray-400 text-2xl">LOGIN</span>
          </h1>
          <Divider />
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="Email" name="email" rules={rules}>
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={rules}>
              <Input type="password" placeholder="Password" />
            </Form.Item>

            <Button type="primary" htmlType="submit" block className="mt-2">
              Login
            </Button>
            <div className="fp">
              {/* Link to the forgot password page */}
              <Link to="/forgotpassword" className="text-prey">
                ForgotPassword
              </Link>
            </div>
            <div className="mt-5 text-center">
              <span className="text-gray-500">
                Don't have an account?{" "}
                <Link to="/register" className="text-threy">
                  Register
                </Link>
              </span>
            </div>
          </Form>

        </div>
      </div>
      <div><Footer /></div>
    </div>
  );
}

export default Login;

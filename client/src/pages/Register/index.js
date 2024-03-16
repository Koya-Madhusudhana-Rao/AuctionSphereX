import React, { useEffect,useState } from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Divider from "../../components/Divider";
import { RegisterUser } from "../../apicalls/users";
import { SetLoader } from "../../redux/loadersSlice";
import { useDispatch } from "react-redux";
import Nav from "../Navbar/Nav";
import Footer from "../Navbar/foot";
import './register.css';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const rules = [
  {
    required: true,
    message: "required",
  },
];
function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const response = await RegisterUser(values);
      dispatch(SetLoader(false));
      if (response.success) {
        navigate("/login");
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const passwordValidationRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };


  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="nav-div">
    <Nav />
    <div className='h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-400 via-orange-200  flex justify-center items-center'>
      <div className="bg-white p-10 rounded w-[450px]">
        <h1 className="text-primary text-2xl">
        AuctionSphereX - <span className="text-gray-400 text-2xl">REGISTER</span>
        </h1>
        <Divider />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={rules}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={rules}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="PAN/SSN Number (*security) " name="panSsnNumber" rules={rules}>
          <Input placeholder="PAN/SSN Number" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            ...rules,
            {
              pattern: passwordValidationRegex,
              message:
              <span style={{ fontSize: '9px' }}>
              Pass must 8+ char & must contain at least one upp-case, low-case, num, & spl char(!@#$%^&*).
            </span>
            },
          ]}
        >
          <Input.Password
            placeholder=" Password"
            iconRender={(visible) =>
              visible ? (
                <EyeTwoTone onClick={togglePasswordVisibility} />
              ) : (
                <EyeInvisibleOutlined onClick={togglePasswordVisibility} />
              )
            }
          />
        </Form.Item>


          <Button type="primary" htmlType="submit" block className="mt-2">
            Register
          </Button>

          <div className="mt-5 text-center">
            <span className="text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-threy">
                Login
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
    <div><Footer/></div>
    </div>
  );
}

export default Register;

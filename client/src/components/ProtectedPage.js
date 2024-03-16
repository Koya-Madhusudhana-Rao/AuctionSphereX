import React, { useEffect, useState } from "react";
import { Avatar, Badge, message} from "antd";
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../redux/loadersSlice";
import { SetUser } from "../redux/usersSlice";
import Notifications from "./Notifications";


// Dropdown, Menu
import {
  GetAllNotifications,
  ReadAllNotifications,
} from "../apicalls/notifications";

function ProtectedPage({ children }) {
  const [notifications = [], setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validateToken = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetCurrentUser();
      dispatch(SetLoader(false));
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        navigate("/login");
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      navigate("/login");
      message.error(error.message);
    }
  };
  // const handleMenuClick = (e) => {
  //   if (e.key === "general") {
  //     navigate("/profile");

  //     // Handle 'General' click
  //     // Example: navigate("/general");
  //   } else if (e.key === "bids") {
  //     navigate("/bids");
  //     // Handle 'Bids' click
  //     // Example: navigate("/bids");
  //   } else if (e.key === "products") {
  //     // Handle 'Products' click
  //     // Example: navigate("/products");
  //   } else if (e.key === "logout") {
  //     // Handle 'Logout' click
  //     localStorage.removeItem("token");
  //     navigate("/login");
  //   }};

    // const menu = (
    //   <Menu onClick={handleMenuClick}>
    //     <Menu.Item key="general">General</Menu.Item>
    //     <Menu.Item key="bids">Bids</Menu.Item>
    //     <Menu.Item key="products">Products</Menu.Item>
    //     <Menu.Divider />
    //     <Menu.Item key="logout">Logout</Menu.Item>
    //   </Menu>
    // );

  const getNotifications = async () => {
    try {
      const response = await GetAllNotifications();

      if (response.success) {
        setNotifications(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const readNotifications = async () => {
    try {
      const response = await ReadAllNotifications();
      if (response.success) {
        getNotifications();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
      getNotifications();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    user && (
      <div>
        {/* header */}
        <div className="flex justify-between items-center bg-yuva rounded p-1">
        <div
            className="text-white cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src="https://github.com/YUVARAJMORLA/imagesforprofile/blob/main/aux1-removebg-preview.png?raw=true" // Replace with your logo image path
              alt="AuctionSphereX "
              onClick={() => navigate("/")}
              style={{ height: '60px', cursor: 'pointer' }} // Adjust the height and add pointer cursor
            />
          </div>

          <div className="bg-white py-2 px-5 rounded flex gap-1 items-center mr-5">
            <span
              className="underline cursor-pointer uppercase"
              onClick={() => {
                if (user.role === "user") {
                  navigate("/profile");
                } else {
                  navigate("/admin");
                }
              }}
            >
              {user.name}
            </span><br></br>
            {/* <Dropdown overlay={menu} placement="bottomRight">
              <span >
                 <i className="ri-arrow-down-s-line"></i>
              </span>
            </Dropdown> */}
            <Badge
              count={
                notifications?.filter((notification) => !notification.read)
                  .length
              }
              onClick={() => {
                readNotifications();
                setShowNotifications(true);
              }}
              className="cursor-pointer"
            >
              <Avatar
                shape="circle"
                icon={<i className="ri-notification-3-line"></i>}
              />
            </Badge>
            <i
              className="ri-logout-box-r-line ml-10"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/Main");
              }}
            ></i>
          </div>
        </div>

        {/* body */}
        <div className="p-5">{children}</div>

        {
          <Notifications
            notifications={notifications}
            reloadNotifications={getNotifications}
            showNotifications={showNotifications}
            setShowNotifications={setShowNotifications}
          />
        }
      </div>
    )
  );
}

export default ProtectedPage;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetProducts } from "../../apicalls/products";
import { SetLoader } from "../../redux/loadersSlice";
import { message } from "antd";
import Divider from "../../components/Divider";
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";
import moment from "moment";
import { UserOutlined } from "@ant-design/icons";
import './Filters.css'
import Footer from "../Navbar/foot";


function Home() {
  const [showFilters, setShowFilters] = React.useState(true);
  const [products, setProducts] = React.useState([]);
  const [filters, setFilters] = React.useState({
    status: "approved",
    category: [],
    age: [],
  });
  const [searchQuery, setSearchQuery] = React.useState(''); // State for search query
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const calculateRemainingTime = (expiryTime) => {
    const now = new Date().getTime();
    const endTime = new Date(expiryTime).getTime();
    let difference = endTime - now;

    if (difference < 0) {
      difference = 0;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };
  const updateRemainingTime = () => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.expiryTime) {
          const timeDifference = calculateRemainingTime(product.expiryTime);
          if (timeDifference > 0) {
            return {
              ...product,
              remainingTime: calculateRemainingTime(product.expiryTime),
            };
          } else {
            return { ...product, remainingTime: { days: 0, hours: 0, minutes: 0, seconds: 0 } };
          }
        }
        return product;
      })
    );
  };

  useEffect(() => {
    getData();
  }, [filters]);

  useEffect(() => {
    const timer = setInterval(() => {
      updateRemainingTime();
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts(filters);
      dispatch(SetLoader(false));
      if (response.success) {
        const updatedProducts = response.data.filter((product) => {
          const currentTime = new Date().getTime();
          const expiryTime = product.expiryTime ? new Date(product.expiryTime).getTime() : 0;
          return expiryTime > currentTime;
        });
        setProducts(updatedProducts);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [filters]);


  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filterExpiredProducts = () => {
    const currentTime = new Date().getTime();
    const updatedProducts = products.filter((product) => {
      if (product.expiryTime) {
        const expiryTime = new Date(product.expiryTime).getTime();
        return expiryTime > currentTime;
      }
      return true;
    });
    return updatedProducts;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      updateRemainingTime();
      const filtered = filterExpiredProducts();
      setProducts(filtered);
    }, 1000);

    return () => clearInterval(timer);
  }, [products]);


  return (
    <div className="flex gap-5">
      {showFilters && (
        <Filters
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          filters={filters}
          setFilters={setFilters}
        />
      )}
      <div className="flex flex-col gap-5 w-full">
        <div className="flex gap-5 items-center">
          {!showFilters && (
            <i
              className="ri-equalizer-line text-xl cursor-pointer"
              onClick={() => setShowFilters(!showFilters)}
            ></i>
          )}
          {/* Search bar */}
          <input
            type="text"
            placeholder="Search Products here..."
            className="border border-gray-300 rounded border-solid px-10 py-1 h-14 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div
          className={`
        grid gap-5 ${showFilters ? "grid-cols-4" : "grid-cols-5"}
      `}
        >
          {/* Render filtered products */}
          {filteredProducts?.map((product) => (
            <div
              className={`border border-gray-300 rounded border-solid flex flex-col gap-2 pb-2 cursor-pointer item-animation`}
              key={product._id}
              onClick={() => navigate(`/product/${product._id}`)}
              onMouseOver={(e) => {
                e.currentTarget.classList.add('item-animation');
              }}
              onMouseLeave={(e) => {
                e.currentTarget.classList.remove('item-animation');
              }}
            >
              {/* Product details */}
              <img
                src={product.images[0]}
                className="w-full h-52 p-2 rounded-md object-cover"
                alt=""
              />
              <div className="px-2 flex flex-col">
                <h1 className="text-lg font-semibold">{product.name}</h1>
                <p className="text-sm">
                  {product.age} {product.age === 1 ? " year" : " years"} old
                </p>
                <Divider />
                <span className="text-xl font-semibold text-green-700 mb-1">
                  Rs: {product.price}
                </span>
                <div className="flex justify-between mt-2 timer-container">
                  <span>Bid Ends</span>
                  <span>
                    {/* Calculate and display time remaining */}
                    {product.expiryTime &&
                      calculateRemainingTime(product.expiryTime).days}
                    <span className="timer-unit">d</span>{" "}
                    {product.expiryTime &&
                      calculateRemainingTime(product.expiryTime).hours}
                    <span className="timer-unit">h</span>{" "}
                    {product.expiryTime &&
                      calculateRemainingTime(product.expiryTime).minutes}
                    <span className="timer-unit">m</span>{" "}
                    {product.expiryTime &&
                      calculateRemainingTime(product.expiryTime).seconds}
                    <span className="timer-unit">s</span>
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    
  );
}

export default Home;

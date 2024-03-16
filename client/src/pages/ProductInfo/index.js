import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetAllBids, GetProductById, GetProducts, } from "../../apicalls/products";
import { SetLoader } from "../../redux/loadersSlice";
import { Button, message } from "antd";
import Divider from "../../components/Divider";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import BidModal from "./BidModal";

function ProductInfo() {
  const { user } = useSelector((state) => state.users);
  const [showAddNewBid, setShowAddNewBid] = React.useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const [product, setProduct] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProductById(id);
      dispatch(SetLoader(false));
      if (response.success) {
        const bidsResponse = await GetAllBids({ product: id });
        setProduct({
          ...response.data,
          bids: bidsResponse.data,
          returnsAccepted: response.data.returnsAccepted,
        });
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
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

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    let interval;
    if (product && product.expiryTime) {
      interval = setInterval(() => {
        setProduct((prevProduct) => ({
          ...prevProduct,
          remainingTime: calculateRemainingTime(prevProduct.expiryTime),
        }));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [product]);

  return (
    product && (
      <div>
        <div className="grid grid-cols-2 gap-5 mt-5">
          {/* images */}
          <div className="flex flex-col gap-5">
            <img
              src={product.images[selectedImageIndex]}
              alt=""
              className="w-full h-96 object-cover rounded-md"
            />

            <div className="flex gap-5">
              {product.images.map((image, index) => {
                return (
                  <img
                    className={
                      "w-20 h-20 object-cover rounded-md cursor-pointer " +
                      (selectedImageIndex === index
                        ? "border-2 border-green-700 border-dashed p-2"
                        : "")
                    }
                    onClick={() => setSelectedImageIndex(index)}
                    src={image}
                    alt=""
                  />
                );
              })}
            </div>

            <Divider />

            <div>
              <h1 className="text-gray-600">Added On</h1>
              <span className="text-gray-600">
                {moment(product.createdAt).format("MMM D , YYYY hh:mm A")}
              </span>
            </div>
            {/* Time Remaining section */}
            <div className="custom-timer-container">
              <span className="name-ta">Bid Ends On</span>
              <div className="custom-timer-units">
                <span className="custom-timer-unit">
                  {product.expiryTime &&
                    calculateRemainingTime(product.expiryTime).days}d
                </span>
                <span className="separator"> | </span>
                <span className="custom-timer-unit">
                  {product.expiryTime &&
                    calculateRemainingTime(product.expiryTime).hours}h
                </span>
                <span className="separator"> | </span>
                <span className="custom-timer-unit">
                  {product.expiryTime &&
                    calculateRemainingTime(product.expiryTime).minutes}m
                </span>
                <span className="separator"> | </span>
                <span className="custom-timer-unit">
                  {product.expiryTime &&
                    calculateRemainingTime(product.expiryTime).seconds}s
                </span>
              </div>
            </div>

          </div>


          {/* details */}
          <div className="flex flex-col gap-3">
            <div>
              <h1 className="text-2xl font-semibold text-orange-900">
                {product.name}
              </h1>
              <span>{product.description}</span>
            </div>

            <Divider />
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold text-orange-900">
                Product Details
              </h1>
              <div className="flex justify-between mt-2 mb-1">
                <span>Price</span>
                <span>Rs: {product.price}</span>
              </div>
              <div className="flex justify-between mt-2 mb-1">
                <span>Category</span>
                <span className="uppercase">{product.category}</span>
              </div>
              <div className="flex justify-between mt-2 mb-1">
                <span>Bill Available</span>
                <span> {product.billAvailable ? "Yes" : "No"}</span>
              </div>

              <div className="flex justify-between mt-2 mb-1">
                <span>Box Available</span>
                <span>{product.boxAvailable ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between mt-2 mb-1">
                <span>Accessories Available</span>
                <span>{product.accessoriesAvailable ? "Yes" : "No"}</span>
              </div>

              <div className="flex justify-between mt-2 mb-1">
                <span>Warranty Available</span>
                <span>{product.warrantyAvailable ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between mt-2 mb-1">
                <span>Returns Accepted</span>
                <span>{product.returnsAccepted ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between mt-2 mb-1">
                <span>COD Accepted</span>
                <span>{product.cashondelivery ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between mt-2 mb-1">
                <span>Purchased Year</span>
                <span>
                  {moment().subtract(product.age, 'years').format("YYYY")} ({product.age} years ago)
                </span>
              </div>
            </div>

            <Divider />
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold text-orange-900">
                Seller Details
              </h1>
              <div className="flex justify-between mt-2">
                <span>Name</span>
                <span> {product.seller.name}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Email</span>
                <span className="lowercase">{product.seller.email}</span>
              </div>
            </div>

            <Divider />
            <div className="flex flex-col">
              <div className="flex justify-between mb-5">
                <h1 className="text-2xl font-semibold text-orange-900">Bids</h1>
                <Button
                  onClick={() => setShowAddNewBid(!showAddNewBid)}
                  disabled={user._id === product.seller._id}
                >
                  New Bid
                </Button>
              </div>

              {product.showBidsOnProductPage &&
                product?.bids?.map((bid) => {
                  return (
                    <div className="border border-gray-300 border-solid p-3 rounded mt-5">
                      <div className="flex justify-between text-gray-700">
                        <span>Name</span>
                        <span> {bid.buyer.name}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Bid Amount</span>
                        <span> Rs:  {bid.bidAmount}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Bid Place On</span>
                        <span>
                          {" "}
                          {moment(bid.createdAt).format("MMM D , YYYY hh:mm A")}
                        </span>
                      </div>

                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {showAddNewBid && (
          <BidModal
            product={product}
            reloadData={getData}
            showBidModal={showAddNewBid}
            setShowBidModal={setShowAddNewBid}
          />
        )}
      </div>
    )
  );
}

export default ProductInfo;

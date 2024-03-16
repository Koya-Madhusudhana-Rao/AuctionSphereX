import { Modal, Tabs, Form, Input, Row, Col, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { AddProduct, EditProduct } from "../../../apicalls/products";
import { SetLoader } from "../../../redux/loadersSlice";
import React, { useEffect,useState } from "react";
import Images from "./Images";

const additionalThings = [
  {
    label: "Bill Available",
    name: "billAvailable",
  },
  {
    label: "Warranty Available",
    name: "warrantyAvailable",
  },
  {
    label: "Accessories Available",
    name: "accessoriesAvailable",
  },
  {
    label: "Box Available",
    name: "boxAvailable",
  },
  {
    label: "Returns Accepted",
    name: "returnsAccepted",
  },
  {
    label: "COD Accepted",
    name: "cashondelivery",
  },
];

const rules = [
  {
    required: true,
    message: "Required",
  },
];

function ProductsForm({
  showProductForm,
  setShowProductForm,
  selectedProduct,
  getData,
}) {
  const [selectedTab = "1", setSelectedTab] = React.useState("1");
  const [expiryDays, setExpiryDays] = useState(0);
  const [expiryHours, setExpiryHours] = useState(0);
  const [expiryMinutes, setExpiryMinutes] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  
  const [remainingTime, setRemainingTime] = useState(null);

  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      let response = null;
      const expiryTime = new Date();
      expiryTime.setDate(expiryTime.getDate() + parseInt(expiryDays));
      expiryTime.setHours(expiryTime.getHours() + parseInt(expiryHours));
      expiryTime.setMinutes(expiryTime.getMinutes() + parseInt(expiryMinutes));

      values.expiryTime = expiryTime;

      if (selectedProduct) {
        response = await EditProduct(selectedProduct._id, values);
      } else {
        values.seller = user._id;
        values.status = "pending";
        response = await AddProduct(values);
      }
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
        setShowProductForm(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  const formRef = React.useRef(null);
 
  const [expiryTimeInput, setExpiryTimeInput] = useState(""); 
 
  const calculateRemainingTime = (expiryTime) => {
    const userDefinedTime = Date.parse(expiryTimeInput);
    const now = new Date().getTime();
    const expiration = userDefinedTime ? userDefinedTime : new Date(expiryTime).getTime();
    const difference = expiration - now;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days,hours, minutes, seconds };
  };

  useEffect(() => {
    const updateRemainingTime = (expiryTime) => {
      const { days, hours, minutes, seconds } = calculateRemainingTime(expiryTime);
      if (days >= 0 && hours >= 0 && minutes >= 0 && seconds >= 0) {
        setRemainingTime({ days, hours, minutes, seconds });
      } else {
        clearInterval(timer);
        setRemainingTime(null);
      }
    };
    let timer;
    if (selectedProduct) {
      formRef.current.setFieldsValue(selectedProduct);
      const { expiryTime } = selectedProduct;
      const timer = setInterval(() => {
        updateRemainingTime(expiryTime);
      }, 1000);}
      return () => {clearInterval(timer);
    };
  }, [selectedProduct, expiryTimeInput]);
  return (
    <Modal
      title=""
      open={showProductForm}
      onCancel={() => setShowProductForm(false)}
      centered
      width={1000}
      okText="Save"
      onOk={() => {
        formRef.current.submit();
      }}
      {...(selectedTab === "2" && { footer: false })}
    >
      <div>
        <h1 className="text-primary text-2xl text-center font-semibold uppercase">
          {selectedProduct ? "Edit Product" : "Add Product"}
        </h1>
        <Tabs
          defaultActiveKey="1"
          activeKey={selectedTab}
          onChange={(key) => setSelectedTab(key)}
        >
          <Tabs.TabPane tab="General" key="1">
            <Form layout="vertical" ref={formRef} onFinish={onFinish}>
              <Form.Item label="Name" name="name" rules={rules}>
                <Input type="text" />
              </Form.Item>
              <Form.Item label="Description" name="description" rules={rules}>
                <TextArea type="text" />
              </Form.Item>

              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Form.Item label="Price" name="price" rules={rules}>
                    <Input type="number" />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="Category" name="category" rules={rules}>
                    <select>
                      <option value="">Select</option>
                      <option value="electronics">Electronics</option>
                      <option value="fashion">Fashion</option>
                      <option value="home">Home</option>
                      <option value="sports">Sports</option>
                      <option value="books">Books</option>
                      <option value="collectibles">Collectibles</option>
                      <option value="art_antiques">Art & Antiques</option>
                      <option value="toys_games">Toys & Games</option>
                      <option value="jewelry_watches">Jewelry & Watches</option>
                      <option value="automotive">Automotive</option>
                      
                    </select>
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="Age" name="age" rules={rules}>
                    <Input type="number" />
                  </Form.Item>
                </Col>
              </Row>

              <div className="flex gap-10">
                {additionalThings.map((item) => {
                  return (
                    <Form.Item
                      label={item.label}
                      name={item.name}
                      valuePropName="checked"
                    >
                      <Input
                        type="checkbox"
                        value={item.name}
                        onChange={(e) => {
                          formRef.current.setFieldsValue({
                            [item.name]: e.target.checked,
                          });
                        }}
                        checked={formRef.current?.getFieldValue(item.name)}
                      />
                    </Form.Item>
                  );
                })}
              </div>
              
              <Form.Item
                label="Show Bids on Product Page"
                name="showBidsOnProductPage"
                valuePropName="checked"
              >
                <Input
                  type="checkbox"
                  onChange={(e) => {
                    formRef.current.setFieldsValue({
                      showBidsOnProductPage: e.target.checked,
                    });
                  }}
                  checked={formRef.current?.getFieldValue(
                    "showBidsOnProductPage"
                  )}
                  style={{ width: 50  , marginLeft:20}}
                />
              </Form.Item>
              {/* Display the timer */}
               <div>
        {/* ...other form items */}
        <Form.Item label="Set Expiry Time">
          <Row gutter={[16, 16]}>
            
            <Col span={6}>
              <Input
                placeholder="Days"
                type="number"
                value={expiryDays}
                onChange={(e) => setExpiryDays(e.target.value)}
              />
            </Col>
            <Col span={6}>
              <Input
                placeholder="Hours"
                type="number"
                value={expiryHours}
                onChange={(e) => setExpiryHours(e.target.value)}
              />
            </Col>
            <Col span={6}>
              <Input
                placeholder="Minutes"
                type="number"
                value={expiryMinutes}
                onChange={(e) => setExpiryMinutes(e.target.value)}
              />
            </Col>
          </Row>
        </Form.Item>
        {/* Display the timer */}
        {remainingTime && (
          <div>
            Time Left: {remainingTime.days}d {remainingTime.hours}h {remainingTime.minutes}m {remainingTime.seconds}s
          </div>
        )}
      </div>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Images" key="2" disabled={!selectedProduct}>
            <Images
              selectedProduct={selectedProduct}
              getData={getData}
              setShowProductForm={setShowProductForm}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Modal>
  );
}

export default ProductsForm;

import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Appbar from "../../shared/Appbar";
import AddCustomerInfo from "./section/AddCustomerInfo";
import AddProductInfo from "./section/AddProductInfo";
import { getCarriers, getProducts, getTrackProducts } from "../../helpers/AxiosHelper";
import AddPriceInfo from "./section/AddPriceInfo";
import { useSelector } from "react-redux";
import { getOrderId } from "../../helpers/HelperFuctions";
import axios from "axios";
import { backendUrl } from "../..";

const useStyles = makeStyles({
  container: {
    padding: "25px",
  },
});

const AddOrdersPage = () => {
  const defaultValue = {
    orderId: "",
    awbNumber: "",
    courier: null,
    customerName: "",
    email: "",
    products: [],
    mobileNumber: "",
    gstPercentage: "12",
    address: "",
    pinCode: "",
    isPrepaid: true,
    advancePaid: "0",
    shipmentProfit: "0",
    totalWeight: "",
    breadth:"",
    height:"",
    length:"",
    orderedDate: new Date(),
  };

  const classes = useStyles();

  const [data, setData] = useState(defaultValue);
  const [totalPrice, setTotalPrice] = useState(0);

  const [products, setProducts] = useState([]);
  const [carriers, setCarriers] = useState([]);

  const orders = useSelector((state) => state.Order.value);

  useEffect(() => {
    getTrackProducts().then((res) => {
      setProducts(
        res.data.map((p) => {
          return { ...p, label: p.name, value: p.name, quantity: "1" };
        })
      );
    });
  }, []);

  useEffect(() => {
    const orderIdGen = getOrderId(orders, data.orderedDate);

    setData({ ...data, orderId: orderIdGen });
  }, [orders, data.orderedDate]);

  useEffect(() => {
    let totalTemp = 0;
    data.products.forEach((p) => {
      totalTemp = totalTemp + parseInt(p.quantity) * parseInt(p.salesPrice);
    });
    setTotalPrice(totalTemp);
  }, [data.products]);

  useEffect(() => {
    getCarriers().then((res) => {
      setCarriers(
        res.data.couriers.map((c) => {
          return { ...c, value: c.courier_name, label: c.courier_name };
        })
      );
    });
  }, []);

  return (
    <div className={classes.container}>
      <Appbar name={"Create Order"} />
      <AddCustomerInfo data={data} setData={setData} carriers={carriers} />
      <AddProductInfo
        data={data}
        setData={setData}
        products={products}
        setProducts={setProducts}
      />
      <AddPriceInfo data={data} setData={setData} totalPrice={totalPrice} />
    </div>
  );
};

export default AddOrdersPage;

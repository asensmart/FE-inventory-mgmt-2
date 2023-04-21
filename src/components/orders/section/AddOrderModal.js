import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, Slide } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Colors } from "../../../helpers/Colors";
import Select from "react-select";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    marginBottom: "10px",
    gridGap: "15px",
    "& div": {
      "& h6": {
        fontSize: "14px",
        color: Colors.dark3,
        margin: "0 0 10px 0",
      },
      "& input": {
        outline: 0,
        padding: "10px",
        border: `1px solid ${Colors.light2}`,
        borderRadius: "5px",
        "&::-webkit-inner-spin-button": {
          "-webkit-appearance": "none",
        },
        "&::-webkit-outer-spin-button": {
          "-webkit-appearance": "none",
        },
      },
    },
  },
  btnCon: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "15px",
    padding: "0 20px 20px 20px",
    "& .add": {
      background: Colors.primary,
      border: `1px solid ${Colors.primary}`,
      borderRadius: "5px",
      color: Colors.light,
      padding: "8px 10px",
      fontSize: "16px",
      outline: 0,
      fontFamily: "inherit",
      transition: "all .5s",
      cursor: "pointer",
      "&:hover": {
        background: Colors.light,
        color: Colors.primary,
      },
    },
    "& .cancel": {
      background: Colors.danger,
      border: `1px solid ${Colors.danger}`,
      borderRadius: "5px",
      color: Colors.light,
      padding: "5px 10px",
      fontSize: "16px",
      outline: 0,
      fontFamily: "inherit",
      transition: "all .5s",
      cursor: "pointer",
      "&:hover": {
        background: Colors.light,
        color: Colors.danger,
      },
    },
  },
});

const AddOrderModal = ({
  isModalOpen,
  setIsModalOpen,
  setFilteredData,
  products,
  setLoading,
  setOrders,
  editData,
  setEditData,
}) => {
  const defaultValue = {
    orderId: "",
    customerName: "",
    email: "",
    products: [],
    mobileNumber: "",
    gstPercentage: "",
    address: "",
    pinCode: "",
    advancePaid: "",
    shipmentPrice: "",
  };

  const classes = useStyles();

  const [data, setData] = useState(defaultValue);

  const handleCancel = () => {
    setIsModalOpen(false);
    setData(defaultValue);
    setEditData(null);
  };

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setData(editData !== null ? editData : defaultValue);
  }, [editData]);

  const onDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSelectChange = (so, index) => {
    const productCopy = [...products];
    productCopy[index] = so;
    setData({ ...data, products: productCopy });
  };

  const onQuantityChange = (value, index) => {
    const productCopy = [...data.products];
    productCopy[index] = { ...productCopy[index], quantity: value };
    setData({ ...data, products: productCopy });
  };

  const onAddProductClick = () => {
    setData({
      ...data,
      products: [...data.products, { label: "", value: "" }],
    });
  };

  return (
    <Dialog
      open={isModalOpen}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      maxWidth="sm"
      onClose={handleCancel}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <div className={classes.container}>
          <div>
            <h6>Order Id</h6>
            <input
              name={"orderId"}
              type="text"
              value={data.orderId}
              onChange={onDataChange}
            />
          </div>
          <div>
            <h6>Customer Name</h6>
            <input
              name={"customerName"}
              type="text"
              value={data.customerName}
              onChange={onDataChange}
            />
          </div>
          <div>
            <h6>Email</h6>
            <input
              name={"email"}
              type="email"
              value={data.email}
              onChange={onDataChange}
            />
          </div>
          <div>
            <h6>Mobile Number</h6>
            <input
              name={"mobileNumber"}
              type="number"
              value={data.mobileNumber}
              onChange={onDataChange}
            />
          </div>
          <div>
            <h6>Gst Percentage</h6>
            <input
              name={"gstPercentage"}
              type="number"
              value={data.gstPercentage}
              onChange={onDataChange}
            />
          </div>
          <div>
            <h6>Address</h6>
            <input
              name={"address"}
              type="text"
              value={data.address}
              onChange={onDataChange}
            />
          </div>
          <div>
            <h6>Pincode</h6>
            <input
              name={"pinCode"}
              type="text"
              value={data.pinCode}
              onChange={onDataChange}
            />
          </div>
          <div>
            <h6>Total Price</h6>
            <input
              name={"totalPrice"}
              disabled
              type="number"
              value={totalPrice}
              onChange={onDataChange}
            />
          </div>
          <div>
            <h6>Advance Paid</h6>
            <input
              name={"advancePaid"}
              type="number"
              value={data.advancePaid}
              onChange={onDataChange}
            />
          </div>
          <div>
            <h6>Shipment Price</h6>
            <input
              name={"shipmentPrice"}
              type="number"
              value={data.shipmentPrice}
              onChange={onDataChange}
            />
          </div>
          <div>
            <h6>Need to Pay</h6>
            <input
              type="number"
              disabled
              value={totalPrice - parseInt(data.advancePaid)}
              onChange={onDataChange}
            />
          </div>
        </div>
        <div className={classes.container}>
          {data.products.map((product, index) => (
            <>
              <div>
                <h6>Product</h6>
                <Select
                  value={product}
                  menuPosition="fixed"
                  onChange={(value) => onSelectChange(value, index)}
                  inputValue={""}
                  options={products}
                />
              </div>
              <div>
                <div>
                  <h6>Quantity</h6>
                  <input
                    type="number"
                    value={product.quantity}
                    onChange={(e) => onQuantityChange(e.target.value, index)}
                  />
                </div>
              </div>
            </>
          ))}
          <button onClick={onAddProductClick}>Add Product</button>
        </div>
        <div className={classes.container}></div>
        <div className={classes.container}></div>
      </DialogContent>
      <div className={classes.btnCon}>
        <button className={"cancel"} onClick={handleCancel}>
          CANCEL
        </button>
        <button className={"add"}>{editData !== null ? "EDIT" : "ADD"}</button>
      </div>
    </Dialog>
  );
};

export default AddOrderModal;

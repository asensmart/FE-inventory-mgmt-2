import React, { useState } from "react";
import { makeStyles, ThemeProvider } from "@mui/styles";
import { Colors } from "../../../helpers/Colors";
import FullScreenProgress from "../../../shared/FullScreenProgress";
import Snackbar from "../../../shared/Snackbar";
import { getOrders, postOrder } from "../../../helpers/AxiosHelper";
import { useNavigate } from "react-router-dom";
import { createTheme, Radio } from "@mui/material";
import { useDispatch } from "react-redux";
import { setOrder } from "../../../redux/slice/OrderSlice";
import { getFilteredResponds } from "../../../helpers/HelperFuctions";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import axios from "axios";

const useStyles = makeStyles({
  container: {
    marginTop: "25px",
    "& hr": {
      border: 0,
      borderBottom: `2px dashed ${Colors.light2}`,
    },
    "& .form-con": {
      margin: "40px 0",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridGap: "15px",
      "& .details": {
        marginBottom: "0",
        "& .title": {
          fontSize: "16px",
          fontWeight: "bold",
          color: Colors.dark3,
          margin: "0 0 8px",
        },
        "& .description": {
          fontSize: "14px",
          width: "80%",
          color: Colors.dark4,
          margin: "0",
        },
      },
      "& .card-con": {
        borderRadius: "10px",
        padding: "20px 20px 0",
        background: Colors.light,
        boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)",
        border: `1px solid ${Colors.light1}`,
        "& .input-con": {
          marginBottom: "20px",
          "& h6": {
            fontSize: "14px",
            fontWeight: "bold",
            color: Colors.dark3,
            margin: "0 0 8px",
          },
          "& input": {
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            "&::-webkit-inner-spin-button": {
              "-webkit-appearance": "none",
            },
            "&::-webkit-outer-spin-button": {
              "-webkit-appearance": "none",
            },
            border: `1px solid ${Colors.light2}`,
            transition: "all .4s",
            boxSizing: "border-box",
            "&:focus": {
              outline: 0,
              border: `1px solid ${Colors.primary}`,
              transition: "all .4s",
            },
          },
          "& .radio-con": {
            display: "flex",
            marginLeft: "-10px",
            "& div": {
              marginRight: "15px",
              display: "flex",
              alignItems: "center",
              "& h6": {
                fontSize: "14px",
                color: Colors.dark3,
                margin: "0",
              },
            },
          },
        },
        "& .date-con": {
          marginBottom: "20px",
          "& h6": {
            fontSize: "14px",
            fontWeight: "bold",
            color: Colors.dark3,
            margin: "0 0 12px",
          },
          "& .date": {
            border: `1px solid ${Colors.light2}`,
            borderRadius: "5px",
            padding: "3px 10px",
            "& .MuiFormControl-marginNormal": {
              margin: 0,
            },
            "& .MuiIconButton-root": {
              padding: 0,
            },
          },
        },
      },
    },
    "& .action-con": {
      "& .btn-con": {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "30px",
        "& button": {
          padding: "8px 12px",
          background: Colors.primary,
          color: Colors.light,
          fontWeight: "bold",
          borderRadius: "5px",
          cursor: "pointer",
          border: `1px solid ${Colors.primary}`,
          transition: "all .4s",
          "&:focus": {
            outline: 0,
          },
          "&:hover": {
            transition: "all .4s",
            background: Colors.light,
            color: Colors.primary,
          },
        },
      },
    },
  },
});

const AddPriceInfo = ({ data, setData, totalPrice }) => {
  const classes = useStyles();

  const [message, setMessage] = useState({
    open: false,
    text: "",
    type: "success",
  });

  const onDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onCreateClick = () => {
    const {
      orderId,
      courier,
      customerName,
      orderedDate,
      isPrepaid,
      email,
      products,
      mobileNumber,
      gstPercentage,
      address,
      pinCode,
      advancePaid,
      shipmentProfit,
      totalWeight,
      breadth,
      height,
      length,
    } = data;

    if (
      orderId !== "" &&
      customerName !== "" &&
      email !== "" &&
      products.length > 0 &&
      mobileNumber !== "" &&
      gstPercentage !== "" &&
      address !== "" &&
      pinCode !== "" &&
      advancePaid !== "" &&
      shipmentProfit !== "" &&
      totalWeight !== "" &&
      breadth !== "" &&
      height !== "" &&
      length !== ""
    ) {
      if (products[products.length - 1]._id) {
        setLoading(true);
        const dbData = {
          orderId,
          customerName,
          email,
          isPrepaid,
          products,
          mobileNumber,
          courier,
          gstPercentage: parseInt(gstPercentage),
          address,
          orderedDate,
          totalPrice,
          pinCode: parseInt(pinCode),
          advancePaid: !isPrepaid ? parseInt(advancePaid) : totalPrice,
          shipmentProfit: parseInt(shipmentProfit),
          totalWeight: parseFloat(totalWeight),
          breadth: parseFloat(breadth),
          height: parseFloat(height),
          length: parseFloat(length),
        };

        postOrder(dbData)
          .then((res) => {
            if (res.data.key === "success") {
              getOrders().then((res) => {
                const promises = res.data.map((obj) => {
                  return getFilteredResponds(obj);
                });
                Promise.allSettled(promises).then((allRes) => {
                  const ordersTemp = allRes.map((r) => r.value).reverse();
                  dispatch(setOrder(ordersTemp));
                  setMessage({
                    open: true,
                    text: "Order Placed",
                    type: "success",
                  });
                  navigate(-1);
                });
              });
            } else {
              console.log(res.data);
              setMessage({ open: true, text: res.data.message, type: "error" });
              setLoading(false);
            }
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      } else {
        setMessage({
          open: true,
          text: "Enter Product Details",
          type: "error",
        });
      }
    } else {
      setMessage({
        open: true,
        text: "All Fields are required",
        type: "error",
      });
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: Colors.primary,
      },
    },
  });

  const handleDateChange = (date) => {
    setData({ ...data, orderedDate: date });
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ThemeProvider theme={theme}>
        <div className={classes.container}>
          <hr />
          <div className={"form-con"}>
            <div className={"details"}>
              <h6 className={"title"}>Price Information</h6>
              <h6 className={"description"}>
                Add your shipping profit, advance and etc
              </h6>
            </div>
            <div className={"card-con"}>
              <div className={"input-con"}>
                <h6>Total Price</h6>
                <input type="number" value={totalPrice} disabled />
              </div>
              <div className={"input-con"}>
                <h6>Gst Percentage</h6>
                <input
                  type="number"
                  value={data.gstPercentage}
                  name={"gstPercentage"}
                  onChange={onDataChange}
                />
              </div>
              <div className={"input-con"}>
                <h6>Shipment Price</h6>
                <input
                  type="number"
                  value={data.shipmentProfit}
                  name={"shipmentProfit"}
                  onChange={onDataChange}
                />
              </div>
              <div className={"input-con"}>
                <h6>Total Weight</h6>
                <input
                  type="number"
                  value={data.totalWeight}
                  name={"totalWeight"}
                  onChange={onDataChange}
                />
              </div>
              <div className={"input-con"}>
                <h6>Length</h6>
                <input
                  type="number"
                  value={data.length}
                  name={"length"}
                  onChange={onDataChange}
                  placeholder={"Enter the value in cms"}
                />
              </div>
              <div className={"input-con"}>
                <h6>Breadth</h6>
                <input
                  type="number"
                  value={data.breadth}
                  name={"breadth"}
                  onChange={onDataChange}
                  placeholder={"Enter the value in cms"}
                />
              </div>
              <div className={"input-con"}>
                <h6>Height</h6>
                <input
                  type="number"
                  value={data.height}
                  name={"height"}
                  onChange={onDataChange}
                  placeholder={"Enter the value in cms"}
                />
              </div>
              {!data.isPrepaid && (
                <>
                  <div className={"input-con"}>
                    <h6>Advance Paid</h6>
                    <input
                      type="number"
                      value={data.advancePaid}
                      name={"advancePaid"}
                      onChange={onDataChange}
                    />
                  </div>
                  <div className={"input-con"}>
                    <h6>Need to pay</h6>
                    <input
                      type="number"
                      value={totalPrice - parseInt(data.advancePaid)}
                    />
                  </div>
                </>
              )}
              <div className={"input-con"}>
                <div className={"radio-con"}>
                  <div onClick={() => setData({ ...data, isPrepaid: true })}>
                    <Radio color={"primary"} checked={data.isPrepaid} />
                    <h6>Prepaid</h6>
                  </div>
                  <div onClick={() => setData({ ...data, isPrepaid: false })}>
                    <Radio checked={!data.isPrepaid} />
                    <h6>COD</h6>
                  </div>
                </div>
              </div>
              <div className={"date-con"}>
                <h6>Ordered Date</h6>
                <div style={{ display: "flex" }}>
                  <div className={"date"}>
                    <KeyboardDatePicker
                      margin="normal"
                      format="dd/MM/yyyy"
                      value={data.orderedDate}
                      onChange={handleDateChange}
                      InputProps={{
                        disableUnderline: true,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={"action-con"}>
            <hr />
            <div className={"btn-con"}>
              <button onClick={onCreateClick}>Create Order</button>
            </div>
          </div>
          <FullScreenProgress open={loading} setOpen={setLoading} />
          <Snackbar message={message} setMessage={setMessage} />
        </div>
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
};

export default AddPriceInfo;

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, Slide } from "@mui/material";
import Select from "react-select";
import { makeStyles } from "@mui/styles";
import { Colors } from "../../../helpers/Colors";
import Snackbar from "../../../shared/Snackbar";
import { getOrders, updateReplacement } from "../../../helpers/AxiosHelper";
import { getFilteredResponds } from "../../../helpers/HelperFuctions";
import { setOrder } from "../../../redux/slice/OrderSlice";
import { useDispatch } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
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

const EditReplacementModal = ({
  isModalOpen,
  setIsModalOpen,
  couriers,
  selectedOrder,
  setLoading,
}) => {
  const defaultData = {
    replacementOrderId: "",
    replacementCourier: null,
    replacementAwbNumber: "",
  };

  const [data, setData] = useState(defaultData);

  const [message, setMessage] = useState({
    open: false,
    text: "",
    type: "success",
  });

  const classes = useStyles();

  const onDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSelectChange = (so) => {
    setData({ ...data, replacementCourier: so });
  };

  useEffect(() => {
    if (selectedOrder !== null) {
      setData({ ...data, replacementOrderId: selectedOrder.orderId + "REP" });
    }
  }, [selectedOrder]);

  const handleCancel = () => {
    setIsModalOpen(false);
    setData(defaultData);
  };

  const dispatch = useDispatch();

  const onAddClick = () => {
    const { replacementCourier, replacementOrderId, replacementAwbNumber } =
      data;
    if (
      replacementCourier !== null &&
      replacementOrderId !== "" &&
      replacementAwbNumber !== ""
    ) {
      const dbData = {
        id: selectedOrder._id,
        replacementCourier,
        replacementOrderId,
        replacementAwbNumber,
      };
      setLoading(true);
      updateReplacement(dbData)
        .then((dbRes) => {
          if (dbRes.data.key === "success") {
            getOrders().then((res) => {
              const promises = res.data.map((obj) => {
                return getFilteredResponds(obj);
              });
              Promise.allSettled(promises).then((allRes) => {
                const ordersTemp = allRes.map((r) => r.value).reverse();
                dispatch(setOrder(ordersTemp));
                setLoading(false);
                handleCancel();
                setMessage({ open: true, text: "Updated", type: "success" });
              });
            });
          } else {
            setLoading(false);
            setMessage({ open: true, text: dbRes.data.message, type: "error" });
          }
        })
        .catch((err) => {
          setMessage({
            open: true,
            text: "Something went wrong",
            type: "error",
          });
          setLoading(false);
        });
    } else {
      setMessage({
        open: true,
        text: "All Fields are required",
        type: "error",
      });
    }
  };

  return (
    <Dialog
      open={isModalOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCancel}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <div className={classes.container}>
          <div>
            <h6>Order ID</h6>
            <input
              name={"replacementOrderId"}
              type="text"
              value={data.replacementOrderId}
              onChange={onDataChange}
            />
          </div>
          <div>
            <h6>Courier</h6>
            <Select
              value={data.replacementCourier}
              menuPosition="fixed"
              onChange={onSelectChange}
              options={couriers}
            />
          </div>
          <div>
            <h6>Awb Number</h6>
            <input
              name={"replacementAwbNumber"}
              type="number"
              value={data.replacementAwbNumber}
              onChange={onDataChange}
            />
          </div>
        </div>
      </DialogContent>
      <div className={classes.btnCon}>
        <button className={"cancel"} onClick={handleCancel}>
          CANCEL
        </button>
        <button className={"add"} onClick={onAddClick}>
          ADD
        </button>
      </div>
      <Snackbar message={message} setMessage={setMessage} />
    </Dialog>
  );
};

export default EditReplacementModal;

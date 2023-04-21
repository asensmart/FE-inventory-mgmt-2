import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, Slide } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Colors } from "../../../helpers/Colors";
import {
  getProducts,
  postProduct,
  updateProduct,
} from "../../../helpers/AxiosHelper";

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

const AddProductModal = ({
  isModalOpen,
  setIsModalOpen,
  setFilteredData,
  setLoading,
  setProducts,
  editData,
  setEditData,
}) => {
  const defaultValue = {
    name: "",
    stock: "1",
    vendorName: "",
    purchasedPrice: "0",
  };

  const classes = useStyles();

  const [data, setData] = useState(defaultValue);

  const handleCancel = () => {
    setIsModalOpen(false);
    setData(defaultValue);
    setEditData(null);
  };

  useEffect(() => {
    setData(editData !== null ? editData : defaultValue);
  }, [editData]);

  const onDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onAddClick = () => {
    const { name, stock, vendorName, purchasedPrice } = data;
    if (
      name !== "" &&
      vendorName !== "" &&
      stock !== "" &&
      purchasedPrice !== ""
    ) {
      setLoading(true);
      const dbData = {
        name,
        vendorName,
        stock: parseInt(stock),
        purchasedPrice: parseInt(purchasedPrice),
      };
      if (editData !== null) {
        dbData._id = data._id;
        updateProduct(dbData)
          .then((res) => {
            if (res.data.key === "success") {
              getProducts()
                .then((res) => {
                  setData(defaultValue);
                  setProducts(res.data.reverse());
                  setFilteredData([]);
                  setLoading(false);
                  handleCancel();
                })
                .catch(() => {
                  setLoading(false);
                });
            } else {
              setLoading(false);
            }
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      } else {
        postProduct(dbData)
          .then((res) => {
            if (res.data.key === "success") {
              getProducts()
                .then((res) => {
                  setData(defaultValue);
                  setProducts(res.data.reverse());
                  setFilteredData([]);
                  setLoading(false);
                  handleCancel();
                })
                .catch(() => {
                  setLoading(false);
                });
            } else {
              setLoading(false);
            }
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      }
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
            <h6>Product Name</h6>
            <input
              name={"name"}
              type="text"
              value={data.name}
              onChange={onDataChange}
              disabled={true}
            />
          </div>
          <div>
            <h6>Stock</h6>
            <input
              name={"stock"}
              type="number"
              value={data.stock}
              onChange={onDataChange}
            />
          </div>
          {/* <div>
                <h6>Vendor Name</h6>
                <input name={'vendorName'} type="text" value={data.vendorName} onChange={onDataChange}/>
              </div iv> */}
          <div>
            <h6>Purchased Price</h6>
            <input
              name={"purchasedPrice"}
              type="number"
              value={data.purchasedPrice}
              onChange={onDataChange}
              disabled={true}
            />
          </div>
        </div>
      </DialogContent>
      <div className={classes.btnCon}>
        <button className={"cancel"} onClick={handleCancel}>
          CANCEL
        </button>
        <button className={"add"} onClick={onAddClick}>
          {editData !== null ? "EDIT" : "ADD"}
        </button>
      </div>
    </Dialog>
  );
};

export default AddProductModal;

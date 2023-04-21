import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, Slide } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Colors } from "../../../helpers/Colors";
import {
  getExpenses,
  postExpense,
  updateExpense,
} from "../../../helpers/AxiosHelper";
import Select from "react-select";

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

const AddExpenseModal = ({
  isModalOpen,
  setIsModalOpen,
  setFilteredData,
  setLoading,
  setExpenses,
  editData,
  setEditData,
}) => {
  const defaultValue = {
    type: { value: "salary", label: "Salary" },
    price: "0",
    paidTo: "",
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
    const { type, paidTo, price } = data;
    if (paidTo !== "" && price) {
      setLoading(true);
      const dbData = {
        type,
        paidTo,
        price: parseInt(price),
      };
      if (editData !== null) {
        dbData._id = data._id;
        updateExpense(dbData)
          .then((res) => {
            if (res.data.key === "success") {
              getExpenses()
                .then((res) => {
                  setData(defaultValue);
                  setExpenses(res.data.reverse());
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
        postExpense(dbData)
          .then((res) => {
            if (res.data.key === "success") {
              getExpenses()
                .then((res) => {
                  setData(defaultValue);
                  setExpenses(res.data.reverse());
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

  const options = [
    { value: "salary", label: "Salary" },
    { value: "bonus", label: "Bonus" },
    { value: "promotion", label: "Promotion" },
    { value: "ownExpenses", label: "Own Expenses" },
    { value: "others", label: "Others" },
  ];

  const onSelectChange = (so) => {
    setData({ ...data, type: so });
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
            <h6>Paid To</h6>
            <input
              name={"paidTo"}
              type="text"
              value={data.paidTo}
              onChange={onDataChange}
            />
          </div>
          <div>
            <h6>Type</h6>
            <Select
              value={data.type}
              menuPosition="fixed"
              onChange={onSelectChange}
              inputValue={""}
              options={options}
            />
          </div>
          <div>
            <h6>Price</h6>
            <input
              name={"price"}
              type="number"
              value={data.price}
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
          {editData !== null ? "EDIT" : "ADD"}
        </button>
      </div>
    </Dialog>
  );
};

export default AddExpenseModal;

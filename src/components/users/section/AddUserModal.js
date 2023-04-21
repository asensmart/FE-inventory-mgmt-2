import React, { useEffect, useState } from "react";
import { getUsers, postUser, updateUser } from "../../../helpers/AxiosHelper";
import { Dialog, DialogContent, Slide } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Colors } from "../../../helpers/Colors";
import Snackbar from "../../../shared/Snackbar";

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

const AddUserModal = ({
  isModalOpen,
  setIsModalOpen,
  setFilteredData,
  setLoading,
  setUsers,
  editData,
  setEditData,
}) => {
  const defaultValue = {
    name: "",
    username: "",
    password: "",
    role: "",
  };

  const classes = useStyles();

  const [data, setData] = useState(defaultValue);

  const [message, setMessage] = useState({
    open: false,
    text: "",
    type: "success",
  });

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
    const { name, password, role, username } = data;
    if (name !== "" && role !== "" && username !== "") {
      setLoading(true);
      const dbData = {
        name,
        password,
        role,
        username,
      };
      if (editData !== null) {
        dbData._id = data._id;
        if (password !== "") {
          dbData.isPasswordChanged = true;
        }
        updateUser(dbData)
          .then((res) => {
            if (res.data.key === "success") {
              getUsers()
                .then((res) => {
                  setData(defaultValue);
                  setUsers(res.data);
                  setFilteredData([]);
                  setLoading(false);
                  handleCancel();
                })
                .catch(() => {
                  setLoading(false);
                });
            } else {
              setMessage({ open: true, text: res.data.message, type: "error" });
              setLoading(false);
            }
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      } else {
        if (password !== "") {
          postUser(dbData)
            .then((res) => {
              if (res.data.key === "success") {
                getUsers()
                  .then((res) => {
                    setData(defaultValue);
                    setUsers(res.data);
                    setFilteredData([]);
                    setLoading(false);
                    handleCancel();
                  })
                  .catch(() => {
                    setLoading(false);
                  });
              } else {
                setMessage({
                  open: true,
                  text: res.data.message,
                  type: "error",
                });
                setLoading(false);
              }
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            });
        }
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
            <h6>Full Name</h6>
            <input
              name={"name"}
              type="text"
              value={data.name}
              onChange={onDataChange}
            />
          </div>
          <div>
            <h6>Username</h6>
            <input
              name={"username"}
              disabled={editData !== null}
              type="text"
              value={data.username}
              onChange={onDataChange}
            />
          </div>
          <div>
            <h6>Role</h6>
            <input
              name={"role"}
              type="text"
              value={data.role}
              onChange={onDataChange}
            />
          </div>
          <div>
            <h6>Password</h6>
            <input
              name={"password"}
              type="password"
              value={data.password}
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
      <Snackbar setMessage={setMessage} message={message} />
    </Dialog>
  );
};

export default AddUserModal;

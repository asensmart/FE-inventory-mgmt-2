import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
// import { Button, Modal } from 'antd';
// import Modal from 'react-modal';
import { Colors } from "../../../helpers/Colors";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { BiEdit } from "react-icons/bi";
import {
  deleteVendorCredit,
  getVendorCredits,
  payupdate,
} from "../../../helpers/AxiosHelper";
import Popup from "./Popup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../vendorcredits/section/credittable.css";
import axios from "axios";
import { backendUrl } from "../../..";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";

const useStyles = makeStyles({
  tableHeader: {
    fontSize: "15px",
    fontWeight: "700",
    color: Colors.dark3,
  },
  container: {
    marginTop: "50px",
    // "& .editbtn": {
    //   // display:'flex',
    //   background: Colors.primary,
    //   color: Colors.light,
    //   padding: "8px 20px 8px 20px",
    //   border: `1px solid ${Colors.primary}`,
    //   borderRadius: "5px",
    //   fontSize: "14px",
    //   fontFamily: "inherit",
    //   transition: "all .5s",
    //   cursor: "pointer",
    //   outline: 0,
    // },
    ModalBody: {
      background: Colors.primary,
    },
  },
  actionCon: {
    "& .edit": {
      color: Colors.primary,
      fontSize: "22px",
      marginRight: "5px",
      cursor: "pointer",
    },
    "& .delete": {
      color: Colors.danger,
      fontSize: "22px",
      marginRight: "0",
      cursor: "pointer",
    },
  },
});

const CreditTable = ({ tabFiltered, filteredData, value }) => {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [vendorCredits, setVendorCredits] = useState([]);
  const [name, setname] = useState();
  const [openmodal, setopenmodal] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [submit, setSubmit] = useState(true);

  const onSubmit = () => {
    setSubmit(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlesubmit = (event) => {
    event.preventDefault();
    console.log(activeItem);
    const putdata = {
      paidAmt: name,
    };

    axios
      .put(`${backendUrl}/update/vendorCredit/${activeItem._id}`, putdata)
      .then((res) => {
        console.log("response", res);
        setname("");
        alert(res.data.message);
        setShow(false);
      })
      .catch((err) => {
        console.log("err => ", err);
        alert(err.response.data.message);
      });
  };

  useEffect(() => {
    getVendorCredits().then((res) => {
      setVendorCredits(res.data.data);
    });
  }, []);

  useEffect(() => {
    getVendorCredits().then((res) => {
      console.log("Data", res.data);
      setVendorCredits(res.data.data);
    });
  }, [show]);

  const data = filteredData.length > 0 ? filteredData : tabFiltered;

  const onDeleteProductClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.danger,
      cancelButtonColor: Colors.success,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteVendorCredit(id).then(() => {
          Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
            () => {
              getVendorCredits().then((res) => {
                setVendorCredits(res.data.data);
              });
            }
          );
        });
      }
    });
  };

  return (
    <div className={classes.container}>
      {JSON.stringify(vendorCredits.data)}
      <Paper>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <div className={classes.tableHeader}>S.no</div>
                </TableCell>
                <TableCell align="center">
                  <div className={classes.tableHeader}>Vendor Name</div>
                </TableCell>
                <TableCell align="center">
                  <div className={classes.tableHeader}>Invoice No</div>
                </TableCell>
                <TableCell align="center">
                  <div className={classes.tableHeader}>Purchase Date</div>
                </TableCell>
                <TableCell align="center">
                  <div className={classes.tableHeader}>Total Amt</div>
                </TableCell>

                <TableCell align="center">
                  <div className={classes.tableHeader}>Balance Amt</div>
                </TableCell>
                <TableCell align="center">
                  <div className={classes.tableHeader}>Total Due</div>
                </TableCell>
                <TableCell align="center">
                  <div className={classes.tableHeader}>Edit</div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vendorCredits
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => {
                  return (
                    <TableRow key={item._id}>
                      <TableCell component="th" scope="row" align="left">
                        <div>{index + 1}</div>
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        <div>{item.vendor_id.vendorName}</div>
                      </TableCell>

                      <TableCell component="th" scope="row" align="center">
                        <div>{item.invoiceNo}</div>
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        <div>
                          {new Date(item.purchaseDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        <div>{item.totalAmt}</div>
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        <div>
                          {parseFloat(item.totalAmt) - parseFloat(item.paidAmt)}
                        </div>
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {item.totDueAmt}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {/* <button
                          className="editbtn"
                          onClick={() => {
                            setActiveItem(item);
                            handleShow();
                          }}
                        >
                          <BiEdit />
                        </button> */}
                        <div className={classes.actionCon}>
                          <BiEdit
                            className={"edit"}
                            onClick={() => {
                              setActiveItem(item);
                              handleShow();
                            }}
                          />
                          <MdDeleteOutline
                            className={"delete"}
                            onClick={() => onDeleteProductClick(item._id)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={vendorCredits.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {openmodal && <Popup closeModal={setopenmodal} />}

      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <form onSubmit={handlesubmit} className={classes.onclickPage}>
            <label style={{ fontWeight: "500", fontSize: "20px" }}>
              Vendor Name:
            </label>
            <p style={{ fontSize: "18px" }}>
              {activeItem !== null && activeItem.vendor_id.vendorName}
            </p>

            <label style={{ fontWeight: "500", fontSize: "20px" }}>
              Invoice No
            </label>
            <p>{activeItem !== null && activeItem.invoiceNo}</p>

            <label style={{ fontWeight: "500", fontSize: "20px" }}>
              Purchase Date
            </label>
            <p>{activeItem !== null && activeItem.purchaseDate}</p>

            <label style={{ fontWeight: "500", fontSize: "20px" }}>
              Total Amount
            </label>
            <p>{activeItem !== null && activeItem.totalAmt}</p>

            <label style={{ fontWeight: "500", fontSize: "20px" }}>
              Balance Amount
            </label>
            <p>
              {activeItem !== null &&
                parseFloat(activeItem.totalAmt) -
                  parseFloat(activeItem.paidAmt)}
            </p>

            <label style={{ fontWeight: "500", fontSize: "20px" }}>
              Total Due
            </label>
            <p>{activeItem !== null && activeItem.totDueAmt}</p>

            <label style={{ fontWeight: "500", fontSize: "20px" }}>Pay:</label>
            <input
              style={{
                borderRadius: "5px",
                marginLeft: "5px",
                padding: "5px 0px",
              }}
              type={"number"}
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
            <button
              className={"f_button"}
              style={{
                borderRadius: "5px",
                marginLeft: "10px",
                padding: "6px 15px",
              }}
              onClick={onSubmit}
              value={submit}
            >
              Submit
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreditTable;

import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Colors } from "../../../helpers/Colors";
import {
  Dialog,
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
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  deleteOrder,
  getOrders,
  moveToReplacement,
} from "../../../helpers/AxiosHelper";
import { useDispatch } from "react-redux";
import { setOrder } from "../../../redux/slice/OrderSlice";
import { RiLogoutBoxRLine } from "react-icons/ri";
import {
  getDeliveryColorCode,
  getFilteredResponds,
} from "../../../helpers/HelperFuctions";
import { IoMdClose } from "react-icons/io";
import { ImInfo } from "react-icons/im";
import Invoice from "./invoice";
import Invoices from "./invoice/invoices";
import { FiDownload } from "react-icons/fi";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { useRef } from "react";
import { AiOutlinePrinter } from "react-icons/ai";
import Checkbox from "@mui/material/Checkbox";
import html2canvas from "html2canvas";

const useStyles = makeStyles({
  tableHeader: {
    fontSize: "15px",
    fontWeight: "700",
    color: Colors.dark3,
  },
  print: {
    "& div": {
      display: "flex",
      flexDirection: "row-reverse",
      "& .print-head": {
        background: Colors.success,
        border: `1px solid ${Colors.success}`,
        borderRadius: "5px",
        color: Colors.light,
        margin: "10px 10px 10px 0px",
        padding: "5px 25px",
        fontSize: "20px",
        outline: 0,
        fontFamily: "inherit",
        transition: "all .5s",
        cursor: "pointer",
        "&:hover": {
          background: Colors.light,
          color: Colors.success,
        },
      },
    },
  },
  container: {
    background: Colors.light,
    borderRadius: "5px",
  },
  tabBody: {
    height: 300,
    overflow: "scroll",
  },
  checkBox: {
    position: "relative",
  },
  cusDetCon: {
    position: "relative",
    "& h6": {
      fontSize: "14px",
      color: Colors.dark3,
      margin: "0 0 5px",
      textTransform: "capitalize",
    },
    "& .icon-con": {
      position: "absolute",
      overFlow: "auto",
      left: 0,
      // bottom: -20,
      "& .icon": {
        fontSize: "16px",
        cursor: "pointer",
        color: Colors.primary,
      },
      "& .address-con": {
        position: "absolute",
        // left: 20,
        background: Colors.light,
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        borderRadius: "5px",
        padding: "10px",
        width: "250px",
        left: 15,
        bottom: 15,
        "& .close": {
          float: "right",
          cursor: "pointer",
          fontSize: "18px",
        },
      },
    },
  },
  ordDetCon: {
    "& h6": {
      fontSize: "14px",
      color: Colors.dark3,
      margin: "0 0 10px",
      textTransform: "capitalize",
    },
    "& div": {
      display: "flex",
      margin: "0 0 3px",
      justifyContent: "center",
      "& h5": {
        fontSize: "14px",
        color: Colors.dark3,
        margin: "0",
        textTransform: "capitalize",
      },
      "& h6": {
        fontSize: "14px",
        color: Colors.success,
        margin: "0 15px",
        fontWeight: "700",
        textTransform: "capitalize",
      },
    },
  },
  priceCon: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    "& h6": {
      fontSize: "14px",
      color: Colors.dark3,
      margin: "0 0 5px",
      textTransform: "capitalize",
      "& span": {
        color: Colors.success,
        fontWeight: "700",
      },
      "& .red": {
        color: Colors.danger,
      },
    },
  },
  statusCon: {
    fontSize: "12px",
    color: Colors.light,
    background: `${Colors.success}`,
    borderRadius: "25px",
    width: "100px",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    padding: "4px 6px",
    letterSpacing: "1px",
    margin: "0 auto",
    textTransform: "capitalize",
  },
  typeCon: {
    fontSize: "14px",
    letterSpacing: "1px",
    margin: "0",
    textTransform: "capitalize",
  },
  actionCon: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridColumnGap: "5px",
    gridRowGap: "10px",
    "& .edit": {
      color: Colors.primary,
      fontSize: "22px",
      // marginRight: '5px',
    },
    "& .delete": {
      color: Colors.danger,
      fontSize: "22px",
      marginRight: "0",
    },
  },
  checkbokTabCell: {
    minWidth: "50px",
  },
  tabCell: {
    minWidth: "200px",
  },
  actionStyle: {
    display: "flex",
    flexDirection: "column-reverse",
    position: "fixed",
    right: "21%",
    top: 25,
    zIndex: 9999999999,
    "& .icon": {
      fontSize: "30px",
      margin: "10px",
      color: Colors.light,
      cursor: "pointer",
    },
  },
  dialogStyle: {
    // width: '750px ',
    width: "900px !important",
    margin: "0 auto",
    height: "100vh !important",
    overflow: "hidden",
    "& .MuiDialog-paperFullWidth": {
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
  },
});

const SingleRow = ({
  row,
  classes,
  setFilteredData,
  setLoading,
  onInvoiceClick,
  orders,
  setOrders,
  headCheckBox,
  setHeadCheckBox,
}) => {
  const navigate = useNavigate();

  const [viewAddress, setViewAddress] = useState(false);
  const [checkBox, setcheckBox] = useState(false);

  const dispatch = useDispatch();

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
        setLoading(true);
        deleteOrder(id).then(() => {
          setLoading(false);
          Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
            () => {
              setLoading(true);
              getOrders().then((res) => {
                const promises = res.data.map((obj) => {
                  return getFilteredResponds(obj);
                });
                Promise.allSettled(promises).then((allRes) => {
                  const ordersTemp = allRes.map((r) => r.value).reverse();
                  dispatch(setOrder(ordersTemp));
                  setFilteredData([]);
                  setLoading(false);
                });
              });
            }
          );
        });
      }
    });
  };

  const getStatusText = (row) => {
    if (row.awbNumber) {
      if (row.isReplacement) {
        return "Delivered";
      } else if (row.shipWayRes) {
        return row.shipWayRes.status === "Success"
          ? row.shipWayRes.response.current_status
          : "Error Occurred";
      } else {
        return "---";
      }
    } else {
      return "Placed";
    }
  };

  const getDeliveryColor = (row) => {
    if (row.awbNumber) {
      if (row.isReplacement) {
        return Colors.success;
      } else if (row.shipWayRes) {
        const code =
          row.shipWayRes.status === "Success"
            ? row.shipWayRes.response.current_status_code
            : "24";
        return getDeliveryColorCode(code);
      } else {
        return "---";
      }
    } else {
      return Colors.purple;
    }
  };

  const onMoveClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to move this to replacement",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.danger,
      cancelButtonColor: Colors.success,
      confirmButtonText: "Yes, move it!",
    }).then((result) => {
      if (result.isConfirmed) {
        moveToReplacement(id).then(() => {
          Swal.fire("Moved!", "Your order has been moved.", "success").then(
            () => {
              setLoading(true);
              getOrders().then((res) => {
                const promises = res.data.map((obj) => {
                  return getFilteredResponds(obj);
                });
                Promise.allSettled(promises).then((allRes) => {
                  const ordersTemp = allRes.map((r) => r.value).reverse();
                  dispatch(setOrder(ordersTemp));
                  setFilteredData([]);
                  setLoading(false);
                });
              });
            }
          );
        });
      }
    });
  };

  const canShowMove = (row) => {
    if (row.awbNumber && !row.isReplacement) {
      if (row.shipWayRes.status === "Success") {
        return row.shipWayRes.response.current_status_code === "DEL";
      }
    }
    return false;
  };

  useEffect(() => {
    const filterOrder = orders.filter((b) => b._id === row._id);
    if (filterOrder.length > 0) {
      setcheckBox(true);
    } else {
      setcheckBox(false);
    }
  }, [orders, headCheckBox]);

  const handleChange = (e) => {
    if (e.target.checked) {
      setOrders([...orders, row]);
    } else {
      const filterOrders = orders.filter((b) => b._id !== row._id);
      setHeadCheckBox(false);
      setOrders(filterOrders);
    }
  };

  return (
    <TableRow key={row._id}>
      <TableCell component="th" scope="row">
        <div className={classes.checkBox}>
          <h6>
            <Checkbox checked={checkBox} onChange={handleChange} />
          </h6>
        </div>
      </TableCell>
      <TableCell component="th" scope="row">
        <div className={classes.cusDetCon}>
          <h6>{row.customerName}</h6>
          {/*<h6>{row.address}</h6>*/}
          {/*<h6>{row.pinCode}</h6>*/}
          <h6>{row.mobileNumber}</h6>
          <div className={"icon-con"}>
            <ImInfo className={"icon"} onClick={() => setViewAddress(true)} />
            {viewAddress && (
              <div className={"address-con"}>
                <IoMdClose
                  className={"close"}
                  onClick={() => setViewAddress(false)}
                />
                <div>
                  {row.address} <br />
                  {row.pinCode}
                </div>
              </div>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell align={"center"} component="th" scope="row">
        <div className={classes.ordDetCon}>
          <h6>Order Id: {row.orderId}</h6>
          {row.products.map((p) => (
            <div>
              <div>
                <h5>{p.name}</h5>
                <h6>X {p.quantity}</h6>
              </div>
              <h5>{p.vendorName}</h5>
            </div>
          ))}
        </div>
      </TableCell>
      <TableCell align={"center"} component="th" scope="row">
        <div className={classes.cusDetCon}>
          <h6> {row.awbNumber ? row.awbNumber : "Not Added"}</h6>
          <h6>{row.courier ? row.courier.courier_name : "Not Added"}</h6>
        </div>
      </TableCell>
      <TableCell align="center">
        <h6
          className={classes.statusCon}
          style={{ background: getDeliveryColor(row) }}
        >
          {getStatusText(row)}
        </h6>
      </TableCell>
      <TableCell align="center">
        <div
          className={classes.priceCon}
          style={{ gridTemplateColumns: "1fr" }}
        >
          <h6>
            Price: <span>₹{row.totalPrice}</span>
          </h6>
          {!row.isPrepaid && (
            <>
              <h6>
                Advance Paid: <span>₹{row.advancePaid}</span>
              </h6>
              <h6>
                Courier: <span>₹{row.shipmentProfit}</span>
              </h6>
              <h6>
                Remaining:{" "}
                <span className={"red"}>
                  ₹{row.totalPrice - row.advancePaid}
                </span>
              </h6>
            </>
          )}
        </div>
      </TableCell>
      <TableCell align="center">
        <h6
          className={classes.typeCon}
          style={{ color: row.isPrepaid ? Colors.success : Colors.danger }}
        >
          {row.isPrepaid ? "Prepaid" : "COD"}
        </h6>
      </TableCell>
      <TableCell align="center">
        <h6 className={classes.typeCon}>
          {new Date(row.orderedDate).toLocaleDateString("en-GB")}
        </h6>
      </TableCell>
      <TableCell align="right">
        <div className={classes.actionCon}>
          <BiEdit
            className={"edit"}
            onClick={() => navigate(`/orders/edit-order/${row._id}`)}
          />
          <MdDeleteOutline
            onClick={() => onDeleteProductClick(row._id)}
            className={"delete"}
          />
          {canShowMove(row) && (
            <RiLogoutBoxRLine
              className={"edit"}
              onClick={() => onMoveClick(row._id)}
            />
          )}
          <AiOutlinePrinter
            color={Colors.success}
            className={"edit"}
            onClick={() => onInvoiceClick(row)}
          />
        </div>
      </TableCell>
    </TableRow>
  );
};

const OrdersTable = ({
  tabFiltered,
  filteredData,
  setFilteredData,
  setLoading,
}) => {
  const classes = useStyles();

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const invoiceRef = useRef();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [ordersDialogOpen, setOrdersDialogOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState();
  const [orders, setOrders] = useState([]);
  const [headCheckBox, setHeadCheckBox] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const data = filteredData.length > 0 ? filteredData : tabFiltered;

  const onDownloadClick = () => {
    toPng(invoiceRef.current, {
      backgroundColor: Colors.light,
      quality: 2,
    }).then((dataUrl) => {
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(dataUrl);
      //   console.log(dataUrl);
      console.log("Hello");
      const imgWidth = 148;
      const pageHeight = 210;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
      let heightLeft = imgHeight;
      //   const doc = new jsPDF("p", "mm", [148, 210]);
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [148, 210],
      });
      doc.internal.scaleFactor = 300;

      let position = 0;
      //   console.log(dataUrl);
      doc.addImage(dataUrl, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(dataUrl, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save(`${activeOrder.orderId}`);
    });
  };

  const onOrdersDownloadClick = () => {
    toPng(invoiceRef.current, {
      backgroundColor: Colors.light,
      quality: 2,
    }).then((dataUrl) => {
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(dataUrl);
      console.log("Hello");
      const imgWidth = 148;
      const pageHeight = 210;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
      let heightLeft = imgHeight;
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [148, 210],
      });
      doc.internal.scaleFactor = 300;

      let position = 0;
      doc.addImage(dataUrl, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(dataUrl, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save(`orders`);
    });
  };

  const onInvoiceClick = (order) => {
    setActiveOrder(order);
    setDialogOpen(true);
  };

  const onPrintClick = () => {
    setActiveOrder(orders);
    setOrdersDialogOpen(true);
  };

  const handleCheckboxChange = () => {
    if (headCheckBox !== true) {
      setHeadCheckBox(true);
      setOrders(data);
    } else {
      setHeadCheckBox(false);
      setOrders([]);
    }
  };

  return (
    <div>
      <div
        style={{ display: orders.length === 0 ? "none" : "block" }}
        className={classes.print}
      >
        <div>
          <button className={"print-head"} onClick={onPrintClick}>
            <AiOutlinePrinter className={"print"} />
          </button>
        </div>
      </div>
      <div className={classes.container}>
        <Paper sx={{ width: "100%", overflow: "auto" }}>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.checkbokTabCell}>
                    <div className={classes.tableHeader}>
                      <Checkbox
                        checked={headCheckBox}
                        onClick={handleCheckboxChange}
                      />
                    </div>
                  </TableCell>
                  <TableCell className={classes.tabCell}>
                    <div className={classes.tableHeader}>Customer Details</div>
                  </TableCell>
                  <TableCell align="center" style={{ width: "250px" }}>
                    <div className={classes.tableHeader}>Order Details</div>
                  </TableCell>
                  <TableCell align="center">
                    <div className={classes.tableHeader}>Tracking Detail</div>
                  </TableCell>
                  <TableCell align="center">
                    <div className={classes.tableHeader}>Status</div>
                  </TableCell>
                  <TableCell align="center">
                    <div className={classes.tableHeader}>Amount Details</div>
                  </TableCell>
                  <TableCell align="center">
                    <div className={classes.tableHeader}>Payment Type</div>
                  </TableCell>
                  <TableCell align="center">
                    <div className={classes.tableHeader}>Ordered At</div>
                  </TableCell>
                  <TableCell align="right">
                    <div className={classes.tableHeader}>Action</div>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody classes={classes.tabBody}>
                {data.map((row) => (
                  <SingleRow
                    setLoading={setLoading}
                    row={row}
                    orders={orders}
                    setOrders={setOrders}
                    headCheckBox={headCheckBox}
                    setHeadCheckBox={setHeadCheckBox}
                    classes={classes}
                    onInvoiceClick={onInvoiceClick}
                    setFilteredData={setFilteredData}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/*<TablePagination*/}
          {/*    rowsPerPageOptions={[5, 10, 25]}*/}
          {/*    component="div"*/}
          {/*    count={data.length}*/}
          {/*    rowsPerPage={rowsPerPage}*/}
          {/*    page={page}*/}
          {/*    onPageChange={handleChangePage}*/}
          {/*    onRowsPerPageChange={handleChangeRowsPerPage}*/}
          {/*/>*/}
        </Paper>
        <Dialog
          open={dialogOpen}
          fullWidth={true}
          maxWidth={"md"}
          // scroll={'body'}
          className={classes.dialogStyle}
          onClose={() => setDialogOpen(false)}
        >
          <Invoice order={activeOrder} invoiceRef={invoiceRef} />
        </Dialog>
        <div
          className={classes.actionStyle}
          style={{ display: !dialogOpen ? "none" : "block" }}
        >
          <FiDownload className={"icon"} onClick={onDownloadClick} />
          <IoMdClose className={"icon"} onClick={() => setDialogOpen(false)} />
        </div>

        {/* Orders */}
        <Dialog
          open={ordersDialogOpen}
          fullWidth={true}
          maxWidth={"md"}
          // scroll={'body'}
          className={classes.dialogStyle}
          onClose={() => setDialogOpen(false)}
        >
          <Invoices orders={orders} invoiceRef={invoiceRef} />
        </Dialog>
        <div
          className={classes.actionStyle}
          style={{ display: !ordersDialogOpen ? "none" : "block" }}
        >
          <div>
            <IoMdClose
              className={"icon"}
              onClick={() => setOrdersDialogOpen(false)}
            />
            <div>
              <FiDownload className={"icon"} onClick={onOrdersDownloadClick} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;

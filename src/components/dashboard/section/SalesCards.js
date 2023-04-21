// import React from 'react';
// import {makeStyles} from "@mui/styles";
// import {Colors} from "../../../helpers/Colors";

// const useStyles = makeStyles({
//     container: {
//         display: 'grid',
//         marginTop: '20px',
//         marginBottom: '30px',
//         gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
//         gridGap: '10px',
//         '& .card': {
//             display: 'flex',
//             position: 'relative',
//             overflow: 'hidden',
//             background: Colors.light,
//             borderRadius: '5px',
//             padding: '20px',
//             borderBottom: `3px solid ${Colors.primary}`,
//             '& .icon-con': {
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 width: '60px',
//                 height: '60px',
//                 borderRadius: '50px',
//                 background: Colors.light1,
//                 '& .icon': {
//                     color: Colors.primary,
//                     fontSize: '24px',
//                     margin: 0
//                 }
//             },
//             '& .data': {
//                 // marginLeft: '20px',
//                 '& h6': {
//                     margin: '0',
//                     fontSize: '16px',
//                     fontWeight: '400',
//                     color: Colors.dark5,
//                 },
//                 '& h5': {
//                     fontSize: '26px',
//                     margin: '5px 0 0 0',
//                     fontWeight: '700 !important'
//                 }
//             }
//         }
//     },
//     orderStatusCon: {
//         '& h6': {
//             fontSize: '20px',
//             color: Colors.dark3,
//             fontWeight: '700',
//             margin: '30px 0 0 15px'
//         }
//     }
// })

// const SalesCards = ({data, totalExpenses}) => {

//     const {
//         totalSales,
//         totalProfit,
//         todaySale,
//         codPurchasePrice,
//         prepaidPurchasePrice,
//         todayProfit,
//         prepaidProfit,
//         codAdvanceProfit,
//         codProfit,
//         purchasedPrice,
//         codPendingProfit,
//         prepaidShipmentProfit,
//         codShipmentProfit
//     } = data

//     const classes = useStyles()

//     return (
//        <>
//            <div className={classes.orderStatusCon}>
//                <h6>Sales Details</h6>
//            </div>
//            <div className={classes.container}>
//                <div className={'card'} style={{borderColor: Colors.success}}>
//                    <div className={'data'}>
//                        <h6>Total Sales</h6>
//                        <h5>₹{totalSales}</h5>
//                    </div>
//                </div>
//                <div className={'card'} style={{borderColor: Colors.orange}}>
//                    <div className={'data'}>
//                        <h6>Purchased Price</h6>
//                        <h5>₹{purchasedPrice}</h5>
//                    </div>
//                </div>
//                <div className={'card'} style={{borderColor: Colors.dashColor5}}>
//                    <div className={'data'}>
//                        <h6>COD Purchased Price</h6>
//                        <h5>₹{codPurchasePrice}</h5>
//                    </div>
//                </div>
//                <div className={'card'} style={{borderColor: Colors.dashColor1}}>
//                    <div className={'data'}>
//                        <h6>Prepaid Purchased Price</h6>
//                        <h5>₹{prepaidPurchasePrice}</h5>
//                    </div>
//                </div>
//                <div className={'card'}>
//                    <div className={'data'}>
//                        <h6>Total Profit</h6>
//                        <h5>₹{totalProfit}</h5>
//                    </div>
//                </div>
//                <div className={'card'} style={{borderColor: Colors.dashColor1}}>
//                    <div className={'data'}>
//                        <h6>Today Sales</h6>
//                        <h5>₹{todaySale}</h5>
//                    </div>
//                </div>
//                <div className={'card'} style={{borderColor: Colors.dashColor3}}>
//                    <div className={'data'}>
//                        <h6>Today Profit</h6>
//                        <h5>₹{todayProfit}</h5>
//                    </div>
//                </div>
//                <div className={'card'} style={{borderColor: Colors.dashColor4}}>
//                    <div className={'data'}>
//                        <h6>Prepaid Profit</h6>
//                        <h5>₹{prepaidProfit}</h5>
//                    </div>
//                </div>
//                <div className={'card'} style={{borderColor: Colors.dashColor5}}>
//                    <div className={'data'}>
//                        <h6>COD Profit</h6>
//                        <h5>₹{codProfit}</h5>
//                    </div>
//                </div>
//                <div className={'card'} style={{borderColor: Colors.orange}}>
//                    <div className={'data'}>
//                        <h6>COD Advance</h6>
//                        <h5>₹{codAdvanceProfit}</h5>
//                    </div>
//                </div>
//                <div className={'card'} style={{borderColor: Colors.blue}}>
//                    <div className={'data'}>
//                        <h6>COD Pending</h6>
//                        <h5>₹{codPendingProfit}</h5>
//                    </div>
//                </div>
//                <div className={'card'} style={{borderColor: Colors.success}}>
//                    <div className={'data'}>
//                        <h6>Prepaid Shipment Charge</h6>
//                        <h5>₹{prepaidShipmentProfit}</h5>
//                    </div>
//                </div>
//                <div className={'card'}>
//                    <div className={'data'}>
//                        <h6>COD Shipment Charge</h6>
//                        <h5>₹{codShipmentProfit}</h5>
//                    </div>
//                </div>
//                <div className={'card'}>
//                    <div className={'data'}>
//                        <h6>Total Expenses</h6>
//                        <h5>₹{totalExpenses}</h5>
//                    </div>
//                </div>
//                <div className={'card'} style={{borderColor: Colors.success}}>
//                    <div className={'data'}>
//                        <h6>Overall Profit</h6>
//                        <h5>₹{totalProfit - totalExpenses}</h5>
//                    </div>
//                </div>
//            </div>
//        </>
//     );
// };

// export default SalesCards;

import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Colors } from "../../../helpers/Colors";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Table } from "react-bootstrap";
import { purchaseOrder } from "../../../helpers/AxiosHelper";
import Pagination from "react-bootstrap/Pagination";

const useStyles = makeStyles({
  tableHeader: {
    fontSize: "15px",
    fontWeight: "bold",
    color: Colors.dark3,
  },
  dataflex: {
    display: "flex ",
    justifyContent: "space-between",
    alignItems: "center",
    "& h6": {
      fontSize: "16px",
      fontWeight: "bold",
      color: Colors.dark5,
    },
  },
  datepicker: {
    border: `1px solid ${Colors.light2}`,
    padding: "0 8px",
    background: Colors.light,
    borderRadius: "5px",
    "& .MuiIconButton-root": {
      padding: "0 !important",
    },
    "& .MuiSvgIcon-root": {
      color: Colors.primary,
    },
    "& .MuiFormControl-marginNormal": {
      marginTop: "1px !important",
      marginBottom: "0px !important",
    },
  },

  container: {
    display: "grid",
    marginTop: "20px",
    marginBottom: "30px",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
    gridGap: "10px",

    "& .card": {
      display: "flex",
      position: "relative",
      overflow: "hidden",
      background: Colors.light,
      borderRadius: "5px",
      padding: "20px",
      borderBottom: `3px solid ${Colors.primary}`,
      "& .icon-con": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "60px",
        height: "60px",
        borderRadius: "50px",
        background: Colors.light1,
        "& .icon": {
          color: Colors.primary,
          fontSize: "24px",
          margin: 0,
        },
      },
      "& .data": {
        // marginLeft: '20px',
        "& h6": {
          margin: "0",
          fontSize: "16px",
          fontWeight: "400",
          color: Colors.dark5,
        },
        "& h5": {
          fontSize: "26px",
          margin: "5px 0 0 0",
          fontWeight: "700 !important",
        },
      },
    },
  },
  orderStatusCon: {
    "& h6": {
      fontSize: "20px",
      color: Colors.dark3,
      fontWeight: "700",
      margin: "30px 0 0 15px",
    },
  },
});

const SalesCards = ({ data, totalExpenses }) => {
  const [show, setShow] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [datas, setDatas] = useState([]);
  const [minDate, setMinDate] = useState(new Date());
  const [maxDate, setMaxDate] = useState(new Date());
  const [page, setPage] = useState(1);
  // const [pagination, setPagination] = useState(1);
  const [items, setItems] = useState([]);

  const {
    totalSales,
    totalProfit,
    todaySale,
    codPurchasePrice,
    prepaidPurchasePrice,
    todayProfit,
    prepaidProfit,
    codAdvanceProfit,
    codProfit,
    purchasedPrice,
    codPendingProfit,
    prepaidShipmentProfit,
    codShipmentProfit,
  } = data;
  const handleClose = () => setShow(false);

  const filterDataByDateRange = () => {
    const postDate = {
      page: page,
      fromDate: fromDate,
      toDate: toDate,
    };

    purchaseOrder(postDate)
      .then((res) => {
        console.log(res.data.fillData);
        setDatas(res.data.fillData);
      })
      .catch((err) => {
        console.log("err", err);
        alert(err.response.data.message);
      });
  };

  useEffect(() => {
    filterDataByDateRange();
  }, [fromDate, toDate]);

  const handleFromDateChange = (date) => {
    console.log("date", date);
    setFromDate(date);
  };
  const handleToDateChange = (date) => {
    setToDate(date);
  };
  const classes = useStyles();
  const dummydata = [
    {
      name: "kader",
      date: "2023-03-13T17:52:00.000Z",
      purchase: 4,
      cod: 10,
    },
    {
      name: "meeran",
      date: "2023-03-10T17:52:00.000Z",
      purchase: 14,
      cod: 1,
    },
  ];

  return (
    <>
      <div className={classes.orderStatusCon}>
        <h6>Sales Details</h6>
      </div>
      <div className={classes.container}>
        <div className={"card"} style={{ borderColor: Colors.success }}>
          <div className={"data"}>
            <h6>Total Sales</h6>
            <h5>₹{totalSales}</h5>
          </div>
        </div>

        <div
          className={"card"}
          style={{ borderColor: Colors.orange }}
          onClick={() => setShow(true)}
        >
          <div className={"data"}>
            <h6>Purchased Price</h6>
            <h5>₹{purchasedPrice}</h5>
          </div>
        </div>

        <Modal
          show={show}
          onHide={handleClose}
          dialogClassName="modal-100w"
          aria-labelledby="contained-modal-title-vcenter "
          size="xl"
          centered
          backdrop="static"
          keyboard={false}
        >
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title"></Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Container>
                <div className={classes.dataflex} id="title">
                  <div>
                    <h6>From</h6>
                    <div className={classes.datepicker}>
                      <KeyboardDatePicker
                        margin="normal"
                        format="dd/MM/yyyy"
                        value={fromDate}
                        // minDate={minDate}
                        maxDate={maxDate}
                        onChange={handleFromDateChange}
                        InputProps={{
                          disableUnderline: true,
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <h6>To</h6>
                    <div className={classes.datepicker}>
                      <KeyboardDatePicker
                        margin="normal"
                        format="dd/MM/yyyy"
                        value={toDate}
                        // minDate={minDate}
                        maxDate={maxDate}
                        onChange={handleToDateChange}
                        InputProps={{
                          disableUnderline: true,
                        }}
                      />
                    </div>
                  </div>
                </div>
                <br />
                <Table striped bordered hover>
                  {/* {JSON.stringify(datas)} */}
                  <thead>
                    <tr>
                      <th className={classes.tableHeader}>Dealer Name</th>
                      {/* <th className={classes.tableHeader}>Date of purchase</th> */}
                      <th className={classes.tableHeader}>Prepaid sales</th>
                      <th className={classes.tableHeader}>COD sales</th>
                      <th className={classes.tableHeader}>Total sales</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datas.length === 0 ? (
                      <div
                        style={{
                          fontSize: "40px",
                          fontWeight: "bold",
                          textAlign: "center",
                          width: "100%",
                        }}
                      >
                        Datas Not Found!
                      </div>
                    ) : (
                      datas.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td>{data._id.vendorId.vendorName}</td>
                            {/* <td>
                            {JSON.stringify(data.date)
                              .slice(1, 11)
                              .split("-")
                              .reverse()
                              .join("-")}
                          </td> */}
                            <td>{data.prepaidTotalEarnings}</td>
                            <td>{data.CODTotalEarnings}</td>
                            <td>{`${
                              data.prepaidTotalEarnings + data.CODTotalEarnings
                            }`}</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </Table>
              </Container>
            </Modal.Body>
          </MuiPickersUtilsProvider>
        </Modal>

        <div className={"card"} style={{ borderColor: Colors.dashColor5 }}>
          <div className={"data"}>
            <h6>COD Purchased Price</h6>
            <h5>₹{codPurchasePrice}</h5>
          </div>
        </div>
        <div className={"card"} style={{ borderColor: Colors.dashColor1 }}>
          <div className={"data"}>
            <h6>Prepaid Purchased Price</h6>
            <h5>₹{prepaidPurchasePrice}</h5>
          </div>
        </div>
        <div className={"card"}>
          <div className={"data"}>
            <h6>Total Profit</h6>
            <h5>₹{totalProfit}</h5>
          </div>
        </div>
        <div className={"card"} style={{ borderColor: Colors.dashColor1 }}>
          <div className={"data"}>
            <h6>Today Sales</h6>
            <h5>₹{todaySale}</h5>
          </div>
        </div>
        <div className={"card"} style={{ borderColor: Colors.dashColor3 }}>
          <div className={"data"}>
            <h6>Today Profit</h6>
            <h5>₹{todayProfit}</h5>
          </div>
        </div>
        <div className={"card"} style={{ borderColor: Colors.dashColor4 }}>
          <div className={"data"}>
            <h6>Prepaid Profit</h6>
            <h5>₹{prepaidProfit}</h5>
          </div>
        </div>
        <div className={"card"} style={{ borderColor: Colors.dashColor5 }}>
          <div className={"data"}>
            <h6>COD Profit</h6>
            <h5>₹{codProfit}</h5>
          </div>
        </div>
        <div className={"card"} style={{ borderColor: Colors.orange }}>
          <div className={"data"}>
            <h6>COD Advance</h6>
            <h5>₹{codAdvanceProfit}</h5>
          </div>
        </div>
        <div className={"card"} style={{ borderColor: Colors.blue }}>
          <div className={"data"}>
            <h6>COD Pending</h6>
            <h5>₹{codPendingProfit}</h5>
          </div>
        </div>
        <div className={"card"} style={{ borderColor: Colors.success }}>
          <div className={"data"}>
            <h6>Prepaid Shipment Charge</h6>
            <h5>₹{prepaidShipmentProfit}</h5>
          </div>
        </div>
        <div className={"card"}>
          <div className={"data"}>
            <h6>COD Shipment Charge</h6>
            <h5>₹{codShipmentProfit}</h5>
          </div>
        </div>
        <div className={"card"}>
          <div className={"data"}>
            <h6>Total Expenses</h6>
            <h5>₹{totalExpenses}</h5>
          </div>
        </div>
        <div className={"card"} style={{ borderColor: Colors.success }}>
          <div className={"data"}>
            <h6>Overall Profit</h6>
            <h5>₹{totalProfit - totalExpenses}</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesCards;

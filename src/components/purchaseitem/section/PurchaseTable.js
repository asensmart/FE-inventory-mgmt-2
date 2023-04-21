import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Colors } from "../../../helpers/Colors";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect } from "react";

const useStyles = makeStyles({
  tableHeader: {
    fontSize: "15px",
    fontWeight: "700",
    color: Colors.dark3,
  },
  container: {
    marginTop: "20px",

    "& button": {
      background: Colors.primary,
      color: Colors.light,
      padding: "8px 15px",
      borderRadius: "5px",
      border: 0,
      cursor: "pointer",
      textAlign: "center",
    },
    "& input": {
      // border: 0,
      outline: 0,
      marginLeft: "8px",
      // width: '80%',
      "&::placeholder": {
        color: Colors.light2,
        letterSpacing: "1px",
      },
    },
    "& .subittype": {
      background: Colors.primary,
      display: "flex",
      justifyContent: "space-between",
      alignItemts: "center",
      padding: "8px 20px 8px 20px",
      border: `1px solid ${Colors.primary}`,
      borderRadius: "5px",
      color: Colors.light,
      fontSize: "18px",
      fontFamily: "inherit",
      transition: "all .5s",
      cursor: "pointer",
      outline: 0,
    },
    "& .btn-flex": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 9px 10px 9px",
      "& h6": {
        fontSize: "14px",
        color: Colors.dark3,
        margin: "0",
      },
    },
  },
});

const PurchaseTable = ({
  tabFiltered,
  filteredData,
  submittype,
  addCount,
  setAddCount,
  initialItem,
  setAmount,
  amount,
  setTotalAmt,
}) => {
  const classes = useStyles();

  const onadd = () => {
    setAddCount([...addCount, initialItem]);
  };

  const onRemove = () => {
    setAddCount(addCount.slice(0, addCount.length - 1));
  };

  useEffect(() => {
    setAmount(addCount.reduce((a, b) => a + b.amount, 0));
    setTotalAmt(amount);
  }, [addCount]);

  return (
    <div className={classes.container}>
      <>
        <Paper>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <div className={classes.tableHeader}>S.no</div>
                  </TableCell>
                  <TableCell align="center">
                    <div className={classes.tableHeader}>Item name</div>
                  </TableCell>
                  <TableCell align="center">
                    <div className={classes.tableHeader}>Qty</div>
                  </TableCell>
                  <TableCell align="center">
                    <div className={classes.tableHeader}>Rate</div>
                  </TableCell>
                  <TableCell align="center">
                    <div className={classes.tableHeader}>Total amt</div>
                  </TableCell>
                </TableRow>
              </TableHead>
              {addCount.map((item, index) => {
                return (
                  <>
                    <TableBody key={index}>
                      <TableCell component="th" scope="row" align="left">
                        <div>{index + 1}</div>
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        <input
                          type="text"
                          value={item.itemName}
                          onChange={(e) => {
                            let temp = addCount;
                            temp[index].itemName = e.target.value;
                            setAddCount([...temp]);
                          }}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        <input
                          type="number"
                          value={item.qty}
                          onChange={(e) => {
                            let temp = addCount;
                            temp[index].qty = parseInt(e.target.value);
                            temp[index].amount =
                              parseInt(e.target.value) *
                              parseInt(temp[index].rate);

                            setAddCount([...temp]);
                          }}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        <input
                          type="number"
                          value={item.rate}
                          onChange={(e) => {
                            let temp = addCount;
                            temp[index].rate = parseInt(e.target.value);
                            temp[index].amount =
                              parseInt(e.target.value) *
                              parseInt(temp[index].qty);
                            setAddCount([...temp]);
                          }}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        <div>{item.amount} </div>
                      </TableCell>
                    </TableBody>
                  </>
                );
              })}
            </Table>

            <div className={"btn-flex"}>
              <button onClick={onadd}>+Add</button>
              <button onClick={onRemove}>-Remove</button>
              <h6>TotalAmount:{amount}</h6>
              <button className={"subittype"} onClick={submittype}>
                Submit
              </button>
            </div>
          </TableContainer>
        </Paper>
      </>
    </div>
  );
};

export default PurchaseTable;

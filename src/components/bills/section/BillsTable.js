import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
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
import { getBills } from "../../../helpers/AxiosHelper";

const useStyles = makeStyles({
  tableHeader: {
    fontSize: "15px",
    fontWeight: "700",
    color: Colors.dark3,
  },
  container: {
    marginTop: "50px",
  },
});

const BillsTable = ({ tabFiltered, filteredData }) => {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [billsdata, setBillsdata] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    getBills().then((res) => {
      console.log("Data", res.data.data);
      setBillsdata(res.data.data);
    });
  }, []);

  const data = filteredData.length > 0 ? filteredData : tabFiltered;
  return (
    <div className={classes.container}>
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
                  <div className={classes.tableHeader}>Purchase Date</div>
                </TableCell>
                <TableCell align="center">
                  <div className={classes.tableHeader}>Total Amt</div>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {billsdata.map((item, index) => {
                return (
                  <TableRow key={item._id}>
                    <TableCell component="th" scope="row" align="left">
                      <div>{index + 1}</div>
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {item.vendor_id.vendorName}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {new Date(item.purchaseDate).toLocaleDateString("en-IN")}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {item.totalAmt}
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
          count={billsdata.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default BillsTable;

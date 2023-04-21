import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Colors } from "../../../helpers/Colors";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { getVendors } from "../../../helpers/AxiosHelper";
import { useEffect } from "react";
const useStyles = makeStyles({
    tableHeader: {
        fontSize: '15px',
        fontWeight: '700',
        color: Colors.dark3
      },
    container: {
        background: Colors.light,
        borderRadius: '5px',
    },
})

const Vendor = ({ tabFiltered, filteredData }) => {
    const classes = useStyles()
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [datas, setDatas] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        const initialLoad = async () => {
            const response = await getVendors();
            setDatas(response.data.data)
        }
        initialLoad();
    }, []);

    const data = filteredData.length > 0 ? filteredData : tabFiltered
    return (
        <div className={classes.container}>
            {JSON.stringify(datas.data)}
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
                                    <div className={classes.tableHeader}>Shop Name</div>
                                </TableCell>

                            </TableRow>

                        </TableHead>
                        <TableBody>
                            {datas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <TableRow
                                    key={row._id}
                                >
                                    <TableCell component="th" scope="row" align="left">
                                        <div >
                                            {index + 1}
                                        </div>
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        <div >
                                            {row.vendorName}
                                        </div>
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        <div >
                                            {row.shopName}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={datas.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
           
        </div>
    )
}


export default Vendor
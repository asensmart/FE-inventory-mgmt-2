import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {replacements} from "../../../helpers/ChartData";
import {makeStyles} from "@mui/styles";
import {Colors} from "../../../helpers/Colors";

const useStyles = makeStyles({
    tableHeader: {
        fontSize: '15px',
        fontWeight: 'bold',
        color: Colors.dark3
    }
})

const ReplacementTable = () => {

    const classes = useStyles()

    return (
        <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><div className={classes.tableHeader}>Customer Name</div></TableCell>
                        <TableCell align="center"><div className={classes.tableHeader}>Product Name</div></TableCell>
                        <TableCell align="right"><div className={classes.tableHeader}>Quantity</div></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {replacements.map((row, i) => (
                        <TableRow
                            key={row.customerName}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.customerName}
                            </TableCell>
                            <TableCell align={'center'} component="th" scope="row">
                                {row.productName}
                            </TableCell>
                            <TableCell align="right">{row.quantity}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ReplacementTable;
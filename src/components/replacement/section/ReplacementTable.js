import React from 'react';
import {useState} from "react";
import {makeStyles} from "@mui/styles";
import {Colors} from "../../../helpers/Colors";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import {BiCheck} from "react-icons/bi";
import {IoMdAdd} from "react-icons/io";
import {getDeliveryColorCode} from "../../../helpers/HelperFuctions";

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
    cusDetCon: {
        '& h6': {
            fontSize: '14px',
            color: Colors.dark3,
            margin: '0 0 5px',
            textTransform: 'capitalize',
        }
    },
    ordDetCon: {
        '& div': {
            display: 'flex',
            margin: '0 0 10px',
            justifyContent: 'center',
            '& h5': {
                fontSize: '14px',
                color: Colors.dark3,
                margin: '0',
                textTransform: 'capitalize',
            },
            '& h6': {
                fontSize: '14px',
                color: Colors.success,
                margin: '0 15px',
                fontWeight: '700',
                textTransform: 'capitalize',
            },
        }
    },
    priceCon: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        '& h6': {
            fontSize: '14px',
            color: Colors.dark3,
            margin: '0 0 5px',
            textTransform: 'capitalize',
            '& span': {
                color: Colors.success,
                fontWeight: '700'
            },
            '& .red': {
                color: Colors.danger
            },
        }
    },
    statusCon: {
        fontSize: '12px',
        color: Colors.light,
        background: `${Colors.success}`,
        borderRadius: '25px',
        width: '100px',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        padding: '4px 6px',
        letterSpacing: '1px',
        margin: '0 auto',
        textTransform: 'capitalize',
    },
    typeCon: {
        fontSize: '14px',
        letterSpacing: '1px',
        margin: '0',
        textTransform: 'capitalize',
    },
    actionCon: {
        '& .edit': {
            color: Colors.primary,
            fontSize: '26px',
            // marginRight: '5px',
        },
        '& .success': {
            color: Colors.success,
            fontSize: '26px',
            marginRight: '0',
        }
    },
})

const ReplacementTable = ({tabFiltered, filteredData, setSelectedOrder, setIsModalOpen}) => {

    const classes = useStyles()

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const data = filteredData.length > 0 ? filteredData : tabFiltered

    const getStatusText = (row) => {
        return row.shipWayRes.status === 'Success' ? row.shipWayRes.response.current_status : 'Error Occurred';
    }

    const getDeliveryColor = (row) => {
        if (row.replacementAwbNumber) {
            const code = row.shipWayRes.status === 'Success' ? row.shipWayRes.response.current_status_code : '24';
            return getDeliveryColorCode(code)
        } else {
            return Colors.purple;
        }
    }

    const onAddClick = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true)
    }

    return (
        <div className={classes.container}>
            <Paper>
                <TableContainer>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <div className={classes.tableHeader}>Customer Details</div>
                                </TableCell>
                                <TableCell align="center">
                                    <div className={classes.tableHeader}>Order Details</div>
                                </TableCell>
                                <TableCell align="center">
                                    <div className={classes.tableHeader}>Tracking Detail</div>
                                </TableCell>
                                <TableCell align="center">
                                    <div className={classes.tableHeader}>Status</div>
                                </TableCell>
                                <TableCell align="center">
                                    <div className={classes.tableHeader}>Payment Type</div>
                                </TableCell>
                                <TableCell align="right">
                                    <div className={classes.tableHeader}>Action</div>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <TableRow
                                    key={row._id}
                                >
                                    <TableCell component="th" scope="row">
                                        <div className={classes.cusDetCon}>
                                            <h6>{row.customerName}</h6>
                                            <h6>{row.address}</h6>
                                            <h6>{row.pinCode}</h6>
                                            <h6>{row.mobileNumber}</h6>
                                        </div>
                                    </TableCell>
                                    <TableCell align={'center'} component="th" scope="row">
                                        <div className={classes.ordDetCon}>
                                            {
                                                row.products.map(p => (
                                                    <div>
                                                        <div>
                                                            <h5>{p.name}</h5>
                                                            <h6>X {p.quantity}</h6>
                                                        </div>
                                                        <h5>{p.vendorName}</h5>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </TableCell>
                                    <TableCell align={'center'} component="th" scope="row">
                                        <div className={classes.cusDetCon}>
                                            <h6> {row.replacementOrderId ? row.replacementOrderId : 'Not Added'}</h6>
                                            <h6> {row.replacementAwbNumber ? row.replacementAwbNumber : 'Not Added'}</h6>
                                            <h6>{row.replacementCourier ? row.replacementCourier.courier_name : 'Not Added'}</h6>
                                        </div>
                                    </TableCell>
                                    <TableCell align="center">
                                        <h6 className={classes.statusCon} style={{background: getDeliveryColor(row)}}>{row.replacementAwbNumber ? getStatusText(row) : 'Placed'}</h6>
                                    </TableCell>
                                    <TableCell align="center">
                                        <h6 className={classes.typeCon} style={{color: row.isPrepaid? Colors.success : Colors.danger}}>{row.isPrepaid ? 'Prepaid' : 'COD'}</h6>
                                    </TableCell>
                                    <TableCell align="center">
                                        <div className={classes.actionCon}>
                                            {
                                                row.replacementAwbNumber ?
                                                    <BiCheck className={'success'}/> :
                                                    <IoMdAdd className={'edit'} onClick={() => onAddClick(row)}/>
                                            }
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
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
};

export default ReplacementTable;

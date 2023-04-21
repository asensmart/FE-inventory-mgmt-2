import React, {useState} from 'react';
import {makeStyles} from "@mui/styles";
import {Colors} from "../../../helpers/Colors";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import {BiEdit} from "react-icons/bi";
import {MdDeleteOutline} from "react-icons/md";
import Swal from "sweetalert2";
import {deleteExpense, getExpenses} from "../../../helpers/AxiosHelper";

const useStyles = makeStyles({
    tableHeader: {
        fontSize: '15px',
        fontWeight: 'bold',
        color: Colors.dark3
    },
    container: {
        background: Colors.light,
        borderRadius: '5px',
    },
    actionCon: {
        '& .edit': {
            color: Colors.primary,
            fontSize: '22px',
            marginRight: '5px',
        },
        '& .delete': {
            color: Colors.danger,
            fontSize: '22px',
            marginRight: '0',
        }
    },
})

const ExpensesTable = ({expenses, setExpenses, setEditData, setFilteredData, setIsModalOpen, filteredData}) => {

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

    const onDeleteProductClick = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: Colors.danger,
            cancelButtonColor: Colors.success,
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteExpense(id).then(() => {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    ).then(() => {
                        getExpenses().then(res => {
                            setExpenses(res.data.reverse())
                            setFilteredData([])
                        })
                    })
                })
            }
        })
    }

    const onEditClick = (data) => {
      setEditData(data);
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
                                    <div className={classes.tableHeader}>Paid To</div>
                                </TableCell>
                                <TableCell align="center">
                                    <div className={classes.tableHeader}>Type</div>
                                </TableCell>
                                <TableCell align="center">
                                    <div className={classes.tableHeader}>Price</div>
                                </TableCell>
                                <TableCell align="center">
                                    <div className={classes.tableHeader}>Created At</div>
                                </TableCell>
                                <TableCell align="right">
                                    <div className={classes.tableHeader}>Action</div>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(filteredData.length > 0 ? filteredData : expenses).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <TableRow
                                    key={row._id}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.paidTo}
                                    </TableCell>
                                    <TableCell align={'center'} component="th" scope="row">
                                        {row.type.label}
                                    </TableCell>
                                    <TableCell align={'center'} component="th" scope="row">
                                        ₹{row.price}
                                    </TableCell>
                                    <TableCell align="center">{new Date(row.createdAt).toDateString()}</TableCell>
                                    <TableCell align="right">
                                        <div className={classes.actionCon}>
                                            <BiEdit className={'edit'} onClick={() => onEditClick(row)}/>
                                            <MdDeleteOutline className={'delete'} onClick={() => onDeleteProductClick(row._id)}/>
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
                    count={filteredData.length > 0 ? filteredData.length : expenses.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
};

export default ExpensesTable;
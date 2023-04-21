import React from 'react';
import {Alert, Snackbar as MuiSnackbar} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    message: {
        fontSize: '15px',
        letterSpacing: '1px',
        fontWeight: '700',
        margin: 0
    }
})

const Snackbar = ({message, setMessage}) => {

    const handleClose = () => {
        setMessage({...message, open: false})
    }

    const classes = useStyles();

    return (
        <MuiSnackbar
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            open={message.open}
            autoHideDuration={2000}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} classes={{message: classes.message}} severity={message.type}>
                {message.text}
            </Alert>
        </MuiSnackbar>
    );
};

export default Snackbar;

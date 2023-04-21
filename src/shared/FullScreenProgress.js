import React from "react";
import {makeStyles} from "@mui/styles";
import {CircularProgress, Dialog} from "@mui/material";

const useStyles = makeStyles(({
    container: {
        width: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        height: '100px'
    }
}))

const FullScreenProgress = ({open, setOpen}) => {

    const handleClose = () => {
        setOpen(false);
    };

    const classes = useStyles();

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                disableBackdropClick
                PaperProps={{
                    style: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    },
                }}
            >
                <div className={classes.container}>
                    <CircularProgress />
                </div>
            </Dialog>
        </div>
    );
};

export default FullScreenProgress;

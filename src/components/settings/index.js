import React from 'react';
import Appbar from "../../shared/Appbar";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    container: {
        padding: '25px',
    }
})

const SettingsPage = () => {

    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Appbar name={'Settings'}/>
        </div>
    );
};

export default SettingsPage;
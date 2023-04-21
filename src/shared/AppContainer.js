import React from 'react';
import {makeStyles} from "@mui/styles";
import SideBar from "./SideBar";
import MainPage from "./MainPage";
import {Colors} from "../helpers/Colors";

const useStyles = makeStyles({
    container: {
        height: '100vh',
        display: "flex",
        '& .side-bar': {
            width: '20%',
            height: '100%',
            boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
        },
        '& .main-page': {
            width: '80%',
            height: '100%',
            background: Colors.light1,
        }
    }
})


const AppContainer = () => {

    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={'side-bar'}>
                <SideBar/>
            </div>
            <div className={'main-page'}>
                <MainPage/>
            </div>
        </div>
    );
};

export default AppContainer;
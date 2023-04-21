import React, { useState, useEffect } from 'react';
import { makeStyles } from "@mui/styles";
import { Colors } from "../../../helpers/Colors";

const useStyles = makeStyles({
    modalback: {
        background: Colors.primary,
        // width: '100vw',
        // height: '100vh',
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& .modalcontainer': {
            // width: '100vw',
            // height: '100vh',
            borderRadius: '12px',
            background: Colors.light,
            boxShadow:'rgba(0,0,0,0.35)0px 5px 15px',
            display: 'flex',
            flexDirection:'column',
            padding:'25px'
        },
        
    },
})
const Popup = ({ closeModal }) => {
    const classes = useStyles();
    return (
        <div className={classes.modalback}>
            <div className={'modalcontainer'}>
                <button onClick={() => closeModal(false)}>*</button>
                <div className={'title'}></div>
                <h1>Are u sure</h1>
                <div className='body'>
                    <p>next page is awsome you enjoy</p>
                </div>
                <div className='footer'>
                    <button onClick={() => closeModal(false)}>Cancel</button>
                    <button>Submit</button>
                </div>



            </div>

        </div>
    )
}

export default Popup;
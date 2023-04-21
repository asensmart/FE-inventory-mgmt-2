import React, { useEffect, useState } from 'react';
import Appbar from "../../shared/Appbar";
import { makeStyles } from "@mui/styles";
import {Colors} from "../../helpers/Colors";
import FullScreenProgress from "../../shared/FullScreenProgress";

import { useNavigate } from 'react-router-dom';
import Vendor from './section/Vendor';

const useStyles = makeStyles({
    container: {
        padding: '25px',
    },
    topCon: {
        // background: Colors.light,
        // borderRadius: '5px',
        margin: '20px 0',
        paddingTop: '15px',
        textAlign:'end',
        '& button':{
            background: Colors.primary,
            color: Colors.light,
            padding: '8px 15px',
            borderRadius: '5px',
            border: 0,
            cursor: 'pointer'
        }
    },
   
})

const Vendorpage = () => {

    const classes = useStyles();
    const newpage = useNavigate();
    const [loading, setLoading] = useState(false);
    const [tabFiltered, setTabFiltered] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

const vendorcreation=()=>{
    newpage('/VendorTable')
}
    
    return (
        <div className={classes.container}>
            <Appbar name={'Vendor'} />
            {/* <div className={classes.topCon}>
                <StatusTabBar setTabFiltered={setTabFiltered} replacements={replacements} setFilteredData={setFilteredData}/>
                <SearchBar setFilteredData={setFilteredData} orders={orders} tabFiltered={tabFiltered}/>
            </div> */}
            <div className={classes.topCon}>
             <button onClick={vendorcreation}>+New</button>
            </div>
            <Vendor tabFiltered={tabFiltered}  filteredData={filteredData} />
            <FullScreenProgress open={loading} setOpen={setLoading}/>
        </div>
    )
}

export default Vendorpage
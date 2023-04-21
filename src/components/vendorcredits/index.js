import React,{useState} from 'react';
import { makeStyles } from "@mui/styles";
// import { Colors } from "../../../helpers/Colors";
import Appbar from "../../shared/Appbar";
import CreditTable from './section/CreditTable';

const useStyles = makeStyles({

    container: {
       padding:'25px',
    },
})

const VendorCredit = () => {
    const classes = useStyles();
    const [tabFiltered, setTabFiltered] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    return (
        <div className={classes.container}>
             <Appbar name={'vendorcredits'} />
            <CreditTable tabFiltered={tabFiltered}  filteredData={filteredData}/>
        </div>

    )
}

export default VendorCredit
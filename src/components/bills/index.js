import React, { useState } from 'react';
import { makeStyles } from "@mui/styles";
// import { Colors } from "../../../helpers/Colors";
import Appbar from "../../shared/Appbar";
import BillsTable from './section/BillsTable';

const useStyles = makeStyles({
    container: {
        padding:'25px',
     },
})

const Bills = () => {
    const classes = useStyles()
    const [tabFiltered, setTabFiltered] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    return (
        <div className={classes.container}>
            <Appbar name={'bills'} />
            <BillsTable tabFiltered={tabFiltered}  filteredData={filteredData} />
        </div>
    )
}
export default Bills
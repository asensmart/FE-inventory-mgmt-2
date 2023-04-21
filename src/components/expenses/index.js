import React, {useEffect, useState} from 'react';
import Appbar from "../../shared/Appbar";
import {makeStyles} from "@mui/styles";
import {getExpenses} from "../../helpers/AxiosHelper";
import SearchBar from "./section/SearchBar";
import FullScreenProgress from "../../shared/FullScreenProgress";
import ExpensesTable from "./section/ExpensesTable";

const useStyles = makeStyles({
    container: {
        padding: '25px',
    }
})

const ExpensesPage = () => {

    const classes = useStyles();

    const [expenses, setExpenses] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [editData, setEditData] = useState(null);

    useEffect(() => {
        getExpenses().then(res => {
            setExpenses(res.data.reverse())
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })
    }, []);

    return (
        <div className={classes.container}>
            <Appbar name={'Expenses'}/>
            <SearchBar setIsModalOpen={setIsModalOpen} expenses={expenses} editData={editData} setEditData={setEditData} setFilteredData={setFilteredData}
                       isModalOpen={isModalOpen} setLoading={setLoading} setExpenses={setExpenses} filteredData={filteredData}/>
            <ExpensesTable setFilteredData={setFilteredData} filteredData={filteredData} setExpenses={setExpenses} expenses={expenses}
                           setIsModalOpen={setIsModalOpen} setEditData={setEditData} />
            <FullScreenProgress open={loading} setOpen={setLoading}/>
        </div>
    );
};

export default ExpensesPage;
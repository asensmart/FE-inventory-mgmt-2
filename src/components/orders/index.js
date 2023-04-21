import React, {useState} from 'react';
import Appbar from "../../shared/Appbar";
import {makeStyles} from "@mui/styles";
import SearchBar from "./section/SearchBar";
import StatusTabBar from "./section/StatusTabBar";
import {Colors} from "../../helpers/Colors";
import OrdersTable from "./section/OrdersTable";
import FullScreenProgress from "../../shared/FullScreenProgress";
import {useSelector} from "react-redux";

const useStyles = makeStyles({
    container: {
        padding: '25px',
    },
    topCon: {
        background: Colors.light,
        borderRadius: '5px',
        margin: '20px 0',
        paddingTop: '15px',
    }
})

const OrdersPage = () => {

    const classes = useStyles();

    const [filteredData, setFilteredData] = useState([]);

    const [loading, setLoading] = useState(false);

    const orders = useSelector(state => state.Order.value)

    const [value, setValue] = useState('ALL');

    const [tabFiltered, setTabFiltered] = useState([]);

    return (
        <div className={classes.container}>
            <Appbar name={'Orders'}/>
            <div className={classes.topCon}>
                <StatusTabBar setTabFiltered={setTabFiltered} orders={orders} setFilteredData={setFilteredData} value={value} setValue={setValue}/>
                <SearchBar value={value} setFilteredData={setFilteredData} filteredData={filteredData} orders={orders} tabFiltered={tabFiltered}/>
            </div>
            <OrdersTable setLoading={setLoading} tabFiltered={tabFiltered}
                         filteredData={filteredData} setFilteredData={setFilteredData}/>
            <FullScreenProgress setOpen={setLoading} open={loading}/>
        </div>
    );
};

export default OrdersPage;
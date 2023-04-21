import React, {useEffect, useState} from 'react';
import Appbar from "../../shared/Appbar";
import {makeStyles} from "@mui/styles";
import {useSelector} from "react-redux";
import {Colors} from "../../helpers/Colors";
import StatusTabBar from "./section/StatusTabBar";
import SearchBar from "./section/SearchBar";
import ReplacementTable from "./section/ReplacementTable";
import FullScreenProgress from "../../shared/FullScreenProgress";
import {getCarriers} from "../../helpers/AxiosHelper";
import EditReplacementModal from "./section/EditReplacementModal";

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

const ReplacementPage = () => {

    const classes = useStyles();

    const [filteredData, setFilteredData] = useState([]);

    const [loading, setLoading] = useState(false);

    const [replacements, setReplacements] = useState([]);

    const orders = useSelector(state => state.Order.value)

    const [tabFiltered, setTabFiltered] = useState([]);

    const [couriers, setCouriers] = useState([]);

    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const replacementTemp = orders.filter(order => order.isReplacement)
        setReplacements(replacementTemp)
    }, [orders]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getCarriers().then(res => {
            setCouriers(res.data.couriers.map(c => {
                return {...c, value: c.courier_name, label: c.courier_name}
            }))
        })
    }, []);


    return (
        <div className={classes.container}>
            <Appbar name={'Replacement'}/>
            <div className={classes.topCon}>
                <StatusTabBar setTabFiltered={setTabFiltered} replacements={replacements} setFilteredData={setFilteredData}/>
                <SearchBar setFilteredData={setFilteredData} orders={orders} tabFiltered={tabFiltered}/>
            </div>
            <ReplacementTable tabFiltered={tabFiltered} setSelectedOrder={setSelectedOrder} filteredData={filteredData} setIsModalOpen={setIsModalOpen}/>
            <EditReplacementModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} couriers={couriers} selectedOrder={selectedOrder} setLoading={setLoading}/>
            <FullScreenProgress setOpen={setLoading} open={loading}/>
        </div>
    );
};

export default ReplacementPage;
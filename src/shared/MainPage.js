import React, {useEffect} from 'react';
import {makeStyles} from "@mui/styles";
import {Colors} from "../helpers/Colors";
import {Route, Routes} from "react-router-dom";
import DashboardPage from "../components/dashboard";
import OrdersPage from "../components/orders";
import ReplacementPage from "../components/replacement";
import InventoryPage from "../components/inventory";
import UsersPage from "../components/users";
import SettingsPage from "../components/settings";
import ReportsPage from "../components/expenses";
import {useDispatch, useSelector} from "react-redux";
import AddOrdersPage from "../components/addOrder";
import EditOrderPage from "../components/editOrder";
import {getOrders} from "../helpers/AxiosHelper";
import {setOrder} from "../redux/slice/OrderSlice";
import {getFilteredResponds} from "../helpers/HelperFuctions";
import Vendorpage from '../components/vendor';
import VendorTable from '../components/vendor/section/VendorTable';
import Purchasepage from '../components/purchaseitem';
import VendorCredit from '../components/vendorcredits';
import Bills from '../components/bills';

const useStyles = makeStyles({
    container: {
        overflow: 'auto',
        height: '100%',
        '&::-webkit-scrollbar': {
            width: '5px',
        },
        '&::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
            borderRadius: '10px'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: Colors.primary,
            borderRadius: '10px',
            height: '20%'
        },
    },
})

const MainPage = () => {

    const classes = useStyles();

    const user = useSelector(state => state.User.value)

    const dispatch = useDispatch()

    useEffect(() => {
        getOrders().then(res => {
            const promises = res.data.map((obj) => {
                return getFilteredResponds(obj)
            });
            Promise.allSettled(promises).then(allRes => {
                const ordersTemp = allRes.map(r => r.value).reverse();
                dispatch(setOrder(ordersTemp))
            })
        })
    }, []);

    return (
        <div className={classes.container}>
            <Routes>
                <Route path={'/'} element={<DashboardPage />} />
                <Route path={'/orders'} element={<OrdersPage />} />
                <Route path={'/orders/add-order'} element={<AddOrdersPage />} />
                <Route path={'/orders/edit-order/:id'} element={<EditOrderPage />} />
                <Route path={'/replacement'} element={<ReplacementPage />} />
                <Route path={'/vendor'} element={<Vendorpage/>} />
                <Route path={'/vendortable'} element={<VendorTable/>} />
                <Route path={'/purchase'} element={<Purchasepage/>} />
                <Route path={'/vendorcredits'} element={<VendorCredit/>} />
                <Route path={'/bills'} element={<Bills/>} />
                {
                    user.isAdmin && (
                        <>
                            <Route path={'/inventory'} element={<InventoryPage />} />
                            <Route path={'/users'} element={<UsersPage />} />
                            <Route path={'/expenses'} element={<ReportsPage />} />
                            <Route path={'/settings'} element={<SettingsPage />} />
                        </>
                    )
                }
            </Routes>
        </div>
    );
};

export default MainPage;
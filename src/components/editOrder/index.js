import React, {useState, useEffect} from 'react';
import {makeStyles} from "@mui/styles";
import {getCarriers, getOrder, getProducts} from "../../helpers/AxiosHelper";
import Appbar from "../../shared/Appbar";
import EditCustomerInfo from "./section/EditCustomerInfo";
import EditPriceInfo from "./section/EditPriceInfo";
import {useParams} from "react-router-dom";
import EditProductInfo from "./section/EditProductInfo";

const useStyles = makeStyles({
    container: {
        padding: '25px',
    }
})

const EditOrderPage = () => {

    const defaultValue = {
        orderId: '',
        awbNumber: '',
        courier: null,
        customerName: '',
        email: '',
        products: [],
        mobileNumber: '',
        gstPercentage: '18',
        address: '',
        pinCode: '',
        isPrepaid: true,
        orderedDate: new Date(),
        advancePaid: '0',
        shipmentProfit: '0',
    }

    const classes = useStyles();

    const [data, setData] = useState(defaultValue);
    const [totalPrice, setTotalPrice] = useState(0);

    const [awbNumber, setAwbNumber] = useState('');
    const [carriers, setCarriers] = useState([]);
    const [isCourierDisabled, setIsCourierDisabled] = useState(false);

    const [products, setProducts] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        Promise.all([getProducts(), getOrder(id)]).then(results => {
            setProducts(results[0].data.map(p => {
                return {...p, label: p.name, value: p.name, quantity: '1'}
            }))
            setData(results[1].data)
            setIsCourierDisabled(results[1].data.courier !== null)
            setAwbNumber(results[1].data.awbNumber ? results[1].data.awbNumber : '')
        })

        getProducts().then(res => {
            setProducts(res.data.map(p => {
                return {...p, label: p.name, value: p.name, quantity: '1'}
            }))
        })
    }, []);

    useEffect(() => {
        getCarriers().then(res => {
            setCarriers(res.data.couriers.map(c => {
                return {...c, value: c.courier_name, label: c.courier_name}
            }))
        })
    }, []);

    useEffect(() => {
        let totalTemp = 0;
        if (data.products.length > 0) {
            data.products.forEach(p => {
                totalTemp = totalTemp + (parseInt(p.quantity) * parseInt(p.salesPrice))
            })
        }
        setTotalPrice(totalTemp)
    }, [data.products]);

    return (
        <div className={classes.container}>
            <Appbar name={'Edit Order'}/>
            <EditCustomerInfo data={data} setData={setData} awbNumber={awbNumber} isCourierDisabled={isCourierDisabled}
                              setAwbNumber={setAwbNumber} carriers={carriers}/>
            <EditProductInfo data={data} setData={setData} products={products} setProducts={setProducts}/>
            <EditPriceInfo data={data} setData={setData} awbNumber={awbNumber} totalPrice={totalPrice}/>
        </div>
    );
};

export default EditOrderPage;

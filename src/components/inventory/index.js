import React, {useEffect, useState} from 'react';
import Appbar from "../../shared/Appbar";
import {makeStyles} from "@mui/styles";
import SearchBar from "./section/SearchBar";
import {getProducts} from "../../helpers/AxiosHelper";
import FullScreenProgress from "../../shared/FullScreenProgress";
import ProductsTable from "./section/ProductsTable";

const useStyles = makeStyles({
    container: {
        padding: '25px',
    }
})

const InventoryPage = () => {

    const classes = useStyles();

    const [products, setProducts] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [editData, setEditData] = useState(null);

    useEffect(() => {
        getProducts().then(res => {
            setProducts(res.data.reverse())
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })
    }, []);


    return (
        <div className={classes.container}>
            <Appbar name={'Inventory'}/>
            <SearchBar setIsModalOpen={setIsModalOpen} products={products} editData={editData} setEditData={setEditData} setFilteredData={setFilteredData}
                       isModalOpen={isModalOpen} setLoading={setLoading} setProducts={setProducts} filteredData={filteredData}/>
            <ProductsTable setFilteredData={setFilteredData} filteredData={filteredData} products={products} setProducts={setProducts}
                           setIsModalOpen={setIsModalOpen} setEditData={setEditData} />
            <FullScreenProgress open={loading} setOpen={setLoading}/>
        </div>
    );
};

export default InventoryPage;
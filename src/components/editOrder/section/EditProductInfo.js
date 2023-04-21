import React from 'react';
import {useEffect, useState} from "react";
import Select from "react-select";
import {MdDelete} from "react-icons/md";
import {Colors} from "../../../helpers/Colors";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    container: {
        marginTop: '25px',
        '& .form-con': {
            margin: '40px 0',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridGap: '15px',
            '& .details': {
                marginBottom: '0',
                '& .title': {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: Colors.dark3,
                    margin: '0 0 8px'
                },
                '& .description': {
                    fontSize: '14px',
                    width: '80%',
                    color: Colors.dark4,
                    margin: '0'
                },
            },
            '& .card-con': {
                borderRadius: '10px',
                padding: '20px',
                background: Colors.light,
                boxShadow: '0 .125rem .25rem rgba(0,0,0,.075)',
                border: `1px solid ${Colors.light1}`,
                '& button': {
                    background: Colors.primary,
                    border: `0`,
                    borderRadius: '5px',
                    color: Colors.light,
                    padding: '5px 10px',
                    fontSize: '16px',
                    outline: 0,
                    fontFamily: 'inherit',
                    transition: 'all .5s',
                    cursor: 'pointer',
                },
                '& .input-parent': {
                    display: 'grid',
                    gridTemplateColumns: '3fr 3fr 3fr 3fr 1fr',
                    gridGap: '15px',
                    '& .input-con': {
                        marginBottom: '20px',
                        '& h6': {
                            fontSize: '14px',
                            fontWeight: 'bold',
                            color: Colors.dark3,
                            margin: '0 0 8px'
                        },
                        '& input': {
                            width: '100%',
                            padding: '10px',
                            borderRadius: '5px',
                            '&::-webkit-inner-spin-button': {
                                '-webkit-appearance': 'none',
                            },
                            '&::-webkit-outer-spin-button': {
                                '-webkit-appearance': 'none',
                            },
                            border: `1px solid ${Colors.light2}`,
                            transition: 'all .4s',
                            boxSizing: 'border-box',
                            '&:focus': {
                                outline: 0,
                                border: `1px solid ${Colors.primary}`,
                                transition: 'all .4s',
                            }
                        },
                    },
                    '& .icon-con': {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        '& .icon': {
                            fontSize: '22px',
                            cursor: 'pointer',
                            color: Colors.danger
                        }
                    }
                }
            },
        },
    },
    selectCon: {
        marginBottom: '20px',
        '& h6': {
            fontSize: '14px',
            fontWeight: 'bold',
            color: Colors.dark3,
            margin: '0 0 8px'
        },
        '& input': {
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            '&::-webkit-inner-spin-button': {
                '-webkit-appearance': 'none',
            },
            '&::-webkit-outer-spin-button': {
                '-webkit-appearance': 'none',
            },
            border: `1px solid ${Colors.light2}`,
            transition: 'all .4s',
            boxSizing: 'border-box',
            '&:focus': {
                outline: 0,
                border: `1px solid ${Colors.primary}`,
                transition: 'all .4s',
            }
        },
    },
})

const EditProductInfo = ({data, setData, products}) => {
    const classes = useStyles();

    const [isDisabled, setIsDisabled] = useState(false);

    const [filteredProducts, setFilteredProducts] = useState([...products]);

    const onQuantityChange = (value, index) => {
        const productCopy = [...data.products]
        productCopy[index] = {...productCopy[index], quantity: value}
        setData({...data, products: productCopy})
    }

    const onSalesPriceChange = (value, index) => {
        const productCopy = [...data.products]
        productCopy[index] = {...productCopy[index], salesPrice: value}
        setData({...data, products: productCopy})
    }

    const onSelectChange = (so, index) => {
        const productCopy = [...data.products]
        productCopy[index] = {...so, quantity: '1', salesPrice: '0'}
        setData({...data, products: productCopy})
    }

    const onAddProductClick = () => {
        setData({
            ...data,
            products: [...data.products, {label: '', value: '', quantity: '1', vendorName: '', stock: 1, salesPrice: '0', purchasedPrice: '0'}]
        })
    }

    useEffect(() => {
        const productsTemp = data.products;
        if (productsTemp.length > 0) {
            if (!productsTemp[productsTemp.length - 1]._id) {
                setIsDisabled(true)
            } else {
                setIsDisabled(false)
            }
        } else {
            setIsDisabled(false)
        }

        const filteredProducts = []
        products.forEach(p => {
            const fillLength = productsTemp.filter(pt => pt._id === p._id)
            if (fillLength.length === 0) {
                filteredProducts.push(p)
            }
        })

        setFilteredProducts(filteredProducts)
    }, [data.products]);

    const onDeleteClick = (index) => {
        const filteredProduct = data.products.filter((p, i) => i !== index)
        setData({...data, products: filteredProduct})
    }

    return (
        <div className={classes.container}>
            <div className={'form-con'}>
                <div className={'details'}>
                    <h6 className={'title'}>Product Information</h6>
                    <h6 className={'description'}>Add your product and quantity for the order</h6>
                </div>
                <div className={'card-con'}>
                    {
                        data.products.map((product, index) => (
                            <>
                                <div className={classes.selectCon}>
                                    <h6>Product</h6>
                                    <Select value={product} menuPosition="fixed"
                                            onChange={value => onSelectChange(value, index)}
                                            options={filteredProducts}/>
                                </div>
                                <div className={'input-parent'}>
                                    <div className={'input-con'}>
                                        <h6>Quantity</h6>
                                        <input type="number" value={product.quantity}
                                               onChange={e => onQuantityChange(e.target.value, index)}/>
                                    </div>
                                    <div className={'input-con'}>
                                        <h6>Stock</h6>
                                        <input type="text" disabled
                                               value={product.quantity !== '' ? product.stock - parseInt(product.quantity) : product.stock}/>
                                    </div>
                                    <div className={'input-con'}>
                                        <h6>Vendor</h6>
                                        <input type="text" disabled
                                               value={product.vendorName}/>
                                    </div>
                                    <div className={'input-con'}>
                                        <h6>Selling Price</h6>
                                        <input type="number" value={product.salesPrice}
                                               onChange={e => onSalesPriceChange(e.target.value, index)}/>
                                    </div>
                                    <div className={'icon-con'}>
                                        <MdDelete className={'icon'} onClick={() => onDeleteClick(index)}/>
                                    </div>
                                </div>
                            </>
                        ))
                    }
                    <button onClick={onAddProductClick} disabled={isDisabled}
                            style={{background: isDisabled ? Colors.light3 : Colors.primary}}>Add Product
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProductInfo;

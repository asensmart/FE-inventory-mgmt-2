import React, {useState, useEffect} from 'react';
import {makeStyles} from "@mui/styles";
import {HiSearch} from "react-icons/hi";
import {Colors} from "../../../helpers/Colors";
import Select from "react-select";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {useNavigate} from "react-router-dom";
import Snackbar from "../../../shared/Snackbar";
import CsvDownload from 'react-json-to-csv'

const useStyles = makeStyles({
    container: {
        display: 'grid',
        padding: '20px',
        gridTemplateColumns: '3fr 2fr 2fr 2fr 2fr 2fr',
        gridGap: '10px',
        '& .search-con': {
            display: 'flex',
            padding: '7px',
            background: Colors.light,
            borderRadius: '5px',
            border: `1px solid ${Colors.light2}`,
            '& .icon': {
                color: Colors.light4,
                fontSize: '22px',
            },
            '& input': {
                border: 0,
                outline: 0,
                marginLeft: '8px',
                width: '80%',
                '&::placeholder': {
                    color: Colors.light2,
                    letterSpacing: '1px'
                }
            }
        },
        '& .date-picker': {
            border: `1px solid ${Colors.light2}`,
            padding: '0 8px',
            background: Colors.light,
            borderRadius: '5px',
            '& .MuiIconButton-root': {
                padding: '0 !important'
            },
            '& .MuiSvgIcon-root': {
                color: Colors.primary
            },
            '& .MuiFormControl-marginNormal': {
                marginTop: '1px !important',
                marginBottom: '0px !important',
            }
        },
        '& .add-order': {
            background: Colors.primary,
            border: `1px solid ${Colors.primary}`,
            borderRadius: '5px',
            color: Colors.light,
            padding: '5px 10px',
            fontSize: '16px',
            outline: 0,
            fontFamily: 'inherit',
            transition: 'all .5s',
            cursor: 'pointer',
            '&:hover': {
                background: Colors.light,
                color: Colors.primary,
            }
        },
        '& .export': {
            background: Colors.success,
            border: `1px solid ${Colors.success}`,
            borderRadius: '5px',
            color: Colors.light,
            padding: '5px 10px',
            fontSize: '16px',
            outline: 0,
            fontFamily: 'inherit',
            transition: 'all .5s',
            cursor: 'pointer',
            '&:hover': {
                background: Colors.light,
                color: Colors.success,
            }
        }
    },
})

const SearchBar = (
    {
        setFilteredData,
        tabFiltered,
        filteredData,
        value
    }
) => {

    const classes = useStyles();

    const [selectedOption, setSelectedOption] = useState({value: 'name', label: 'Customer Name'});

    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());

    const [excelData, setExcelData] = useState([]);

    const [message, setMessage] = useState({open: false, text: '', type: 'success'});

    const [minDate, setMinDate] = useState(new Date());

    const [maxDate, setMaxDate] = useState(new Date());

    const options = [
        {value: 'name', label: 'Customer Name'},
        {value: 'product', label: 'Product Name'},
        {value: 'awb', label: 'AWB Number'},
        {value: 'pinCode', label: 'Pincode'},
        {value: 'mobile', label: 'Mobile Number'},
        {value: 'vendor', label: 'Vendor Name'},
        {value: 'prepaid', label: 'Prepaid'},
        {value: 'cod', label: 'COD'},
    ]

    useEffect(() => {
        if (tabFiltered.length > 0) {
            const maxDate = new Date(
                Math.max(
                    ...tabFiltered.map(element => {
                        return new Date(element.orderedDate);
                    }),
                ),
            );
            const minDate = new Date(
                Math.min(
                    ...tabFiltered.map(element => {
                        return new Date(element.orderedDate);
                    }),
                ),
            );
            setFromDate(minDate)
            setToDate(maxDate)
            setMinDate(minDate)
            setMaxDate(maxDate)
        }
    }, [tabFiltered]);

    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        if (searchValue !== '') {
            const filteredData = tabFiltered.filter(p => {
                if (selectedOption.value === 'name') {
                    return p.customerName.toLowerCase().includes(searchValue.toLowerCase())
                } else if (selectedOption.value === 'product') {
                    const filteredProducts = p.products.filter( p => p.name.toLowerCase().includes(searchValue.toLowerCase()))
                    return filteredProducts.length > 0
                } else if (selectedOption.value === 'awb') {
                    return p.awbNumber ? p.awbNumber.toLowerCase().includes(searchValue.toLowerCase()) : false
                } else if (selectedOption.value === 'pinCode') {
                    return p.pinCode.toString().toLowerCase().includes(searchValue.toLowerCase())
                } else if (selectedOption.value === 'mobile') {
                    return p.mobileNumber.toString().toLowerCase().includes(searchValue.toLowerCase())
                } else if (selectedOption.value === 'vendor') {
                    const filteredProducts = p.products.filter( p => p.vendorId.vendorName.toLowerCase().includes(searchValue.toLowerCase()))
                    return filteredProducts.length > 0
                } else {
                    return false;
                }
            })
            if (filteredData.length > 0) {
                setFilteredData(filteredData)
            } else {
                setMessage({open: true, text: 'Nothing found', type: 'error'})
                setFilteredData([])
            }
        } else {
            setFilteredData([])
        }
    }, [searchValue]);

    const onSelectChange = (so) => {

        const filteredData = tabFiltered.filter(p => {
            if (so.value === 'prepaid') {
                return p.isPrepaid
            } else if (so.value === 'cod') {
                return !p.isPrepaid
            } else {
                return false
            }
        })

        if (filteredData.length > 0) {
            setFilteredData(filteredData)
        } else {
            setFilteredData([])
        }

        setSelectedOption(so)
    }

    const handleFromDateChange = (date) => {
        setFromDate(date)
    }

    // const filteredDateObjects = () => {
    //     return tabFiltered.filter(d => {
    //         const time = new Date(d.orderedDate).getTime();
    //         return (fromDate.getTime() <= time && time <= toDate.getTime());
    //     });
    // }

    const handleToDateChange = (date) => {
        setToDate(date)
    }

    const navigate = useNavigate()

    // useEffect(() => {
    //     const filtered = filteredDateObjects()
    //     if (filtered.length > 0) {
    //         setFilteredData(filtered)
    //     } else {
    //         setMessage({open: true, text: 'Nothing found', type: 'error'})
    //         setFilteredData([])
    //     }
    // }, [fromDate, toDate]);

    useEffect(() => {
        const data = filteredData.length > 0 ? filteredData : tabFiltered
        const excelDataTemp = []
        data.forEach(order => {
            let productString = '';
            order.products.forEach(p => {
                productString = productString + p.name + ' - ' + p.quantity + ', ';
            })
            const cell = {
                'Order ID': order.orderId,
                'Ordered Date': new Date(order.orderedDate).toDateString(),
                'AWB Number': order.awbNumber ? order.awbNumber : 'Not Added',
                'Courier': order.courier ? order.courier.courier_name : 'Not Added',
                'Customer Name': order.customerName,
                'Email': order.email,
                'Mobile Number': order.mobileNumber,
                'Address': order.address,
                'Pincode': order.pinCode,
                'Products': productString,
                'Prepaid': order.isPrepaid ? 'Yes' : 'No',
                'GST Percentage': order.gstPercentage,
                'Total price': order.totalPrice,
                'Shipment Profit': order.shipmentProfit,
            }
            excelDataTemp.push(cell)
        })
        setExcelData(excelDataTemp)
    }, [filteredData, tabFiltered]);


    useEffect(() => {
        const filteredDataTemp = tabFiltered.filter(order => {
            const orderedAtDate = new Date(order.orderedDate);
            return fromDate.getTime() <= orderedAtDate.getTime() && toDate.getTime() >= orderedAtDate.getTime();
        })

        if (filteredDataTemp.length > 0){
            setFilteredData(filteredDataTemp)
        } else {
            setFilteredData([])
        }
    }, [fromDate, toDate]);

    const getTemplateColumns = () => {
        let template = '3fr 2fr 2fr 2fr 2fr'
        if (excelData.length > 0) {
            template = '3fr 2fr 2fr 2fr 2fr 2fr';
        }
        return template;
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className={classes.container} style={{gridTemplateColumns: getTemplateColumns()}}>
                <div className={'search-con'}>
                    <HiSearch className={'icon'}/>
                    <input value={searchValue} onChange={e => setSearchValue(e.target.value)}
                           type="text" placeholder={'Search for customer name, products....'}/>
                </div>
                <Select value={selectedOption} onChange={onSelectChange} inputValue={''} options={options}/>
                <div className={'date-picker'}>
                    <KeyboardDatePicker
                        margin="normal"
                        format="dd/MM/yyyy"
                        value={fromDate}
                        minDate={minDate}
                        maxDate={maxDate}
                        onChange={handleFromDateChange}
                        InputProps={{
                            disableUnderline: true
                        }}
                    />
                </div>
                <div className={'date-picker'}>
                    <KeyboardDatePicker
                        margin="normal"
                        format="dd/MM/yyyy"
                        value={toDate}
                        minDate={minDate}
                        maxDate={maxDate}
                        onChange={handleToDateChange}
                        InputProps={{
                            disableUnderline: true
                        }}
                    />
                </div>
                <button onClick={() => navigate('/orders/add-order')} className={'add-order'}>Add Order</button>
                {
                    excelData.length > 0 && (
                        <CsvDownload data={excelData} className={'export'} filename={'reports.csv'}>
                            Export
                        </CsvDownload>
                    )
                }
            </div>
            <Snackbar message={message} setMessage={setMessage}/>
        </MuiPickersUtilsProvider>
    );
};

export default SearchBar;
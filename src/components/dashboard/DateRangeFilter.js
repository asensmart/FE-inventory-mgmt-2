import React, {useState} from 'react';
import {DateRangePicker} from 'react-date-range';
import {makeStyles} from "@mui/styles";
import {Colors} from "../../helpers/Colors";
import {Alert, Snackbar} from "@mui/material";
import ReactToPrint from "react-to-print";

const useStyles = makeStyles({
    container: {},
    nameCon: {
        '& h6': {
            fontSize: '20px',
            color: Colors.dark3,
            fontWeight: '700',
            margin: '20px 0 20px 15px'
        }
    },
    showOrHideButtonCon: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '30px',
        '& button': {
            background: Colors.primary,
            color: Colors.light,
            padding: '8px 15px',
            borderRadius: '5px',
            border: 0,
            cursor: 'pointer'
        }
    },
    filterFooter: {
        marginTop: '10px',
        '& .apply': {
            background: Colors.primary,
            color: Colors.light,
            padding: '8px 15px',
            borderRadius: '5px',
            border: 0,
            cursor: 'pointer'
        },
        '& .cancel': {
            background: Colors.danger,
            color: Colors.light,
            padding: '8px 15px',
            borderRadius: '5px',
            marginLeft: '5px',
            border: 0,
            cursor: 'pointer'
        }
    },
})
const DateRangeFilter = ({orders, setFilteredOrders, cardRef}) => {

    const classes = useStyles();
    const [showFilter, setShowFilter] = useState(false);
    const [openError, setOpenError] = useState(false);

    const [selectionRange, setSelectionRange] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }]);

    const handleSelect = (ranges) => {
        console.log(ranges)
        setSelectionRange([ranges.selection]);
    }

    const onApplyClick = () => {
        let filteredOrdersTemp = orders.filter(order => {
            const orderedTime = new Date(order.orderedDate).getTime();
            const startDateTime = new Date(selectionRange[0].startDate).getTime();
            const endDateTime = new Date(selectionRange[0].endDate).getTime();
            return orderedTime >= startDateTime &&
                orderedTime <= endDateTime;
        })
        if (filteredOrdersTemp.length === 0) {
            setOpenError(true)
        }
        setFilteredOrders(filteredOrdersTemp)
    }

    const onClearClick = () => {
        setFilteredOrders([])
    }

    return (
        <div>
            <div className={classes.showOrHideButtonCon}>
                <button
                    onClick={() => setShowFilter(p => !p)}>{!showFilter ? 'Show Filter' : 'Hide Filter'}</button>
                <ReactToPrint
                    trigger={() => <button style={{marginLeft: '10px', background: Colors.success}}>Print this out!</button>}
                    content={() => cardRef.current}
                />
            </div>
            {
                showFilter && (
                    <>
                        <div className={classes.nameCon}>
                            <h6>Order Filter</h6>
                        </div>
                        <DateRangePicker
                            ranges={selectionRange}
                            onChange={handleSelect}
                            direction="horizontal"
                            showSelectionPreview={true}
                            moveRangeOnFirstSelection={false}
                            months={2}
                        />
                        <div className={classes.filterFooter}>
                            <button onClick={onApplyClick} className={'apply'}>Apply</button>
                            <button onClick={onClearClick} className={'cancel'}>Clear</button>
                        </div>
                    </>
                )
            }
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal : "center" }}
                open={openError}
                onClose={() => setOpenError(false)}
            >
                <Alert onClose={() => setOpenError(false)} severity="error" sx={{ width: '100%' }}>
                    <span style={{fontWeight: 'bold'}}>No Data Found</span>
                </Alert>
            </Snackbar>
        </div>
    );
};

export default DateRangeFilter;

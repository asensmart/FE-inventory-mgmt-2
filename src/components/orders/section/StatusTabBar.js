import React, {useEffect, useState} from 'react';
import {createTheme, Tab, Tabs, ThemeProvider} from "@mui/material";
import {shippingStatuses} from "../../../helpers/Constants";
import {Colors} from "../../../helpers/Colors";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    container: {
        '& button': {
            fontFamily: 'inherit',
            textTransform: 'capitalize',
            fontSize: '16px',
        }
    },
    tabContainer: {

    },
    scrollButton: {
        color: Colors.primary
    },
    tabItem: {
        color: p => p.isActive ? Colors.primary : Colors.dark4,
        fontWeight: 'bold',
    },
    count: {
        fontWeight: 'bold',
        color: p => p.isActive ? Colors.primary : Colors.dark4,
        fontSize: '16px',
    }
})

const TabItem = ({key, label, value, orgValue, setOrgValue, orders}) => {

    const [count, setCount] = useState(0);

    const classes = useStyles({isActive: orgValue === value})

    useEffect(() => {
        let filteredTemp;
        if (value === 'ALL') {
            filteredTemp = orders
        } else if (value  === 'PLD') {
            filteredTemp = orders.filter(o => !o.awbNumber)
        } else {
            filteredTemp = orders.filter(o => {
                if (o.shipWayRes) {
                    if (o.shipWayRes.status === 'Success') {
                        if (value === 'DEL') {
                            if (o.isReplacement) {
                                return true
                            } else {
                                return o.shipWayRes.response.current_status_code === value
                            }
                        } else {
                            return o.shipWayRes.response.current_status_code === value
                        }

                    } else {
                        return false
                    }
                } else {
                    return false
                }
            })
        }
        setCount(filteredTemp.length)
    }, [orders]);


    return <Tab key={key} icon={<span className={classes.count}>({count})</span>} iconPosition={'end'} aria-checked={orgValue === value} label={<span className={classes.tabItem}>{label}</span>}
                value={value} onClick={() => setOrgValue(value)}/>
}

const StatusTabBar = ({setTabFiltered, orders, setFilteredData, value, setValue}) => {


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        let filteredTemp;
        if (value === 'ALL') {
            filteredTemp = orders
        } else if (value === 'PLD') {
            filteredTemp = orders.filter(o => !o.awbNumber)
        } else {
            filteredTemp = orders.filter(o => {
                if (o.shipWayRes) {
                    if (o.shipWayRes.status === 'Success') {
                        if (value === 'DEL') {
                            if (o.isReplacement) {
                                return true
                            } else {
                                return o.shipWayRes.response.current_status_code === value
                            }
                        } else {
                            return o.shipWayRes.response.current_status_code === value
                        }

                    } else {
                        return false
                    }
                } else {
                    return false
                }
            })
        }
        setTabFiltered(filteredTemp)
        setFilteredData([])
    }, [value, orders]);


    const classes = useStyles()

    const theme = createTheme({
        palette: {
            primary: {
                main: Colors.primary
            },
            secondary: {
                main: Colors.success
            },
        }
    });

    return (
        <div className={classes.container}>
            <ThemeProvider theme={theme}>
                <Tabs
                    value={value}
                    // className={classes.tabContainer}
                    onChange={handleChange}
                    draggable={true}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    {
                        shippingStatuses.map(status => {
                            return (
                               <TabItem key={status.code} orders={orders} label={status.code}
                                        value={status.name} orgValue={value} setOrgValue={setValue}/>
                            )
                        })
                    }
                </Tabs>
            </ThemeProvider>
        </div>
    );
};

export default StatusTabBar;
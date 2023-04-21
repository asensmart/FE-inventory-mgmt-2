import React, {useState} from 'react';
import {makeStyles} from "@mui/styles";
import {Colors} from "../../../helpers/Colors";
import {createTheme, Tab, Tabs, ThemeProvider} from "@mui/material";
import {replacementStatuses} from "../../../helpers/Constants";
import {useEffect} from "react";

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

const TabItem = ({key, label, value, orgValue, setOrgValue, replacements}) => {

    const [count, setCount] = useState(0);

    const classes = useStyles({isActive: orgValue === value})

    useEffect(() => {
        let filteredTemp;
        if (value === 'ALL') {
            filteredTemp = replacements
        } else if (value === 'pending') {
            filteredTemp = replacements.filter(o => !o.replacementAwbNumber)
        } else if (value === 'completed') {
            filteredTemp = replacements.filter(o => {
                if (o.shipWayRes) {
                    if (o.shipWayRes.status === 'Success') {
                        return o.shipWayRes.response.current_status_code === 'DEL'
                    } else {
                        return false
                    }
                } else {
                    return false
                }
            })
        } else {
            filteredTemp = replacements.filter(o => {
                if (o.shipWayRes) {
                    if (o.shipWayRes.status === 'Success') {
                        return o.shipWayRes.response.current_status_code !== 'DEL'
                    } else {
                        return false
                    }
                } else {
                    return false
                }
            })
        }
        setCount(filteredTemp.length)
    }, [replacements]);


    return <Tab key={key} icon={<span className={classes.count}>({count})</span>} iconPosition={'end'} aria-checked={orgValue === value} label={<span className={classes.tabItem}>{label}</span>}
                value={value} onClick={() => setOrgValue(value)}/>
}

const StatusTabBar = ({setTabFiltered, replacements, setFilteredData}) => {

    const classes = useStyles()

    const [value, setValue] = useState('ALL');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: Colors.primary
            }
        }
    });

    useEffect(() => {
        let filteredTemp;
        if (value === 'ALL') {
            filteredTemp = replacements
        } else if (value === 'pending') {
            filteredTemp = replacements.filter(o => !o.replacementAwbNumber)
        } else if (value === 'completed') {
            filteredTemp = replacements.filter(o => {
                if (o.shipWayRes) {
                    if (o.shipWayRes.status === 'Success') {
                        return o.shipWayRes.response.current_status_code === 'DEL'
                    } else {
                        return false
                    }
                } else {
                    return false
                }
            })
        } else {
            filteredTemp = replacements.filter(o => {
                if (o.shipWayRes) {
                    if (o.shipWayRes.status === 'Success') {
                        return o.shipWayRes.response.current_status_code !== 'DEL'
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
    }, [value, replacements]);

    return (
        <div className={classes.container}>
            <ThemeProvider theme={theme}>
                <Tabs
                    value={value}
                    className={classes.tabContainer}
                    onChange={handleChange}
                    classes={{
                        scrollButtons: classes.scrollButton
                    }}
                >
                    {
                        replacementStatuses.map(status => (
                            <TabItem key={status.code} replacements={replacements} label={status.code}
                                     value={status.name} orgValue={value} setOrgValue={setValue}/>
                        ))
                    }
                </Tabs>
            </ThemeProvider>
        </div>
    );
};

export default StatusTabBar;

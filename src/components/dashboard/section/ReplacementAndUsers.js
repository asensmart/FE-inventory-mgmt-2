import React from 'react';
import {makeStyles} from "@mui/styles";
import ReplacementTable from "./ReplacementTable";
import {Colors} from "../../../helpers/Colors";
import ReactApexChart from "react-apexcharts";
import {pieChartData, pieChartOptions} from "../../../helpers/ChartData";

const useStyles = makeStyles({
    container: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gridGap: '10px',
        marginTop: '10px',
        '& .table-container': {
            padding: '20px',
            background: Colors.light,
            borderRadius: '5px',
            '& .top-bar': {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 16px',
                marginBottom: '10px',
                '& h6': {
                    fontSize: '22px',
                    margin: '0',
                    color: Colors.dark3
                },
                '& button': {
                    background: Colors.light,
                    border: `1px solid ${Colors.primary}`,
                    borderRadius: '5px',
                    color: Colors.primary,
                    padding: '5px 10px',
                    fontSize: '16px',
                    outline: 0,
                    fontFamily: 'inherit',
                    transition: 'all .5s',
                    cursor: 'pointer',
                    '&:hover': {
                        background: Colors.primary,
                        border: `1px solid ${Colors.primary}`,
                        color: Colors.light,
                    }
                }
            }
        },
        '& .chart-container': {
            padding: '20px',
            background: Colors.light,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderRadius: '5px',
            '& .top-bar': {
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '15px',
                '& h6': {
                    fontSize: '22px',
                    margin: '0',
                    color: Colors.dark3
                },
            },
            '& .info': {
                '& .top-info': {
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    '& .item': {
                        display: 'flex',
                        alignItems: 'center',
                        '& div': {
                            width: '15px',
                            height: '15px',
                            borderRadius: '40px',
                            background: Colors.primary
                        },
                        '& h6': {
                            fontSize: '14px',
                            margin: '0 0 0 5px',
                            color: Colors.dark3
                        }
                    }
                },
                '& .bottom-item': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '& div': {
                        width: '15px',
                        height: '15px',
                        borderRadius: '40px',
                        background: Colors.primary
                    },
                    '& h6': {
                        fontSize: '14px',
                        margin: '0 0 0 5px',
                        color: Colors.dark3
                    }
                }
            }
        }
    }
})

const ReplacementAndUsers = () => {

    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={'table-container'}>
                <div className={'top-bar'}>
                    <h6>New Replacements</h6>
                    <button>View All</button>
                </div>
                <ReplacementTable />
            </div>
            <div className={'chart-container'}>
                <div className={'top-bar'}>
                    <h6>Your Orders Chart</h6>
                </div>
                <ReactApexChart
                    options={pieChartOptions}
                    series={pieChartData}
                    type='pie'
                    width='100%'
                    height='55%'
                />
                <div className={'info'}>
                    <div className={'top-info'}>
                        <div className={'item'}>
                            <div/>
                            <h6>Delivered</h6>
                        </div>
                        <div className={'item'}>
                            <div style={{background: '#6AD2FF'}}/>
                            <h6>Replacement</h6>
                        </div>
                        <div className={'bottom-item'}>
                            <div style={{background: Colors.success}}/>
                            <h6>Others</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReplacementAndUsers;
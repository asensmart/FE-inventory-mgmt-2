import React from 'react';
import {
    barChartDataConsumption,
    barChartOptionsConsumption,
    lineChartDataTotalSpent,
    lineChartOptionsTotalSpent
} from "../../../helpers/ChartData";
import ReactApexChart from "react-apexcharts";
import {makeStyles} from "@mui/styles";
import {Colors} from "../../../helpers/Colors";
import {HiOutlineCalendar} from "react-icons/hi";
import {ImParagraphLeft} from "react-icons/im";
import {MdDoubleArrow} from "react-icons/md";
import {IoIosCheckmarkCircle} from "react-icons/io";

const useStyles = makeStyles({
    container: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridGap: '10px',
        marginTop: '10px',
        '& .monthly': {
            padding: '20px',
            background: Colors.light,
            borderRadius: '5px',
            '& .top-bar': {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                '& .label': {
                    display: 'flex',
                    alignItems: 'center',
                    background: Colors.light1,
                    padding: '8px',
                    borderRadius: '5px',
                    '& .cal-icon': {
                        fontSize: '20px',
                        color: Colors.dark5,
                    },
                    '& h6': {
                        fontSize: '12px',
                        margin: '0 0 0 8px',
                        color: Colors.dark5
                    }
                },
                '& .icon': {
                    fontSize: '18px',
                    color: Colors.primary,
                    background: Colors.light1,
                    padding: '10px',
                    transform: 'rotate(270deg)',
                    borderRadius: '10px',
                }
            },
            '& .chart-con': {
                display: 'grid',
                marginTop: '15px',
                gridTemplateColumns: '1fr 3fr',
                gridGap: '10px',
                '& .progress': {
                    '& h5': {
                        fontSize: '26px',
                        margin: '0',
                        fontWeight: '700 !important'
                    },
                    '& .profit': {
                        display: 'flex',
                        alignItems: 'center',
                        margin: '6px 0 10px',
                        '& h6': {
                            margin: '0',
                            fontSize: '16px',
                            fontWeight: '500',
                            color: Colors.dark5,
                        },
                        '& div': {
                            display: 'flex',
                            alignItems: 'center',
                            margin: '0 0 0 10px',
                            '& .icon': {
                                fontSize: '14px',
                                color: Colors.success,
                                transform: 'rotate(270deg)',
                            },
                            '& h6': {
                                margin: 0,
                                fontSize: '14px',
                                fontWeight: '700',
                                color: Colors.success,
                            }
                        }
                    },
                    '& .on-track': {
                        display: 'flex',
                        alignItems: 'center',
                        '& .icon': {
                            fontSize: '20px',
                            color: Colors.success,
                        },
                        '& h6': {
                            margin: '0 0 0 5px',
                            fontSize: '14px',
                            fontWeight: '700',
                            color: Colors.success,
                        }
                    }
                },
            }
        },
        '& .weekly': {
            padding: '20px',
            background: Colors.light,
            borderRadius: '5px',
            '& .top-bar': {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                '& h6': {
                    fontSize: '22px',
                    margin: '0',
                    color: Colors.dark3
                },
                '& .icon': {
                    fontSize: '18px',
                    color: Colors.primary,
                    background: Colors.light1,
                    padding: '10px',
                    transform: 'rotate(270deg)',
                    borderRadius: '10px',
                }
            },
        }
    }
})

const MonthlyAndWeeklyRevenue = () => {

    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={'monthly'}>
                <div className={'top-bar'}>
                    <div className={'label'}>
                        <HiOutlineCalendar className={'cal-icon'}/>
                        <h6>This Month</h6>
                    </div>
                    <ImParagraphLeft className={'icon'}/>
                </div>
                <div className={'chart-con'}>
                    <div className={'progress'}>
                        <h5>₹2345</h5>
                        <div className={'profit'}>
                            <h6>Profit</h6>
                            <div>
                                <MdDoubleArrow className={'icon'}/>
                                <h6>₹1890</h6>
                            </div>
                        </div>
                        <div className={'on-track'}>
                            <IoIosCheckmarkCircle className={'icon'}/>
                            <h6>On track</h6>
                        </div>
                    </div>
                   <div>
                       <ReactApexChart
                           options={lineChartOptionsTotalSpent}
                           series={lineChartDataTotalSpent}
                           type='line'
                           width='100%'
                       />
                   </div>
                </div>
            </div>
            <div className={'weekly'}>
                <div className={'top-bar'}>
                    <h6>Daily Revenue</h6>
                    <ImParagraphLeft className={'icon'}/>
                </div>
                <ReactApexChart
                    options={barChartOptionsConsumption}
                    series={barChartDataConsumption}
                    type='bar'
                    width='100%'
                    height='100%'
                />
            </div>
        </div>
    );
};

export default MonthlyAndWeeklyRevenue;
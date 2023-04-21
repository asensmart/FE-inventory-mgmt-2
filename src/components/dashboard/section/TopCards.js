import React from 'react';
import {makeStyles} from "@mui/styles";
import {Colors} from "../../../helpers/Colors";

const useStyles = makeStyles({
    container: {
        display: 'grid',
        marginTop: '20px',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
        gridGap: '10px',
        '& .card': {
            display: 'flex',
            position: 'relative',
            overflow: 'hidden',
            background: Colors.light,
            borderRadius: '5px',
            padding: '20px',
            borderBottom: `3px solid ${Colors.primary}`,
            '& .icon-con': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '60px',
                height: '60px',
                borderRadius: '50px',
                background: Colors.light1,
                '& .icon': {
                    color: Colors.primary,
                    fontSize: '24px',
                    margin: 0
                }
            },
            '& .data': {
                // marginLeft: '20px',
                '& h6': {
                    margin: '0',
                    fontSize: '16px',
                    fontWeight: '400',
                    color: Colors.dark5,
                },
                '& h5': {
                    fontSize: '26px',
                    margin: '5px 0 0 0',
                    fontWeight: '700 !important'
                }
            }
        }
    },
    orderStatusCon: {
        '& h6': {
            fontSize: '20px',
            color: Colors.dark3,
            fontWeight: '700',
            margin: '20px 0 0 15px'
        }
    }
})

const TopCards = ( {data} ) => {

    const classes = useStyles()

    const {orders, newOrders, shipped, pickedUp, inTransit,
        outForDelivery, delivered, unDelivered, rto, returned} = data

    // const ordersCountUp = useCountUp({ ref: 'orders', end: orders, duration: 0.5 });
    // const newOrdersCountUp = useCountUp({ ref: 'new-orders', end: newOrders, duration: 0.5 });
    // const shippedCountUp = useCountUp({ ref: 'shipped', end: shipped, duration: 0.5 });
    // const pickedUpCountUp = useCountUp({ ref: 'picked-up', end: pickedUp, duration: 0.5 });
    // const inTransitCountUp = useCountUp({ ref: 'in-transit', end: inTransit, duration: 0.5 });
    // const outForDeliveryCountUp = useCountUp({ ref: 'out-of-delivery', end: outForDelivery, duration: 0.5 });
    // const deliveredCountUp = useCountUp({ ref: 'delivered', end: delivered, duration: 0.5 });
    // const unDeliveredCountUp = useCountUp({ ref: 'un-delivered', end: unDelivered, duration: 0.5 });
    // const rtoCountUp = useCountUp({ ref: 'rto', end: rto, duration: 0.5 });
    // useCountUp({ ref: 'returned', end: 540 });

    // useEffect(() => {
    //     if (allOrders.length > 0) {
    //         ordersCountUp.reset();
    //         ordersCountUp.update(orders)
    //         newOrdersCountUp.update(newOrders)
    //         shippedCountUp.update(shipped)
    //         pickedUpCountUp.update(pickedUp)
    //         inTransitCountUp.update(inTransit)
    //         outForDeliveryCountUp.update(outForDelivery)
    //         deliveredCountUp.update(delivered)
    //         unDeliveredCountUp.update(unDelivered)
    //         rtoCountUp.update(rto)
    //     }
    //     console.log('inside')
    // }, [allOrders]);

    return (
        <>
            <div className={classes.orderStatusCon}>
                <h6>Order Status</h6>
            </div>
            <div className={classes.container}>
                <div className={'card'} style={{borderColor: Colors.success}}>
                    <div className={'data'}>
                        <h6>Total Orders</h6>
                        <h5>{orders}</h5>
                    </div>
                </div>
                <div className={'card'}>
                    <div className={'data'}>
                        <h6>New Orders</h6>
                        <h5>{newOrders}</h5>
                    </div>
                </div>
                <div className={'card'} style={{borderColor: Colors.dashColor1}}>
                    <div className={'data'}>
                        <h6>Shipped</h6>
                        <h5>{shipped}</h5>
                    </div>
                </div>
                <div className={'card'} style={{borderColor: Colors.dashColor2}}>
                    {/*<div className={'icon-con'}>*/}
                    {/*    <GiMoneyStack style={{fontSize: '32px'}} className={'icon'}/>*/}
                    {/*</div>*/}
                    <div className={'data'}>
                        <h6>Picked Up</h6>
                        <h5>{pickedUp}</h5>
                    </div>
                </div>
                <div className={'card'} style={{borderColor: Colors.dashColor3}}>
                    <div className={'data'}>
                        <h6>In Transit</h6>
                        <h5>{inTransit}</h5>
                    </div>
                </div>
                <div className={'card'} style={{borderColor: Colors.dashColor4}}>
                    <div className={'data'}>
                        <h6>Out for Delivery</h6>
                        <h5>{outForDelivery}</h5>
                    </div>
                </div>
                <div className={'card'} style={{borderColor: Colors.dashColor5}}>
                    <div className={'data'}>
                        <h6>Delivered</h6>
                        <h5>{delivered}</h5>
                    </div>
                </div>
                <div className={'card'} style={{borderColor: Colors.orange}}>
                    <div className={'data'}>
                        <h6>Un Delivered</h6>
                        <h5>{unDelivered}</h5>
                    </div>
                </div>
                <div className={'card'} style={{borderColor: Colors.blue}}>
                    <div className={'data'}>
                        <h6>RTO</h6>
                        <h5>{rto}</h5>
                    </div>
                </div>
                <div className={'card'} style={{borderColor: Colors.success}}>
                    <div className={'data'}>
                        <h6>RTO Delivered</h6>
                        <h5>{returned}</h5>
                    </div>
                </div>
                {/*<div className={'card'} style={{borderColor: Colors.yellow}}>*/}
                {/*    <div className={'data'}>*/}
                {/*        <h6>Returned</h6>*/}
                {/*        <h5>₹<span id={'returned'}/></h5>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </>
    );
};

export default TopCards;
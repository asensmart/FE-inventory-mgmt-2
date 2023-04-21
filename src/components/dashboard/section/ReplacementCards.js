import React from 'react';
import {makeStyles} from "@mui/styles";
import {Colors} from "../../../helpers/Colors";

const useStyles = makeStyles({
    container: {
        display: 'grid',
        marginTop: '20px',
        marginBottom: '30px',
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
            margin: '30px 0 0 15px'
        }
    }
})

const ReplacementCards = ({data}) => {

    const { totalReplacement, pendingReplacement, processingReplacement, completedReplacement} = data

    const classes = useStyles()

    return (
        <>
            <div className={classes.orderStatusCon}>
                <h6>Replacement Details</h6>
            </div>
            <div className={classes.container}>
                <div className={'card'} style={{borderColor: Colors.success}}>
                    <div className={'data'}>
                        <h6>Total Replacements</h6>
                        <h5>{totalReplacement}</h5>
                    </div>
                </div>
                <div className={'card'}>
                    <div className={'data'}>
                        <h6>Pending Replacements</h6>
                        <h5>{pendingReplacement}</h5>
                    </div>
                </div>
                <div className={'card'} style={{borderColor: Colors.dashColor1}}>
                    <div className={'data'}>
                        <h6>Processing</h6>
                        <h5>{processingReplacement}</h5>
                    </div>
                </div>
                <div className={'card'} style={{borderColor: Colors.dashColor3}}>
                    <div className={'data'}>
                        <h6>Completed</h6>
                        <h5>{completedReplacement}</h5>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReplacementCards;

import React from 'react';
import {makeStyles} from "@mui/styles";
import {Colors} from "../../../helpers/Colors";
import Select from "react-select";

const useStyles = makeStyles({
    container: {
        marginTop: '25px',
        '& hr': {
            border: 0,
            borderBottom: `2px dashed ${Colors.light2}`,
        },
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
                padding: '20px 20px 0',
                background: Colors.light,
                boxShadow: '0 .125rem .25rem rgba(0,0,0,.075)',
                border: `1px solid ${Colors.light1}`,
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
            },
        },
    },
})

const EditCustomerInfo = ({data, setData, awbNumber, setAwbNumber, isCourierDisabled, carriers}) => {

    const classes = useStyles();

    const onDataChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    const onSelectChange = (os) => {
        setData({...data, courier: os})
    }

    return (
        <div className={classes.container}>
            <div className={'form-con'}>
                <div className={'details'}>
                    <h6 className={'title'}>Customer Information</h6>
                    <h6 className={'description'}>Add your customer information for your order</h6>
                </div>
                <div className={'card-con'}>
                    <div className={'input-con'}>
                        <h6>Order ID</h6>
                        <input type="text" value={data.orderId} disabled name={'orderId'}/>
                    </div>
                    <div className={'input-con'}>
                        <h6>AWB Number</h6>
                        <input type="text" value={awbNumber} disabled={data.awbNumber} name={'awbNumber'} onChange={e => setAwbNumber(e.target.value)}/>
                    </div>
                    <div className={'input-con'}>
                        <h6>Courier</h6>
                        <Select value={data.courier} menuPosition="fixed"
                                onChange={onSelectChange} isDisabled={isCourierDisabled}
                                options={carriers}/>
                    </div>
                    <div className={'input-con'}>
                        <h6>Customer Name</h6>
                        <input type="text" value={data.customerName} name={'customerName'} onChange={onDataChange}/>
                    </div>
                    <div className={'input-con'}>
                        <h6>Email</h6>
                        <input type="text" value={data.email} name={'email'} onChange={onDataChange}/>
                    </div>
                    <div className={'input-con'}>
                        <h6>Mobile Number</h6>
                        <input type="number" value={data.mobileNumber} name={'mobileNumber'} onChange={onDataChange}/>
                    </div>
                    <div className={'input-con'}>
                        <h6>Address</h6>
                        <input type="text" value={data.address} name={'address'} onChange={onDataChange}/>
                    </div>
                    <div className={'input-con'}>
                        <h6>Pincode</h6>
                        <input type="number" value={data.pinCode} name={'pinCode'} onChange={onDataChange}/>
                    </div>
                </div>
            </div>
            <hr/>
        </div>
    );
};

export default EditCustomerInfo;

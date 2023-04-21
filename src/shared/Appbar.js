import React from 'react';
import {makeStyles} from "@mui/styles";
import {AiOutlineUser} from "react-icons/ai";
import {Colors} from "../helpers/Colors";
import {useSelector} from "react-redux";


const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& .labels': {
            '& h6': {
                margin: '0',
                fontSize: '18px',
                fontWeight: '400'
            },
            '& h5': {
                fontSize: '26px',
                margin: '10px 0 0 0',
                fontWeight: '700'
            }
        },
        '& .icon-con': {
            display: 'flex',
            alignItems: 'flex-end',
            '& .box': {
                width: '55px',
                height: '55px',
                background: Colors.light,
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '& .icon': {
                    fontSize: '28px',
                    color: Colors.primary
                },
            },
            '& .text': {
                marginRight: '10px',
                '& h6': {
                    margin: '0',
                    textAlign: 'right',
                    fontSize: '14px',
                    fontWeight: '400'
                },
                '& h5': {
                    fontSize: '16px',
                    textAlign: 'right',
                    margin: '10px 0 0 0',
                    fontWeight: '700'
                }
            }
        }
    }
})

const Appbar = ({name}) => {

    const classes = useStyles();

    const user = useSelector(state => state.User.value)

    return (
        <div className={classes.container}>
            <div className={'labels'}>
                <h6>Pages / {name}</h6>
                <h5>{name}</h5>
            </div>
            <div className={'icon-con'}>
                <div className={'text'}>
                    <h5>{user.name}</h5>
                    <h6>{user.username}</h6>
                </div>
                <div className={'box'}>
                    <AiOutlineUser className={'icon'}/>
                </div>
            </div>
        </div>
    );
};

export default Appbar;
import React from 'react';
import {makeStyles} from "@mui/styles";
import {Colors} from "../helpers/Colors";
import {BiHomeAlt, BiCart, BiRepeat, BiBox, BiUser, BiLogOutCircle,BiPurchaseTagAlt,BiPurchaseTag,BiReceipt,BiDollarCircle} from "react-icons/bi";
import {useLocation, useNavigate} from "react-router-dom";
import {RiMoneyDollarCircleLine} from "react-icons/ri";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../redux/slice/UserSlice";
import Swal from "sweetalert2";
import logo from '../assets/logo.jpg'

const useStyles = makeStyles({
    container: {
        '& .heading': {
            display: 'flex',
            justifyContent: 'center',
            '& h6': {
                textAlign: 'center',
                fontSize: '26px',
                textTransform: 'uppercase',
                fontWeight: '700',
                margin: '20px 0',
                '& span': {
                    fontWeight: '400',
                }
            },
            '& img': {
                width: '60%',
                margin: '20px auto',
            },
            borderBottom: `1px solid ${Colors.light2}`
        },
        '& .nav-con': {
            margin: '20px 0 20px 20px',
            '& .nav-item-active': {
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                '& .icon': {
                    fontSize: '24px',
                    color: Colors.primary
                },
                '& h6': {
                    fontSize: '15px',
                    color: Colors.primary,
                    cursor: 'pointer',
                    fontWeight: '700',
                    margin: '0 0 0 12px',
                },
                '& div': {
                    height: '50px',
                    width: '4px',
                    borderTopLeftRadius: '5px',
                    borderBottomLeftRadius: '5px',
                    marginLeft: 'auto',
                    background: Colors.primary
                }
            },
            '& .nav-item': {
                display: 'flex',
                cursor: 'pointer',
                alignItems: 'center',
                '& .icon': {
                    fontSize: '24px',
                    color: Colors.dark3
                },
                '& h6': {
                    fontSize: '15px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    color: Colors.dark3,
                    margin: '0 0 0 12px',
                },
                '& div': {
                    height: '50px',
                    width: '4px',
                    borderTopLeftRadius: '5px',
                    borderBottomLeftRadius: '5px',
                    marginLeft: 'auto',
                }
            }
        }
    }
})

const SideBar = () => {

    const classes = useStyles();

    const navigate = useNavigate();
    const location = useLocation();

    const user = useSelector(state => state.User.value)

    const onNavigateClick = (name) => {
        navigate(name)
    }

    const dispatch = useDispatch()

    const onLogoutClick = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to Logout!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: Colors.danger,
            cancelButtonColor: Colors.success,
            confirmButtonText: 'Yes, Logout!'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                dispatch(setUser(null))
            }
        })
    }

    return (
        <div className={classes.container}>
            <div className={'heading'}>
                {/*<h6>Fashion <span>Kings</span></h6>*/}
                <img src={logo} alt="Fashion Kings"/>
            </div>
            <div className={'nav-con'}>
                <div onClick={() => onNavigateClick('/')}
                     className={location.pathname === '/' ? 'nav-item-active' : 'nav-item'}>
                    <BiHomeAlt className={'icon'}/>
                    <h6>Dashboard</h6>
                    <div/>
                </div>
                <div onClick={() => onNavigateClick('/orders')}
                     className={location.pathname.includes('/orders') ? 'nav-item-active' : 'nav-item'}>
                    <BiCart className={'icon'}/>
                    <h6>Orders</h6>
                    <div/>
                </div>
                <div onClick={() => onNavigateClick('/replacement')}
                     className={location.pathname === '/replacement' ? 'nav-item-active' : 'nav-item'}>
                    <BiRepeat className={'icon'}/>
                    <h6>Replacement</h6>
                    <div/>
                </div>
                <div onClick={() => onNavigateClick('/vendor')}
                     className={location.pathname === '/vendor' ? 'nav-item-active' : 'nav-item'}>
                    <BiPurchaseTagAlt className={'icon'}/>
                    <h6>Vendor</h6>
                    <div/>
                </div>
                <div onClick={() => onNavigateClick('/purchase')}
                     className={location.pathname === '/purchase' ? 'nav-item-active' : 'nav-item'}>
                    <BiPurchaseTag className={'icon'}/>
                    <h6>Purchase Item</h6>
                    <div/>
                </div>
                <div onClick={() => onNavigateClick('/vendorcredits')}
                     className={location.pathname === '/vendorcredits' ? 'nav-item-active' : 'nav-item'}>
                    <BiDollarCircle className={'icon'}/>
                    <h6>Vendor credits</h6>
                    <div/>
                </div>
                <div onClick={() => onNavigateClick('/bills')}
                     className={location.pathname === '/bills' ? 'nav-item-active' : 'nav-item'}>
                    <BiReceipt className={'icon'}/>
                    <h6>Bills</h6>
                    <div/>
                </div>
                
                {
                    user.isAdmin && (
                        <>
                            <div onClick={() => onNavigateClick('/inventory')}
                                 className={location.pathname === '/inventory' ? 'nav-item-active' : 'nav-item'}>
                                <BiBox className={'icon'}/>
                                <h6>Inventory</h6>
                                <div/>
                            </div>
                            <div onClick={() => onNavigateClick('/users')}
                                 className={location.pathname === '/users' ? 'nav-item-active' : 'nav-item'}>
                                <BiUser className={'icon'}/>
                                <h6>Users</h6>
                                <div/>
                            </div>
                            <div onClick={() => onNavigateClick('/expenses')}
                                 className={location.pathname === '/expenses' ? 'nav-item-active' : 'nav-item'}>
                                <RiMoneyDollarCircleLine className={'icon'}/>
                                <h6>Expenses</h6>
                                <div/>
                            </div>
                            {/*<div onClick={() => onNavigateClick('/settings')}*/}
                            {/*     className={location.pathname === '/settings' ? 'nav-item-active' : 'nav-item'}>*/}
                            {/*    <RiSettingsLine className={'icon'}/>*/}
                            {/*    <h6>Settings</h6>*/}
                            {/*    <div/>*/}
                            {/*</div>*/}
                        </>
                    )
                }

                <div className={'nav-item'} onClick={onLogoutClick}>
                    <BiLogOutCircle className={'icon'}/>
                    <h6>Logout</h6>
                    <div/>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
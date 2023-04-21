import React from 'react';
import {makeStyles} from "@mui/styles";
import {AiOutlineUser} from "react-icons/ai";
import {Colors} from "../../../helpers/Colors";
import Swal from "sweetalert2";
import {deleteUser, getUsers} from "../../../helpers/AxiosHelper";

const useStyles = makeStyles({
    container: {
        display: "grid",
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridGap: '10px',
        marginTop: '20px',
        '& .single-user': {
            background: Colors.light,
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            borderRadius: '5px',
            '& .top': {
                height: '90px',
                background: Colors.primary,
                borderTopLeftRadius: '5px',
                borderTopRightRadius: '5px',
            },
            '& .content': {
                padding: '15px',
                '& .name': {
                    display: 'flex',
                    alignItems: 'flex-end',
                    '& .icon-con': {
                        width: '90px',
                        height: '90px',
                        borderRadius: '90px',
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                        display: 'flex',
                        marginTop: '-40px',
                        background: Colors.light,
                        justifyContent: 'center',
                        alignItems: 'center',
                        // border: `2px solid ${Colors.danger}`,
                        '& .icon': {
                            fontSize: '38px',
                            color: Colors.primary
                        }
                    },
                    '& .text-con': {
                        marginLeft: '10px',
                        marginBottom: '8px',
                        '& h6': {
                            margin: '0 0 0',
                            fontSize: '14px',
                            fontWeight: '400',
                            color: Colors.dark3
                        },
                        '& h5': {
                            margin: '0',
                            fontSize: '16px',
                            fontWeight: '700'
                        }
                    }
                },
                '& .role': {
                    margin: '15px 0',
                    '& h6': {
                        margin: '5px 0 0 0',
                        fontSize: '13px',
                        fontWeight: '400',
                        color: Colors.light4
                    },
                    '& h5': {
                        margin: '0',
                        fontSize: '18px',
                        fontWeight: '700'
                    }
                },
                '& .action': {
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gridGap: '8px',
                    '& .delete': {
                        background: Colors.danger,
                        padding: '8px',
                        border: 0,
                        outline: 0,
                        cursor: 'pointer',
                        color: Colors.light,
                        fontFamily: 'inherit',
                        borderRadius: '5px'
                    },
                    '& .edit': {
                        background: Colors.primary,
                        padding: '8px',
                        border: 0,
                        outline: 0,
                        cursor: 'pointer',
                        color: Colors.light,
                        fontFamily: 'inherit',
                        borderRadius: '5px'
                    }
                }
            }
        }
    }
})

const UserCards = ({setUsers, users, setFilteredData, filteredData, setEditData, setIsModalOpen}) => {

    const classes = useStyles();

    const onDeleteProductClick = (data) => {
        if (!data.isAdmin){
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: Colors.danger,
                cancelButtonColor: Colors.success,
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteUser(data._id).then(() => {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        ).then(() => {
                            getUsers().then(res => {
                                setUsers(res.data)
                                setFilteredData([])
                            })
                        })
                    })
                }
            })
        }
    }

    const onEditClick = (data) => {
        setEditData({...data, password: ''});
        setIsModalOpen(true)
    }

    return (
        <div className={classes.container}>
            {
                (filteredData.length > 0 ? filteredData : users).map(user => {

                    const {name, username, role, createdAt, isAdmin} = user

                    return(
                        <div className={'single-user'}>
                            <div className={'top'} style={{backgroundColor: isAdmin ? Colors.success : Colors.primary}}/>
                            <div className={'content'}>
                                <div className={'name'}>
                                    <div className={'icon-con'}>
                                        <AiOutlineUser className={'icon'}/>
                                    </div>
                                    <div className={'text-con'}>
                                        <h5>{name}</h5>
                                        <h6>{username}</h6>
                                    </div>
                                </div>
                                <div className={'role'}>
                                    <h5>{role}</h5>
                                    <h6>{new Date(createdAt).toDateString()}</h6>
                                </div>
                                <div className={'action'} style={{gridTemplateColumns: isAdmin ? '1fr' : '1fr 1fr'}}>
                                    {
                                        !isAdmin && (
                                            <button className={'delete'} onClick={() => onDeleteProductClick(user)}>
                                                Delete
                                            </button>
                                        )
                                    }
                                    <button className={'edit'} onClick={() => onEditClick(user)}>
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default UserCards;

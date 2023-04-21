import React, {useEffect, useState} from 'react';
import {makeStyles} from "@mui/styles";
import {HiSearch} from "react-icons/hi";
import {Colors} from "../../../helpers/Colors";
import Select from "react-select";
import AddUserModal from "./AddUserModal";

const useStyles = makeStyles({
    container: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr',
        margin: '20px 0',
        gridGap: '10px',
        '& .search-con': {
            display: 'flex',
            padding: '7px',
            background: Colors.light,
            borderRadius: '5px',
            border: `1px solid ${Colors.light2}`,
            '& .icon': {
                color: Colors.light4,
                fontSize: '22px',
            },
            '& input': {
                border: 0,
                outline: 0,
                marginLeft: '8px',
                width: '80%',
                '&::placeholder': {
                    color: Colors.light2,
                    letterSpacing: '1px'
                }
            }
        },
        '& .add-order': {
            background: Colors.primary,
            border: `1px solid ${Colors.primary}`,
            borderRadius: '5px',
            color: Colors.light,
            padding: '5px 10px',
            fontSize: '16px',
            outline: 0,
            fontFamily: 'inherit',
            transition: 'all .5s',
            cursor: 'pointer',
            '&:hover': {
                background: Colors.light,
                color: Colors.primary,
            }
        }
    }
})

const SearchBar = ({
                       setLoading, isModalOpen, setIsModalOpen, users, setUsers,
                       editData, setEditData, setFilteredData
                   }) => {

    const classes = useStyles();

    const [selectedOption, setSelectedOption] = useState({value: 'name', label: 'Full Name'});


    const options = [
        {value: 'name', label: 'Full Name'},
        {value: 'username', label: 'Username'},
    ]

    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        if (searchValue !== '') {
            const filteredData = users.filter(p => {
                if (selectedOption.value === 'name') {
                    return p.name.toLowerCase().includes(searchValue.toLowerCase())
                } else {
                    return p.username.toLowerCase().includes(searchValue.toLowerCase())
                }
            })
            if (filteredData.length > 0) {
                setFilteredData(filteredData)
            } else {
                setFilteredData([])
            }
        } else {
            setFilteredData([])
        }
    }, [searchValue]);


    const onSelectChange = (so) => {
        setSelectedOption(so)
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    return (
        <div className={classes.container}>
            <div className={'search-con'}>
                <HiSearch className={'icon'}/>
                <input value={searchValue} onChange={e => setSearchValue(e.target.value)} type="text"
                       placeholder={'Search for customer name, products....'}/>
            </div>
            <Select value={selectedOption} onChange={onSelectChange} inputValue={''} options={options}/>
            <button className={'add-order'} onClick={showModal}>Add Users</button>
            <AddUserModal setUsers={setUsers} editData={editData} setEditData={setEditData}
                          setFilteredData={setFilteredData}
                          isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setLoading={setLoading}/>
        </div>
    );
};

export default SearchBar;
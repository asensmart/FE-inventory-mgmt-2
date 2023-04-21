import React, {useEffect, useState} from 'react';
import Appbar from "../../shared/Appbar";
import {makeStyles} from "@mui/styles";
import {getUsers} from "../../helpers/AxiosHelper";
import FullScreenProgress from "../../shared/FullScreenProgress";
import SearchBar from "./section/SearchBar";
import UserCards from "./section/UserCards";

const useStyles = makeStyles({
    container: {
        padding: '25px',
    }
})

const UsersPage = () => {

    const classes = useStyles();

    const [users, setUsers] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [editData, setEditData] = useState(null);

    useEffect(() => {
        getUsers().then(res => {
            setUsers(res.data)
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })
    }, []);

    return (
        <div className={classes.container}>
            <Appbar name={'Users'}/>
            <SearchBar setIsModalOpen={setIsModalOpen} users={users} editData={editData} setEditData={setEditData} setFilteredData={setFilteredData}
                       isModalOpen={isModalOpen} setLoading={setLoading} setUsers={setUsers} filteredData={filteredData}/>
            <UserCards setFilteredData={setFilteredData} filteredData={filteredData} users={users} setUsers={setUsers}
                       setIsModalOpen={setIsModalOpen} setEditData={setEditData}/>
            <FullScreenProgress open={loading} setOpen={setLoading}/>
        </div>
    );
};

export default UsersPage;
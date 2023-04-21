import React, {useEffect, useState} from "react";
import AppContainer from "./shared/AppContainer";
import './App.css'
import {useDispatch, useSelector} from "react-redux";
import AuthPage from "./components/auth";
import {verifyUser} from "./helpers/AxiosHelper";
import FullScreenProgress from "./shared/FullScreenProgress";
import {setUser} from "./redux/slice/UserSlice";
import {BrowserRouter} from "react-router-dom";

function App() {

    const user = useSelector(state => state.User.value)

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem('userToken')
        if (token !== null) {
            verifyUser(token).then(res => {
                if (res.data.key === 'success') {
                    dispatch(setUser(res.data.data))
                } else {
                    localStorage.clear()
                }
                setLoading(false)
            }).catch(e => {
                setLoading(false)
                localStorage.clear()
            })
        } else {
            setLoading(false)
        }
    }, []);

    if (!loading) {
        return (
            <BrowserRouter>
                {
                    user !== null ?
                        <AppContainer/> :
                        <AuthPage/>
                }
            </BrowserRouter>
        );
    } else {
        return <FullScreenProgress setOpen={setLoading} open={loading}/>
    }
}

export default App;

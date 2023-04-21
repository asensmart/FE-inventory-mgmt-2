import React, {useState} from 'react';
import {makeStyles} from "@mui/styles";
import bg from '../../assets/whiteBg.jpg'
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import {Colors} from "../../helpers/Colors";
import {useDispatch} from "react-redux";
import {setUser} from "../../redux/slice/UserSlice";
import Snackbar from "../../shared/Snackbar";
import {loginUser} from "../../helpers/AxiosHelper";
import FullScreenProgress from "../../shared/FullScreenProgress";
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles({
    container: {
        width: '100%',
        height: '100vh',
        background: `url(${bg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& .form-con': {
            width: '22%',
            backgroundColor: Colors.light,
            borderRadius: '5px',
            boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
            zIndex: 2,
            padding: '30px',
            '& h5': {
                margin: 0,
                fontSize: '20px',
                color: Colors.dark4,
                marginBottom: '25px',
            },
            '& .input-con': {
                height: '40px',
                border: `1px solid ${Colors.light2}`,
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0 8px',
                alignItems: 'center',
                transition: 'all .5s',
                marginBottom: '15px',
                borderRadius: '5px',
                '&:focus-within': {
                    border: `1px solid ${Colors.primary}`,
                },
                '& input': {
                    outline: 0,
                    fontSize: '15px',
                    letterSpacing: '1px',
                    border: 0,
                    width: '90%',
                    '&::placeholder': {
                        fontSize: '15px',
                        color: Colors.light4,
                        letterSpacing: '1px'
                    }
                },
                '& .icon': {
                    color: Colors.dark3,
                    fontSize: '22px'
                }
            },
            '& button': {
                height: '42px',
                color: Colors.light,
                borderRadius: '5px',
                fontFamily: 'inherit',
                fontSize: '15px',
                letterSpacing: '1px',
                width: '100%',
                outline: 0,
                backgroundColor: Colors.primary,
                border: 0,
                transition: 'all .5s'
            }
        }
    }
})

const AuthPage = () => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const defaultData = {
        username: '',
        password: ''
    }

    const [data, setData] = useState(defaultData);

    const [message, setMessage] = useState({open: false, text: '', type: 'success'});
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch()

    const classes = useStyles(data)

    const onDataChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    const navigate = useNavigate();

    const onLoginClick = () => {
        const {username, password} = data;
        if (username !== '' && password !== '') {
            setLoading(true)
            loginUser(data).then(res => {
                if (res.data.key === 'success'){
                    localStorage.setItem('userToken', res.data.token)
                    setMessage({open: true, text: 'Logged In', type: 'success'})
                    dispatch(setUser(res.data.data))
                    navigate('/')
                } else {
                    setMessage({open: true, text: res.data.message, type: 'error'})
                }
                setLoading(false)
            }).catch(() => {
                setLoading(false)
                setMessage({open: true, text: 'Something went wrong', type: 'error'})
            })
        } else {
            setMessage({open: true, text: 'Fields should not be empty', type: 'error'})
        }
    }

    return (
        <div className={classes.container}>
            <div className={'form-con'}>
                <h5>Sign in with your username</h5>
                <div className={'input-con'}>
                    <input name={'username'} value={data.username} onChange={onDataChange} type="text"
                           placeholder={'Username'}/>
                </div>
                <div className={'input-con'}>
                    <input name={'password'} value={data.password} onChange={onDataChange}
                           type={isPasswordVisible ? 'text' : 'password'} placeholder={'Password'}/>
                    {
                        isPasswordVisible ?
                            <AiOutlineEye onClick={() => setIsPasswordVisible(false)} className={'icon'}/> :
                            <AiOutlineEyeInvisible onClick={() => setIsPasswordVisible(true)} className={'icon'}/>
                    }
                </div>
                <button onClick={onLoginClick}>
                    Continue
                </button>
            </div>
            <Snackbar message={message} setMessage={setMessage}/>
            <FullScreenProgress open={loading} setOpen={setLoading}/>
        </div>
    );
};

export default AuthPage;
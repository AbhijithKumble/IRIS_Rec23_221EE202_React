import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector} from "react-redux";
import { authActions } from "../../store/store";

axios.defaults.withCredentials = true;

const Logout = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const isLoggedIn = useSelector((state) => state.isLoggedIn);


    const sendLogoutReq = async () =>{
       try { 
            const res = await axios.post('http://localhost:5000/logout', null , {
                withCredentials: true,
            });
            if (res.status === 200) {
                history('/login');
                return res;
            }
            return new Error("Unable to Logout. Please try again");
            
        } catch(error) {
            console.error(error);
        }
    };


    const handleLogout = () => {
        sendLogoutReq().then(() => {
            dispatch(authActions.logout());

        }).catch(err => console.error(err))
    };

    return (
        isLoggedIn && (<button onClick={handleLogout}>Logout</button>)
    );
};

export default Logout;
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
    const history = useNavigate();

    const handleLogout = async () =>{
       try { 
            await axios.get('http://localhost:5000/logout')
            .then((res) => {
                console.log(res.message);
                // if(res.status == 200)
                history('/login');
            }) 
            .catch(error => {
                console.error(error.message);
            });
        } catch(error) {
            console.error(error);
        }
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
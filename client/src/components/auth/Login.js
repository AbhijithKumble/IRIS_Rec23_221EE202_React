import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./Login.css"

const Login = () => {

    const history = useNavigate();

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const data = {
        username,
        password
    };


    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit =async (event) => {

        event.preventDefault();

        try {
            await axios.post("http://localhost:5000/login",data, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then((res) => {
                console.log(res);
                if (res.data['status'] === "success")
                history('/home', {state:`${res.data['role']}`});
                else {
                    alert("wrong details");
                    history('/login' );
                }
            })
            .catch((error) => {
                console.log(`${error}`);
            });
        }
        catch(error) {
            console.log(error.message);
        }

    };
    
    return(
        <div className="App">
            <form   className="login" method="post">
                <label htmlFor="username">Username</label>
                <input className="username" type="text" onChange={handleUsernameChange} value={username} required autoFocus></input>
                <label htmlFor="password">Password</label>
                <input className="username" type="password" onChange={handlePasswordChange} value={password} required></input>
                <button onClick={handleSubmit} type="button" value="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
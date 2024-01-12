import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/store.js";
import "./Login.css"

const Login = () => {
    const dispatch = useDispatch();
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

    const sendRequest =async () => {
        await axios.post("http://localhost:5000/login",data)
        .then((res) => {
            console.log(res.status === 200);
            if (res.status === 200) {
                console.log(res);
                history('/home', {state : res.data.role});
            }
            else {
                alert("wrong details");
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        sendRequest()
            .then(() => dispatch(authActions.login()))
            // .then(() => history("/home"));
    };
    
    return(
        <div className="App">
            <form className="login" method="post">
                <label htmlFor="username">Username</label>
                <input className="username" type="text" onChange={handleUsernameChange} value={username} required autoFocus></input>
                <label htmlFor="password">Password</label>
                <input className="username" type="password" onChange={handlePasswordChange} value={password} required></input>
                <button id="login-button" onClick={handleSubmit} type="submit" value="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
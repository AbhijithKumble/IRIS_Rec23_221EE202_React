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
        try {
            const response = await axios.post("http://localhost:5000/login", data);
      
            if (response.status === 200) {
              history('/home', { state: response.data.role });
            }
          } catch (error) {
            if (error.response && error.response.status === 401) {
              alert("Wrong credentials");
            } else {
              console.error("An error occurred:", error);
            }
        }

     
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        sendRequest().then(() => {
            dispatch(authActions.login());
        });
    };
    
    return(
        <div className="App">
            <form className="login" method="post">
                <label htmlFor="username">Username</label>
                <input 
                    className="username" 
                    type="text" 
                    onChange={handleUsernameChange} 
                    value={username} 
                    required 
                    autoFocus 
                />
                <label htmlFor="password">Password</label>
                <input 
                    className="username" 
                    type="password" 
                    onChange={handlePasswordChange} 
                    value={password} 
                    required 
                />
                <button id="login-button" onClick={handleSubmit} type="submit" value="submit">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
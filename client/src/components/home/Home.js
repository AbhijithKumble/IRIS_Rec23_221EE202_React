import React from "react";
import { useLocation  , useNavigate} from "react-router-dom";
import axios from "axios";
import Profile from "./Profile";
import Logout from "../auth/Logout";
import "./Home.css";

axios.defaults.withCredentials = true;

let firstRender = true;

const Admin = (prop) => {
    const navigate = useNavigate();

    const createApplicationBtn = () => {
        navigate('/create')
    };

    const viewApplicationBtn = () => {
        navigate('/view')
    };


    return (
    <>
        <Logout />
        <button className="create-application" onClick={createApplicationBtn}>Create Application</button>
        <button className="view-application" onClick={viewApplicationBtn}>View Application</button>
        <Profile 
            role = {prop.role}
        />
    </>
    );
    
};

const Student = (prop) => {

    const navigate = useNavigate();

    const applyApplicationBtn = () => {
        navigate('/apply')
    };
 
    const viewApplicationBtn = () => {
        navigate('/view')
    };


    return (<>
        <Logout />
        <button className="apply" onClick={applyApplicationBtn}>Apply</button>
        <button className="view-application" onClick={viewApplicationBtn} >View Application</button>
        <Profile 
            role = {prop.role}
        />
    </>);
    
};


const Home = () => {
    const location = useLocation();  
    const [user , setUser] = React.useState();
    

    const refreshToken = async () => {
        const res = await axios.get("http://localhost:5000/refresh", {
            withCredentials: true,
        })
        .catch((err) => console.log(err));

        const data = await res.data;
        return data;
    };

    const sendRequest = async () => {
        const res = await axios.get("http://localhost:5000/user", {
            withCredentials: true,
        })
        .catch((err) => console.log(err));

        const data = await res.data;
        return data;
    };

    React.useEffect(() => {
        if (firstRender) {
        firstRender = false;
        sendRequest()
        .then((data) => setUser(data.user));
        }

        let interval = setInterval(() => {
            refreshToken()
            .then((data) => setUser(data.user));
        }, 1000 * 3600);

        return () => clearInterval(interval);
    
    }, []);

    


    return (
        <div>
            {  location.state === "admin" && <Admin role={location.state} user = {user}/>}
            {  location.state ==="student" && <Student role={location.state} />} 
        </div>
    )
};

export default Home;
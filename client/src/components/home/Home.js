import React from "react";
import { useLocation } from "react-router-dom";
import Profile from "./Profile";
import Logout from "../auth/Logout";


const Admin = (prop) => {
    return (<>
        <Logout />
        <Profile 
            role = {prop.role}
        />
        <button className="create-application">Create Application</button>
        <button className="view-application">View Application</button>
    </>);
    
};

const Student = (prop) => {
    return (<>
        <Logout />
        <Profile 
            role = {prop.role}
         />
        <button className="apply">Apply</button>
        <button className="view-application">View Application</button>
    </>);
    
};


const Home = () => {
    const location = useLocation();     

    return (
        <div>
            {  location.state === "admin" && <Admin role={location.state} />}
            {  location.state ==="student" && <Student role={location.state} />} 
        </div>
    )
};

export default Home;
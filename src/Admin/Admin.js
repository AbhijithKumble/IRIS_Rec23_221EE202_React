// import {Routes, Route, useNavigate} from 'react-router-dom';


const Admin = () => {
    return (
        <div className="admin">
            <nav>
                <div><button className="templates">Templates</button></div>
                <div><button className="application">Application</button></div>
            </nav>
            <div className="profile">
                <h3>Profile</h3>
            </div>

        </div>
    );
};

export default Admin;
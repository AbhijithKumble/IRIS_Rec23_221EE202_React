import {Routes, Route, useNavigate} from 'react-router-dom';
import Applications from './Applications.js';
import Templates from './Templates.js';

const Admin = () => {
    const navigate = useNavigate();

    const navigateTemplates = () => {
        navigate('./Template.js');
    };
    
    const navigateApplications = () => {
        navigate('./Application.js');
    };
    
    return (
        <div className="admin">
            <nav>
                <div>
                    <button className="templates" onClick={navigateTemplates}>Templates</button>
                </div>
                
                <div>
                    <button className="application" onClick={navigateApplications}>Application</button>
                </div>

                <Routes>
                    <Route path='./Applications.js' element={<Applications />}  />  
                    <Route path='./Templates.js' element={<Templates />} />  
                </Routes>

            </nav>
            <div className="profile">
                <h3>Profile</h3>
            </div>

        </div>
    );
};

export default Admin;
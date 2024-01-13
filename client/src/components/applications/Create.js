import React from "react";
import "./Create.css"

const Docs = (prop) => {
    return (
        <div className="docs">
            Upload docs
            <input className="doc-input" type="file" max="100kb"></input>
        </div>
    );

};

const Approval = () => {

    const [option, setOption] = React.useState('Student');

    const handleOptionChange = (event) => {
        setOption(event.target.value);
    };

    return (
        <div>
            <select onChange={handleOptionChange} value={option}>
            <option>Student</option>
            <option>Academic Section</option>
            <option>Iris</option>
            </select>
            
        </div>
    );
};


const Create = () => {

    const [approvalElementArr, setApprovalElementArr] = React.useState([]);
    const [docs , setDocsArr]  = React.useState([]);

    const addControlFlow = () => {
        setApprovalElementArr([...approvalElementArr, <Approval />]);
    };

    const handleDocs = () => {
        setDocsArr([...docs, <Docs />]);
    };

    const handleDeleteBtn = (index) => {
        setApprovalElementArr((approvalElementArr) => {
            const newApprovalElementArr = approvalElementArr.filter((_, i) =>  i!==index);
            return newApprovalElementArr;
        });
    };

    

    return (
        <>
            <div className="form">
                <label htmlFor="id">ID</label>
                <input className="id" type="number" required></input>
                <label htmlFor="name">Name</label>
                <input className="name" type="text" required></input>
                {approvalElementArr.map((ele, index) =>{
                        return (
                            <> 
                                <div>
                                <p>{index + 1}</p> 
                                {ele}
                                </div>
                                <button onClick={() => handleDeleteBtn(index)}>Delete</button>
                                <br />
                            </>
                            
                        );
                    }
                )}
                <button className="add-control-flow" onClick={addControlFlow}>Add HigherUP</button>
                {docs.map((ele, index) =><> <p>{index + 1}</p> {ele}</>)}
                <button className="add-docs" onClick={handleDocs}>Add Docs</button>
                <br />
                <button >Create Application</button>
            </div>
        </>
    );




};

export default Create;
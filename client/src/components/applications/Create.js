import React from "react";
import "./Create.css";

const Docs = (prop) => {
  return (
    <div className="docs">
      Upload docs
      <input className="doc-input" type="file" max="100kb"></input>
    </div>
  );
};

const Approval = ({ option, handleOptionChange }) => {
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
    //id and name or any single inputs 
  const [info, setinfo] = React.useState({
    id: "",
    name: ""
  });

  //control flow 
  const [approvalElementArr, setApprovalElementArr] = React.useState([]);
  //all the uploaded docs
  const [docs, setDocsArr] = React.useState([]);

  //
  const [controlFlow, setControlFlow] = React.useState([]);

  const addControlFlow = () => {
    setApprovalElementArr([
      ...approvalElementArr,
      <Approval
        option={info.higherupOption}
        handleOptionChange={(event) => {
          setinfo({ ...info, higherupOption: event.target.value });
        }}
      />,
    ]);
  };

  const handleDocs = () => {
    setDocsArr([...docs, <Docs />]);
  };

  const handleInfo = (event) => {
    setinfo((previnfo) => ({
      ...previnfo,
      [event.target.className]: event.target.value,
    }));
  };

  const handleDeleteBtn = (index) => {
    setApprovalElementArr((prevArr) => {
      return prevArr.filter((_, i) => i !== index);
    });
  };

  const handleDeleteBtnOfDocs = (index) => {
    setDocsArr((prevDocs) => {
      return prevDocs.filter((_, i) => i !== index);
    });
  };

  const handleCreateAppln = async (event) => {
    const applnObj = {
      id: info.id,
      name: info.name,
      controlFlow: approvalElementArr.map((ele, index) => ({
        higherup: info.higherupOption,
      })),
    };

    console.log(applnObj);
  };

  return (
    <div className="create-application-form">
      <label htmlFor="id">ID</label>
      <input
        className="id"
        type="number"
        onChange={handleInfo}
        value={info.id}
        required
      ></input>
      <label htmlFor="name">Name</label>
      <input
        className="name"
        type="text"
        onChange={handleInfo}
        value={info.name}
        required
      ></input>
      {
        approvalElementArr.map((ele, index) => {
          return (
            <div key={index}>
              <p>{index + 1}</p>
              {ele}
              <button onClick={() => handleDeleteBtn(index)}>Delete</button>
              <br />
            </div>
          );
        })
      }
      <button className="add-control-flow" onClick={addControlFlow}>
        Add HigherUP
      </button>
      {docs.map((ele, index) => (
        <div key={index}>
          <p>{index + 1}</p>
          {ele}
          <button onClick={() => handleDeleteBtnOfDocs(index)}>Delete</button>
        </div>
      ))}
      <button className="add-docs" onClick={handleDocs}>
        Add Docs
      </button>
      <br />
      <button className="create-button" onClick={handleCreateAppln}>
        Create Application
      </button>
    </div>
  );
};

export default Create;

import { useState } from "react";
import { updateCandidate, deleteCandidate } from "../store/candidates";
import { useDispatch } from "react-redux";
const CandidateItem = ({ candidate }) => {
  const [readMode, setReadMode] = useState(true);
  const [formData, setFormData] = useState(candidate);
  const dispatch = useDispatch();
  const editCandidate = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setReadMode(false);
  };
  const removeCandidate = (event) => {
    event.preventDefault();
    event.stopPropagation();

    dispatch(deleteCandidate(candidate));
  };
  const submitCandidate = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(updateCandidate(formData));
    setReadMode(true);
  };
  const updateName = (event) => {
    
    event.preventDefault();
    event.stopPropagation();
    setFormData((prevFormData)=>{
        return {
            ...prevFormData,
            name: event.target.value
        };
    });
  };
  const updateEmail = (event) => {
    
    event.preventDefault();
    event.stopPropagation();
    setFormData((prevFormData)=>{
        return {
            ...prevFormData,
            email: event.target.value
        };
    });
  };
  const updateSkills = (event) => {
    
    event.preventDefault();
    event.stopPropagation();
    setFormData((prevFormData)=>{
        return {
            ...prevFormData,
            skills: event.target.value.split(",")
        };
    });
  };
  return (
    <li className="candidate-item">
      {readMode && (
        <>
          <p>{candidate.name}</p>
          <p>{candidate.skills?.join()}</p>
          <p>{candidate.email}</p>
          <button className="btn" onClick={editCandidate}>Update</button> 
          <button className="btn" onClick={removeCandidate}>Delete</button>
        </>
      )}
      {!readMode && (
        <form onSubmit={submitCandidate}>
          <input type="text" name="name" defaultValue={formData.name} onChange={updateName}/>
          <input type="text" name="skills" defaultValue={formData.skills.join()} onChange={updateSkills}/>
          <input type="email" name="email" defaultValue={formData.email} onChange={updateEmail}/>
          <button type="submit">submit</button>
        </form>
      )}
    </li>
  );
};

export default CandidateItem;

import { useState } from "react";
import { useCandidates } from "../candidateContext";
import { useDispatch } from "react-redux";
import {addCandidate} from "../store/candidates";
import { useNavigate } from "react-router";

const initialState = {
    name: "",
    email: "",
    skill: "",
    skills: [],
  };

const CandidateRegistration = () => {
  const [formData, setFormData] = useState(initialState);

  const navigate = useNavigate();

  const dispatch  = useDispatch();

//   const {addCandidate} = useCandidates();

  const submitCandidate = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // addCandidate(formData);
    dispatch(addCandidate(formData));
    setFormData(initialState);
    navigate('/candidate/list');
  };

  const updateName = (event) => {
    setFormData((prevForm) => {
      return {
        ...prevForm,
        name: event.target.value,
      };
    });
  };

  const updateEmail = (event) => {
    setFormData((prevForm) => {
      return {
        ...prevForm,
        email: event.target.value,
      };
    });
  };

  const updateSkill = (event) => {
    setFormData((prevForm) => {
      return {
        ...prevForm,
        skill: event.target.value,
      };
    });
  };

  const addSkill = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setFormData((prevForm) => {
      return {
        ...prevForm,
        skills: [formData.skill, ...prevForm.skills ],
        skill: "",
      };
    });
  };

  return (
    <>
      <form className="candidateForm" onSubmit={submitCandidate}>
        <div className="field-container">
          <label>Name</label>
          <input
            type="text"
            name="name"
            onChange={updateName}
            defaultValue={formData.name}
          />
        </div>
        <div className="field-container">
          <label>E-mail</label>
          <input
            type="text"
            name="email"
            onChange={updateEmail}
            defaultValue={formData.email}
          />
        </div>
        <div className="field-container">
          <label>skill</label>
          <span className="mutliple-fields">
            <input
              type="text"
              name="skill"
              onChange={updateSkill}
              defaultValue={formData.skill}
            />
            <button onClick={addSkill}>Add Skill</button>
          </span>
        </div>
        <div className="field-container">
          <label>skills</label>
          <input type="text" name="skills" defaultValue={formData.skills} />
        </div>
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </>
  );
};

export default CandidateRegistration;

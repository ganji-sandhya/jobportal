import { useCandidates } from "../candidateContext";
import _ from "lodash";
import "./candidate.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCandidates } from "../store/candidates";
import CandidateItem from "./CandidateItem";

const CandidateList = () => {
  //   const {candidates} = useCandidates();

  // const { candidates } = useSelector((state) => state.candidates);
  const candidates  = useSelector((state) => state.candidates);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCandidates);
  }, [candidates]);

  return (
    <ul className="candidate-list">
      {candidates.map((candidate) => (
        <CandidateItem candidate={candidate} key={candidate.id} />
      ))}
    </ul>
  );
};

export default CandidateList;

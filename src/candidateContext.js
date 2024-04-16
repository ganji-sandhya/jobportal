import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CandidatesContext = createContext();
export const CandidatesProvider = ({ children }) => {

  const [candidates, setCandidates] = useState([]);

  useEffect(()=>{
    const fetchCandidates = async () => {
        try {
            const response = await axios.get("http://localhost:3001/candidates");
            setCandidates(response.data);
        } catch(error) {
            throw new Error("error getting candidates from server", error)
        }
    };
    fetchCandidates();
  }, []);
  const addCandidate = async (candidate) => {

    try{
        const response = await axios.post("http://localhost:3001/candidates", candidate);
        setCandidates((prevCandidates) => {
            return [
                ...prevCandidates,
                response
            ];
        });
    } catch(error) {
        throw new Error("error getting candidates from server", error);
    }
  };

  return (
    <CandidatesContext.Provider value={{ candidates, addCandidate }}>
      {children}
    </CandidatesContext.Provider>
  );
};

export const useCandidates = () => {
  const context = useContext(CandidatesContext);

  if (!context) {
    throw new Error("useCandidates must be used within a CandidatesProvider");
  }

  return context;
};

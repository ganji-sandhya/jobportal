import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import _ from "lodash";

const candidateLocalSlice = createSlice({
  name: "candidates",
  initialState: [],
  reducers: {
    fetchCandidates(state) {
      return state;
    },

    addCandidate(state, action) {
      state.push({ id: _.uniqueId(), ...action.payload });
    },

    updateCandidate(state, action) {
      let candidateIndex = state.findIndex(
        (candidate) => candidate.id === action.payload.id
      );
      state[candidateIndex] = action.payload;
    },

    deleteCandidate(state, action) {
        let candidateIndex = state.findIndex(candidate => candidate.id === action.payload.id);
        if(candidateIndex !== -1 ) {
            state.splice(candidateIndex, 1);
        }
    },
  },
});

const candidateSlice = createSlice({
  initialState: {
    candidates: [],
    isLoading: false,
    error: null,
  },
  name: "candidates",
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidates.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCandidates.fulfilled, (state, action) => {
        state.candidates = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addCandidate.fulfilled, (state, action) => {
        state.candidates.push(action.payload);
      })
      .addCase(updateCandidate.fulfilled, (state, action) => {
        const updatedCandidate = action.payload;
        const index = state.candidates.findIndex(
          (candidate) => candidate.id === updatedCandidate.id
        );

        if (index !== -1) {
          state.candidates[index] = updatedCandidate;
        }
      })
      .addCase(deleteCandidate.fulfilled, (state, action) => {
        const index = state.candidates.findIndex(
          (candidate) => candidate.id === action.meta.arg.id
        );
        if (index !== -1) {
          state.candidates.splice(index, 1);
        }
      });
  },
});
export const fetchCandidates = createAsyncThunk(
  "candidates/fetchCandidates",
  async () => {
    try {
      const response = await axios.get("http://localhost:3001/candidates");
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// export const addCandidate = createAsyncThunk('candidates/addCandidate', async (candidate)=> {
//     try {
//         const response = await axios.post("http://localhost:3001/candidates", candidate);
//         return response.data;
//     } catch(error) {
//         throw error.response.data;
//     }
// });

// export const updateCandidate = createAsyncThunk('candidates/updateCandidate', async (candidate)=> {
//     try {
//         const response = await axios.put("http://localhost:3001/candidates/"+candidate.id, candidate);
//         return response.data;
//     } catch(error) {
//         throw error.response.data;
//     }
// });

// export const deleteCandidate = createAsyncThunk('candidates/deleteCandidate', async (candidate)=> {
//     try {
//         const response = await axios.delete("http://localhost:3001/candidates/"+candidate.id, candidate);
//         return response.data;
//     } catch(error) {
//         throw error.response.data;
//     }
// });

export const { addCandidate, deleteCandidate, updateCandidate } =
  candidateLocalSlice.actions;
const store = configureStore({
  reducer: { candidates: candidateLocalSlice.reducer },
});

// store.dispatch(fetchCandidates());
export default store;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    myMoocs: "",
    moocsList: '',
};

const moocsSlice = createSlice({
    name:"moocs",
    initialState,
    reducers: {
        myMoocs: (state,action: PayloadAction<{myMoocs:string}>) => {
            state.myMoocs = action.payload.myMoocs;
        },
        moocsList: (state,action: PayloadAction<{moocsList:string}>) => {
            state.moocsList = action.payload.moocsList;
        },
    },
});

export const { myMoocs,moocsList } = moocsSlice.actions;

export default moocsSlice.reducer;
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    myMoocs: "",
};

const moocsSlice = createSlice({
    name:"moocs",
    initialState,
    reducers: {
        myMoocs: (state,action: PayloadAction<{myMoocs:string}>) => {
            state.myMoocs = action.payload.myMoocs;
        },
    },
});

export const { myMoocs } = moocsSlice.actions;

export default moocsSlice.reducer;
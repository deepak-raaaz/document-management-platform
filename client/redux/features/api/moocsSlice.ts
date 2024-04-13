import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    myMoocs: "",
    totalCreditPoints: 0,
    moocsCourseList: [],
};

const moocsSlice = createSlice({
    name:"moocs",
    initialState,
    reducers: {
        myMoocs: (state,action: PayloadAction<{myMoocs:string,totalCreditPoints:number}>) => {
            state.myMoocs = action.payload.myMoocs;
            state.totalCreditPoints = action.payload.totalCreditPoints;
        },
    },
});

export const { myMoocs } = moocsSlice.actions;

export default moocsSlice.reducer;
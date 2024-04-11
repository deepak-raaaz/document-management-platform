import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    myMoocs: "",
    moocsCourseList: [],
};

const moocsSlice = createSlice({
    name:"moocs",
    initialState,
    reducers: {
        myMoocs: (state,action: PayloadAction<{myMoocs:string}>) => {
            state.myMoocs = action.payload.myMoocs;
        },
        // moocsList: (state,action: PayloadAction<{moocsCourseList:Array<string>}>) => {
        //     state.moocsCourseList = action.payload.moocsCourseList;
        // },
    },
});

export const { myMoocs } = moocsSlice.actions;

export default moocsSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const requestsSlice=createSlice({
    name:"requests",
    initialState:null,
    reducers:{
        addRequests:(state,action)=>{
            return action.payload
        },
        removeRequest:()=>{
            return null
        }
    }
})
export const {addRequests,removeRequest}=requestsSlice.actions
export default requestsSlice.reducer
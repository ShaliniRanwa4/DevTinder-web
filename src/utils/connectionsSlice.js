import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice=createSlice({
    name:"connections",
    initialState:null,
    reducers:{
        addConnections:(state,action)=>{
            return action.payload
        },
        removeConnections:()=>{
            return null
        }
    }
})
export const {addConnections}=connectionsSlice.actions;
export default connectionsSlice.reducer
import {createSlice } from "@reduxjs/toolkit";
 

const savedToDoList = localStorage.getItem("toDoList");
const initialState ={
    toDoList : savedToDoList ? JSON.parse(savedToDoList) : [],
}

const toDoSlice = createSlice({
    name : 'toDoSlice',
    initialState,
    reducers :{

    }

})

export const {} = toDoSlice.actions

export default toDoSlice.reducer;
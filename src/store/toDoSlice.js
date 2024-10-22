import {createSlice } from "@reduxjs/toolkit";
 

const savedToDoList = localStorage.getItem("toDoList");
const initialState ={
    toDo : {
        id: 0,
        text : '',
        done : false
    },
    toDoList : savedToDoList ? JSON.parse(savedToDoList) : [],
    isEditing : false,
    editId : null
}

const toDoSlice = createSlice({
    name : 'toDoSlice',
    initialState,
    reducers :{
        setToDo : (state, actions)=>{
            const getToDo = { ...toDo, text: e.target.value }
            state.toDo = {...getToDo, id : id++}
        },
        addToDo : (state, actions)=>{
            if (actions.payload.text.trim() === "") return;
            if (isEditing) {
                savedToDoList((prevList) =>
                  prevList.map((item) =>
                    item.id === editId ? { ...item, text: toDo.text } : item
                  )
                );
                state.isEditing = false,
                state.editId =  true
            }
        },

        removeToDo : (state, actions)=>{

        },
        editToDo : (state, actions)=>{{

        }},
        makrDone : (state, actions)=>{

        }
    }

})

export const {addToDo, removeToDo, editToDo, makrDone,setToDo} = toDoSlice.actions

export default toDoSlice.reducer;
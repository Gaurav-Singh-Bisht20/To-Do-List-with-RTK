import { createSlice } from "@reduxjs/toolkit";

const savedToDoList = localStorage.getItem("toDoList");
const initialState = {
  toDo: {
    id: 0,
    text: "",
    done: false,
  },
  toDoList: savedToDoList ? JSON.parse(savedToDoList) : [],
  isEditing: false,
  editId: null,
};

const toDoSlice = createSlice({
  name: "toDoSlice",
  initialState,
  reducers: {
    setToDo: (state, action) => {
      const getToDo = { ...state.toDo, text: action.payload };
      state.toDo = { ...getToDo, id: state.id++ };
    },
    addToDo: (state) => {
      if (state.toDo.text.trim() === "") return;
      if (state.isEditing) {
        state.toDoList = state.toDoList.map((item) =>
          item.id === state.editId ? { ...item, text: state.toDo.text } : item
        );
      } else {
        state.toDoList.push({ ...state.toDo, id: state.toDo.id++ });
      }
      state.toDo = { id: 0, text: "", done: false };
      localStorage.setItem("toDoList", JSON.stringify(state.toDoList));
    },

    removeToDo: (state, action) => {
      state.toDoList = state.toDoList.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("toDoList", JSON.stringify(state.toDoList));
    },

    editToDo: (state, action) => {
      let editToDo = state.toDoList.find((item) => item.id === action.payload);
      state.toDo = { ...editToDo };
      state.editToDo = true;
      state.editId = action.payload;
    },
    makrDone: (state, action) => {
      state.toDoList = state.toDoList.map((item) =>
        item.id === action.payload ? { ...item, done: true } : item
      );
      localStorage.setItem("toDoList", JSON.stringify(state.toDoList));
    },
  },
});

export const { addToDo, removeToDo, editToDo, makrDone, setToDo } =
  toDoSlice.actions;

export default toDoSlice.reducer;

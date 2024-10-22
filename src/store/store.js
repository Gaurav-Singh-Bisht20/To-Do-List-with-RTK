import { configureStore } from "@reduxjs/toolkit"
import toDoSliceReducer from './toDoSlice'

const store = configureStore({
    reducer :{
        toDoSlice : toDoSliceReducer
    }
})

export default store;
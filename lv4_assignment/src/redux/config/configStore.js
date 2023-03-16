import { configureStore } from "@reduxjs/toolkit";
import { createStore } from "redux";
import { combineReducers } from "redux";
import logs from "../modules/logs.js";

//  일반 리듀셔
// const rootReducer = combineReducers({
//     logs,
// });
// const store = createStore(rootReducer);


//  Redux Toolkit
const store = configureStore({
    reducer: {
        logs
    }
});

export default store;
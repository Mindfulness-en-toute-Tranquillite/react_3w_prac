//  Action value
// const ADD_LIST = "ADD_LIST"

//  Action Creator
// export const addList = (payload) => {
//     return {
//         type: ADD_LIST,
//         payload,
//     };
// };

//  Reducer
// const logs = (state = initialState, action) => {
//     switch (action.type) {
//         case ADD_LIST:
//             return {
//                 ...state,
//                 logs: [...state.logs, action.payload],
//             };
//         default:
//             return state;
//     }
// }

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const __addList = createAsyncThunk(
    "ADD_LIST_WAIT",
    (payload, thunkAPI) => {
        setTimeout(() => {
            thunkAPI.dispatch(addList(payload))
        }, 1);
    }
);

export const __removeList = createAsyncThunk(
    "REMOVE_LIST_WAIT",
    (payload, thunkAPI) => {
        setTimeout(() => {
            thunkAPI.dispatch(removeList(payload))
        }, 1);
    }
);


//  Initial state
const initialState = [
    {
        id: 0,
        title: "",
        content: "",
    },
];

const logsSlice = createSlice({
    name: 'logs',
    initialState: initialState,
    reducers: {
        addList: (state, action) => {
            return [...state, action.payload];
            
        },
        removeList: (state, action) => {
            return state.filter((item) => item.id !== action.payload);
        }
    },
    

});

export default logsSlice.reducer;
export const { addList, removeList } = logsSlice.actions;
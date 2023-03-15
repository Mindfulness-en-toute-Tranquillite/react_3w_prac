import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    todos: [],
    isLoading: false,
    isError: false,
    error: null,
};

// (1) 비동기 함수를 호출하기 위해서 불러야 하는 함수
export const __getTodos = createAsyncThunk(
    "getTodos",
    async (payload, thunkAPI) => {
        try {
            const response = await axios.get('http://localhost:4000/todos');
            console.log('response', response);
        //위에 response까지는 서버에서 데이터를 받아 왔다. 이제 받아온 데이터를 store보내기.
        // (2) toolkit에서 제공하는 API 
        // promise -> resolve(=네트워크 요청이 성공한 경우) -> dispatch해주는 기능(이 기능 끝나고 reduce로 보내주는)을 가진 API.
            return thunkAPI.fulfillWithValue(response.data);

        } catch (error) {
            console.log('error', error)

        // (2) toolkit에서 제공하는 API 
        // promise -> fail(=네트워크 요청이 실패한 경우) -> dispatch해주는 기능
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {},
    extraReducers: {
        [__getTodos.pending]: (state, action) => {
            // 아직 진행중일 때
            state.isLoading = true;
            state.isError = false;
        },
        [__getTodos.fulfilled]: (state, action) => {
            console.log("fulfilled : ", action);
            state.isLoading = false;
            state.isError = false;
            state.todos = action.payload;
        }, 
        [__getTodos.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;
        },
    },
});

export const {} = todosSlice.actions;
export default todosSlice.reducer;
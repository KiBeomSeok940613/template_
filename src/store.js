import { configureStore, createSlice } from "@reduxjs/toolkit";

// 더 만드려면  let createslice 를 추가로 만들어야함
let user =createSlice({
        name: "user",
        initialState : "기범석",
        reducers : {     
            changeName() {
                return "기기범범석석"
            }
            // 이름을 바꾸고싶을때 사용
        }
        
        // state 기본값

})
let user2 = createSlice ({
    name:"pizza",
    initialState : "파인애플피자",
    reducers : {}
})

let dark = createSlice({
    name: "dark",
    initialState: "light",
    reducers : {
        toggleTheme : (state) => state === "light" ? "dark" : "light"
    }
})

export const {changeName} = user.actions;
// 바꾸고 싶은 이름
export const {toggleTheme} = dark.actions;

export default configureStore({
    reducer : {
        // 보낼 이름
        user : user.reducer,
        user2 : user2.reducer,
        dark : dark.reducer,

        
    }
})

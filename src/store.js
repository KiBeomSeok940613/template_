import { configureStore, createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

// 더 만드려면  let createslice 를 추가로 만들어야함
// 
let user =createSlice({
        name: "user",
        initialState :{
             loggedIn : false,
             data : null,
             uid : null           
        },
        reducers : {     
            logIn: (state, action) => {
                state.loggedIn = true;
                state.uid = action.payload;

            },
            loggedIn: (state, action) =>{
                state.loggedIn = true;
                state.data = action.payload;

            },
            logOut : (state) => {
                state.loggedIn = false;
                state.data = null;
                state.uid = null;
            },
           
        }
        // 
        // true 값은 유지해준다
        // payload 안에 정보가 모두 들어감
        // 데이터를 넘기는코드는 action
        
        // state 기본값
         // 이름을 바꾸고싶을때 사용

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

export const {logIn, logOut, loggedIn} = user.actions;
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

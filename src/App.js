import { Route, Routes } from "react-router-dom";
import Globalstyle from "./components/Globalstyle";
 import Main from "./pages/Main";
import Aside from "./components/Aside";
import { ThemeProvider } from "styled-components";
import { useState } from "react";
import Nav from "./components/Nav";
import store from "./store";
import { Provider, useSelector } from "react-redux";
import Mnav from "./components/Mnav";
import Member from "./pages/Member";
import Login from "./pages/Login";
import Example from "./example/Example";
import Logout from "./pages/Logout";





function App() {
  

  
  
  return (
   <>
    <Provider store={store}>
      {/* 전역변수로 */}
      <Inner />
   </Provider>
    {/* Routes 밖에 쓰면 고정됨 */}

    </>
  );
}
function Inner(){
  const light = {
    colors: {
      Primary : "hotpink",
      Secondary : "oranged",
      BgColor: "#e8e8e8",
      Color : "#000",
      ContentBg: "#fff"
    }
  }
  const dark = {
    colors : {
      Primary : "#272929",
      Secondary: "#e9e9e9",
      BgColor: "#e3e3e3",
      Color : "#e9e9e9",
      ContentBg: "#272929"
  
  
    }
  }
  
  const theme = useSelector(state => state.dark)
  const DarkMode = theme === "light" ? light : dark;
  const userState = useSelector(state => state.user)
  console.log(userState)
  
  return(
  <ThemeProvider theme={DarkMode}>

        <Globalstyle />
          <Nav userState={userState} />
           <Aside />
             <Routes>
                  <Route path="/" element={<Main />}></Route>
                 {/* <Route path="/example" element={<Example />}></Route> */}
                 <Route path="/member" element={<Member />}></Route>
                 <Route path="/login" element={<Login />}></Route>
                 <Route path="/logout" element={<Logout />}></Route>

    
            {/* / 후 뒤에 주소가 붙으면 ...에 주소를 보여주세요 */}
             {/* 홈페이지 딱 열었을때 먼저 보여줄 페이지"/" " */}
            </Routes>
    </ThemeProvider>
  )
}

export default App;

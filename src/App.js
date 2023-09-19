import { Route, Routes } from "react-router-dom";
import Globalstyle from "./components/Globalstyle";
 import Main from "./pages/Main";
import Aside from "./components/Aside";
import { ThemeProvider } from "styled-components";

import Nav from "./components/Nav";
import store, { logIn, logOut, loggedIn } from "./store";
import { Provider, useDispatch, useSelector } from "react-redux";
import Mnav from "./components/Mnav";
import Member from "./pages/Member";
import Login from "./pages/Login";
import Example from "./example/Example";
import Logout from "./pages/Logout";
import { useEffect } from "react";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import Findemail from "./pages/Findemail";
import Modify from "./pages/Modify";




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


  const dispatch = useDispatch();
  const uid = sessionStorage.getItem("users");
  console.log(uid)
  useEffect(()=>{

    const fetchUser = async () => {
      if(!uid) return;
      

      const userDoc = doc(collection(getFirestore(), "users"), uid)
      console.log(userDoc)

      try{
// try 실패할 수도있다.
const docSnapShot = await getDoc(userDoc);
console.log(docSnapShot)

        // 만약 얘의 정보가 있더면 얘를 실행한다

        if(docSnapShot.exists()){
          const userData = docSnapShot.data();       
          dispatch(loggedIn(userData))
        }



        
      }catch(error){
        console.log(error)
      }
// 에러창 띄울땐 보통 이렇게 작업
    }
    fetchUser();
   

  }, [dispatch, uid])
  // 로딩되고 기능이 실행됨 [] 대괄호 안에  변수값을 입력하면 여러번 실행 됨 
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
                 <Route path="/modify" element={<Modify />}></Route>
                 <Route path="/findemail" element={<Findemail />}></Route>

    
            {/* / 후 뒤에 주소가 붙으면 ...에 주소를 보여주세요 */}
             {/* 홈페이지 딱 열었을때 먼저 보여줄 페이지"/" " */}
            </Routes>
    </ThemeProvider>
  )
}

export default App;

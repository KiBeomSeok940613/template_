
import React,{ useState } from 'react'
// useState funtion 밑에 // 정보를 받을때 useState
import styled from 'styled-components'
import { firebaseAuth, signInWithEmailAndPassword } from '../firebase'
import {NavLink, useNavigate} from 'react-router-dom'
import { FirebaseError } from 'firebase/app'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { collection, doc, getDoc, getFirestore } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { logIn, loggedIn } from '../store'
// collection, doc, getFirestore 유저정보를 스토리지에 저장하기위해 import 함




const Container =styled.div`
  height: calc(100vh - 86px);
  display: flex;
  background-color: #f5f5f5;
  justify-content: center;
  align-items: center;
  
`
const SignUp =styled.div`
  width: 35vw; padding: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  background-color: #fff;
  border-radius: 10px;
  @media screen and (max-width: 1024px) { width: 60vw; 
  }
  @media screen and (max-width: 640px) { width: 70vw; 
  }
`
const Title =styled.h1`
font-size: 24px; text-align: center; margin-bottom: 20px;

`
const Input =styled.input`
  width: 100%; padding: 10px; margin-bottom: 10px; 
  border: 1px solid #ddd; border-radius:  5px; 
  box-sizing: border-box;
  padding-left: 45px;
  transition: border color 0.4s;
  &:focus{
    border-color: #007bff;
    /* &:focus 클릭했을때 효과 */
    outline: none;
  }
  &::placeholder{opacity: 0;}

`
const InputWrapper = styled.div`
    position: relative;
    margin-bottom: 20px;
    &:last-child{
      margin-bottom: 0; margin-top: 20px;
      justify-content: flex-end;
      display: flex;
      column-gap: 20px;
      a{
        background-color: #40e0de;
        font-size: 14px;
        text-align: center; padding: 5px 20px;
        border-radius: 5px;
        color: #fff;
        &:last-child{
          background-color: #036;
        }
      }
    }
    /* 마지막 요소 */
  input:focus + label,
  input:not(:placeholder-shown )+ label{
    top: 4px;
    left: 4px;
    font-size: 8px;
    color: #007bff;
  }
`
const Label = styled.label`
      position: absolute;
      top: 10px; left: 10px;
      font-size: 14px; color: #999;
      transition: all 0.3s;
      pointer-events: none;
`

const Button =styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  background-color: #007bff;
  border: none;
  color: #fff; cursor: pointer;

`

 


function Login() {
  
  const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState('');
 const [eye, setEye] = useState(false) 
// const history = useHistory();
const navigate = useNavigate();
const dispatch = useDispatch();


const errorMsg = (errorCode) => {
  const firebaseError = {
    'auth/user-not-found' : "이메일 혹은 비밀번호가 잘못 되었습니다.",
    'auth/wrong-password' : "이메일 혹은 비밀번호가 잘못 되었습니다.",
    'auth/invalid-email' : "이메일 혹은 비밀번호가 잘못 되었습니다."

  }
    return firebaseError[errorCode] || "알 수 없는 에라가 발생했습니다."
}
// errorcode를 반환


// async 함수내 에서만 사용가능 function 앞에서 사용 가능 (무언갈 준비한다) try catch 문으로 사용 오류가 있을수도 있지만 실행해주시고 오류가 있으면 catch를 실행해 주세요

// await 뒤에있는 코드를 잠깐 기다리게 하는

const LoginForm = async (e) =>{
 e.preventDefault();



 try{
    const userLogin = await signInWithEmailAndPassword (firebaseAuth, email ,password);
    // console.log(userLogin)
     alert("로그인 되었습니다.")
    
    
    const user = userLogin.user;
     console.log(user)
    sessionStorage.setItem("users", user.uid)
    dispatch(logIn(user.uid))
   
    // logIn import 필수
    // 콘솔로그 찍어놔야 로그가뜸
    
    const userDoc = doc(collection(getFirestore(),"users"),user.uid)
    const userDocSnapshot =await getDoc(userDoc)
    // 국룰 Snapshot doc=document 줄임말 getDoc 도 import
    // console.log(userDocSnapshot.data())
    if(userDocSnapshot.exists()){
      const userData = userDocSnapshot.data();
      dispatch(loggedIn(userData));
      console.log(userData)
      navigate(-1);
      
    }
 }catch(error){
    setError(errorMsg(error.code));
    console.log(error.code)
 } 
}
  return (
    <>
    <Container>
     
      <SignUp>
        
        <Title>로그인</Title>
        {email} {password}
        <form onSubmit={LoginForm}>  
                {/* form 으로 데이터를 전송했을땐 그정보를 다 체크해줌  */}
                {/* form 과 온클릭의 차이는 패스워드 에선 엔터가 치면 먹히거나 안먹히거나 차이 */}
                {/* 로그인을 하면 실정보가 나오는데  */}
          <InputWrapper>
            <Input type='email' className='email' placeholder='이메일' onChange={(e)=>{
              setEmail(e.target.value)
            }} required />
            <Label htmlFor='이메일'>이메일</Label>
          </InputWrapper>
          <InputWrapper>
           <Input type='password' className='password' placeholder='비밀번호' onChange={(e)=>{
            setPassword(e.target.value)
           }} required/>
           <Label>패스워드</Label>
          </InputWrapper>
          <Button>로그인</Button>
        </form>
           <InputWrapper>
            <NavLink to='/findemail'>이메일/비밀번호 재설정</NavLink>
            <NavLink to='/member'>회원가입</NavLink>
           </InputWrapper>
       
      </SignUp>
    </Container>
    
    </>
  )
}

export default Login
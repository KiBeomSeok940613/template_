
import React,{ useState } from 'react'
// useState funtion 밑에 // 정보를 받을때 useState
import styled from 'styled-components'
import { firebaseAuth, signInWithEmailAndPassword } from '../firebase'
import {useNavigate} from 'react-router-dom'
import { FirebaseError } from 'firebase/app'


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
// const history = useHistory();
const navigate = useNavigate()

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
    const user = userLogin.user;
    console.log(user)
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
        <p>{error}</p>
      </SignUp>
    </Container>
    
    </>
  )
}

export default Login
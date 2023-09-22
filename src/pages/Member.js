import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { createUserWithEmailAndPassword, firebaseAuth, signInWithEmailAndPassword } from '../firebase'
import{doc, setDoc, getFirestore, getDoc, updateDoc} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import Modal from '../components/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { logIn, loggedIn } from '../store'
import Modify from './Modify'
import { onAuthStateChanged } from 'firebase/auth'



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
const Password = styled.div`
  position: relative;
  width: 100%;
  svg{
    position: absolute;
    right: 10px;
    top: 12.5px;
    cursor: pointer;
  }
`



const Title =styled.h1`
font-size: 24px; text-align: center; margin-bottom: 20px;

`

const Input =styled.input`
  width: 100%; padding: 10px; margin-bottom: 10px; 
  border: 1px solid #ddd; border-radius:  5px; 
  box-sizing: border-box;
  

`
const Button =styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  background-color: #007bff;
  border: none;
  color: #fff; cursor: pointer;

`


function Member() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [eye, setEye] = useState([0,0]);
  const [isModal, setIsModal] = useState(false);
  // 0번은 false 1번은 true
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userUid, setUserUid] = useState("");

  const initialMode = window.location.pathname.includes ("member");
  useEffect(()=>{
    if(!initialMode){
      firebaseAuth.onAuthStateChanged((user) =>{
        if(user){
          setUserUid(user.uid);
        }
        

      })

    }

  }, [initialMode])
  useEffect(()=>{
    if(!initialMode && userUid){
      const fetchUserData = async () => {
        const userRef = doc (getFirestore(), "users", userUid);
        const userSnap = await getDoc (userRef);
       if(userSnap.exists()){
        const data = userSnap.data();
        setName(data.name);
        setNickname(data.nickname);
        setPhoneNumber(data.phoneNumber);
        setEmail(data.email)
       }
      }
      fetchUserData();
      
    }

    
  },[initialMode, userUid])
  
  
  
  const toggleEye = (index) =>{
    const newEye = [...eye];
    // 원래있던 eye 의 배열값을 복사해 배열을 벗긴다.
    // [[0,0]] > [] 없에는게 ... 표현 > 다시말해서 같은ㄱ밧이 복사가 된다.
    newEye[index] = !newEye[index];
    // eye 를 첫번째를 클릭 했다면 newEye[0] = 부정 즉 false > true 로 변경된다. [1,0]
    setEye(newEye)
    //  그리고 그 값을 쓰기 전용인 setEye에 새로운 배열값을 저장한다.
  }

  
  const PhoneNumber = (e) =>{
    
    let value = e.target.value;
    
    e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/-{1,2}$/g, "");

    
    setPhoneNumber(value)
  }
  const errorMsg = (errorCode) =>{
    const firebaseError = { 
      'auth/admin-restricted-operation' :  "빈 데이터가 있다.",
      'auth/email-already-in-use' : "이미 사용중인 이메일 주소.",
      'auth/invlid-email' : "유효하지 않은 이메일 주소.",
      'auth/operation-not-allowed' : "이메일/비밀번호 계정이 비활성화 되어 있습니다.",
      'auth/weak-password' : "너무 짧은 비밀번호를 사용하였습니다(6자리).",
    }
    return firebaseError[errorCode] || "알 수없는 에러가 발생하셨습니다."
  }
  const isValidPhone = (phone) =>{
    const regex = /^01[0-9]-[0-9]{3,4}-[0-9]{4}$/
     //[]안은 사용 가능한 숫자 범위 / {}중괄호 안은 자릿 수

      return regex.test(phone)
    
    // 정규식 검사 (true , false 값 검사)
    // test() : 문자열에 일치하는 부분이 있는지 확인하고, true 혹은 false를 return
  }
  
  const isValidEmail = (email) => {
    const regex = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
      return regex.test(email)
  }
    const signUp = async (e) =>{
      e.preventDefault();

      let errorMessage = '';

      if(name.length === 0){
        errorMessage = "이름"
      }else if(nickname.length === 0){
        errorMessage = "닉네임";
      }else if(!isValidPhone(phoneNumber)){
        setError("유효한 전화번호를 입력해주세요");
        setIsModal(!isModal)
        return;
      }else if(!isValidEmail(email)){
        setError("유효한 이메일 주소를 입력해주세요");
        setIsModal(!isModal)
        return;
      }else if(password.length === 0 && initialMode){
        errorMessage("비밀번호")
      }else if(passwordConfirm.length === 0 && initialMode){
        errorMessage = "비밀번호 확인";
      }else if(password !== passwordConfirm && initialMode){
        setError("비밀번호가 일치하지 않습니다.")
        setIsModal(!isModal)
        return;
      }
      if(errorMessage){
        setError(errorMessage + "이(가) 비어있습니다.")
        setIsModal(!isModal)
        return;
      }
      
      
      try{
      

        const userProfile = {
          name,
          nickname,
          phoneNumber,
          email
        }
       
        
       if(initialMode){
        const {user} = await  createUserWithEmailAndPassword
        (firebaseAuth, email, password);
        await setDoc(doc(getFirestore(), "users", user.uid), userProfile)
        // uid 고유번호 (주민번호 같은 느낌)    
      
        sessionStorage.setItem("users", user.uid)
        dispatch(logIn(user.uid));
        
        alert("회원가입이 완료 되었습니다.");
       }else{
        if(userUid){
          const userRef = doc(getFirestore(), "users", userUid);
          await updateDoc(userRef, userProfile);
          alert("정보 수정이 완료 되었습니다.")
        }else{
          setError("회원 정보가 없습니다.")
          setIsModal(!isModal)
          return;
        }
       }
        navigate('/');
      
      
         // 여기서 정보를 저장해둠 
      }catch(error){
        setError(errorMsg(error.code))
        setIsModal(!isModal)
       
      }
      
    
  }
  const userState = useSelector(state => state.user)
    console.log(userState.loggedIn)

  return (
     <>
     {
      isModal &&
      <Modal error={error} onClose={()=>[setIsModal(false)]} />
     }
    {
      userState.loggedIn && initialMode ? <Modal error="이미 로그인 중입니다." onClose={()=>{navigate('/modify')}}/> : 
      // 앞에 ! 를 붙히면 false
    <Container>
      <SignUp>
       
        <Title>회원가입</Title>
        
        <Input  defaultValue={name} onChange={(e) => {setName(e.target.value)}}type='text' className='name' placeholder='이름'/>
        <Input defaultValue={nickname} onChange={(e) => {setNickname(e.target.value)}} type='text' className='nickname' placeholder='닉네임'/>
        <Input defaultValue={phoneNumber} onInput={PhoneNumber} maxLength={13}  type='text' className='phone' placeholder='전화번호'/>
        <Input defaultValue={email} type='email' className='email' onChange={(e)=>{
          setEmail(e.target.value)}} placeholder='이메일'/>
        {
          initialMode && 
          <>
          <Password>
            <Input defaultValue={password} onChange={(e) => {setPassword(e.target.value)}} type={eye[0] ? "text" : "password"} className='password' placeholder='비밀번호'/>
            <FontAwesomeIcon icon={eye[0] ? faEye : faEyeSlash} onClick={()=>{
              toggleEye(0)
            }}/>
        </Password>
        <Password>
                <Input type={eye[1] ? "text" : "password"}  onChange={(e)=>{setPasswordConfirm(e.target.value)}} className='confirm_password' placeholder='비밀번호 확인' />
                <FontAwesomeIcon icon={eye[1] ? faEye : faEyeSlash} onClick={()=> toggleEye(1)}/>
        </Password> 
          </>
        }
        <Button onClick={signUp}>가입</Button>
    
      </SignUp>

    </Container>
      } 
    </>
  )
}

export default Member
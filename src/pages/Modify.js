import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { loggedIn } from '../store'
import Modal from '../components/Modal'
import { useNavigate } from 'react-router-dom'



function Modify() {
  const navigate = useNavigate();

  const userState = useSelector(state => state.user)
  
  console.log(userState.loggedIn)
  return (


   <>
    {
      userState.loggedIn ?  <p>수정해야징</p> :
      <Modal error="로그인 후 이용해 주세요." onClose={()=>{navigate('/login')}}/>
    }
   </>
  )
}

export default Modify
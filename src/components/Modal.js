import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import styled from 'styled-components';
import Member from '../pages/Member';
import Login from '../pages/Login';
import Logout from '../pages/Logout';



const ModalBackground = styled.div`
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background-color: rgba(0,0,0,0.7);
  z-index: 9999;
  display: flex; align-items: center; justify-content: center;

`
const ModalContent = styled.div`
  flex-basis: 360px;
  background-color: #fff;
  padding: 60px 20px 40px;
  border-radius: 8px;
  display: flex; justify-content: center;
  flex-wrap: wrap;
  >svg{
    flex-basis: 100%;
    font-size: 80px;
    color: hotpink;
  }
  >p{
    font-size: 16px; font-weight: bold; margin: 24px 0;
  }
`
const Button =styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  background-color: #007bff;
  border: none;
  color: #fff; cursor: pointer;

`

function Modal({error, onClose, Logout}) {
    
   

  return (
    <>
     {
      // isModal 이 true 일때만 이 값을 보여주세요 &&
        //  isModal && 
      <ModalBackground>
      <ModalContent>
          <FontAwesomeIcon icon={faTriangleExclamation} />
          <p>{error}</p>
          <Button onClick={onClose}>확인</Button>
      </ModalContent>
    </ModalBackground>
    }
    {/* 컴포넌트를 분리해서  관리하면 편함 html 속성 처럼 넘기면 됨 */}
    </>
  )
}

export default Modal
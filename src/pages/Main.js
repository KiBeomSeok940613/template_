import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeName, toggleTheme } from '../store'
import Aside from '../components/Aside'
import { ThemeProvider } from 'styled-components'



function Main() {

  // state 를 사용하면 다 들고 오기 때문에 경고창이 뜸 내가 가지고 와야하는것을 입력
  
  // dispatch () 사용법
  return (
    <>
        <p>여기가 메인이다</p>
        <p></p>

        
           
        
        
  
    </>
  )
}

export default Main
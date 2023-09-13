import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeName, toggleTheme } from '../store'
import Aside from '../components/Aside'
import { ThemeProvider } from 'styled-components'



function Main() {

 
  const a = useSelector(state => state.user)
  const b = useSelector(state => state.user2)
  const modeChange = useSelector(state => state.dark)
  // state 를 사용하면 다 들고 오기 때문에 경고창이 뜸 내가 가지고 와야하는것을 입력
  const dispatch = useDispatch()
  // dispatch () 사용법
  return (
    <>
        <p>{a}</p>
        <p>{b}</p>

        <button onClick={()=>{dispatch(changeName())}}>변경</button>
        
        
        <Aside onClick={()=>{dispatch(toggleTheme())}}>{modeChange}</Aside>
        
             
           
        
        
  
    </>
  )
}

export default Main
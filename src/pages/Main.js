import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeName, toggleTheme } from '../store'
import Aside from '../components/Aside'
import { ThemeProvider } from 'styled-components'
import Product from './Product'
import Banner from '../components/home/Banner'



const Test = ()=>{
  return (
    console.log("계속 실행됨")
    // 페이지가 넘어갈때 실행됨.
    // 마운트는 로딩이 끝나고 난뒤!  언마운트는 페이지가 넘어가는 순간!
  )
}


function Main() { 
  const result = useMemo(()=>{
    return Test()
  }, [])
  // useEffect와 useMemo의 차이 마운트 됬을때 땡겨오는거 유즈 메모는 마운트 되기전에 땡겨오는거다.
 
  useEffect(()=>{
    console.log("완료")
    // 다른 페이지로 이동 될때

    return () => {
      console.log("완료가 실행되기전 실행됨")
    // 컴포넌트가 새로 고침 될때
    // 제거 -> 다시 실행 버그 방지로 사용 리턴문 > 다시 위로

    }

  }, [])

  
 
  // 
  // return 문법 () => {} 언제 사용하냐 언마운트 될때 실행되는데 리턴 문법
  // 대괄호는 마운트 되었을때 한번만 실행 하고 싶을때 쓰는 문법 빈배열로 대괄호를 주면 업데이트가 제거 된다.

  let [count, setCount] = useState(0)
  // useEffect (())=>{} 기본 문법이다. 마운트가 되었을때 실행 되고 업데이트 (재렌더링이 되면 ) 다시 실행된다
  // state 를 사용하면 다 들고 오기 때문에 경고창이 뜸 내가 가지고 와야하는것을 입력
  
  // dispatch () 사용법
  return (
    <>
     <Banner/>

           
        
        
  
    </>
  )
}

export default Main
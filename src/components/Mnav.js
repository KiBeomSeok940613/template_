import React, { useState } from 'react'
import styled from 'styled-components'

const Hamburger = styled.div `
    position: fixed; right: 16px; top: 24px; transition: all 1s; 
    z-index: 50; cursor: pointer;
    > div{
        width: 30px; height: 2px; background-color: #000;
        border-radius: 4px; margin: 6px; transition: all 1s;
    &.on div:nth-child(1){transform:rotate(45deg) translateY(12px);}
    &.on div:nth-child(2){opacity:0 ; transform: translateX(-30px) rotate(720deg);}
    &.on div:nth-child(3){transform: rotate(-45deg) translateY(-12px);}
    @media screen and (min-width: 1024px){display: none;}
    @media screen and (max-width: 768px){right: 24px;}
    
    }
    
`
function Mnav() {
    // 햄버거박스를 클릭했을때 false 값이 바뀌어야함 
    const [isActive, setIsActive] = useState(false);
  return (
    <>  
          
          <Hamburger className={isActive === true && "on"} onClick={()=>{setIsActive(!isActive)}}> 
        {
            // 배열을 3개를 만드는것 아무런 데이터가 없을때 반복문을 돌릴때 사용
            Array(3).fill().map((_,i)=>{
                // e에 데이터가 없을때 _로 사용
                return(
                    <div key={i}></div>
                  
                )
            })
        }

    </Hamburger>

          
    </>
  )
}

export default Mnav
import React from 'react'
import styled from 'styled-components'
import AnimateNumber from 'animated-number-react';
import { useState } from 'react';
import { useEffect } from 'react';


const Container = styled.div`
    width: 100%;
    padding-bottom: 48px;
    text-align: center;
    color: #fff;
    background: url("https://via.placeholder.com/1920x450/053") fixed center center;
`
const ContaninerWrap = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    padding: 0 2%;
`

const ContentTitle = styled.div`
    width: 100%;
    margin-top: 3rem;
    text-align: center;
    margin-bottom: 1.5rem;
    position: relative;
    &::after{
        content: '';
        position: absolute;
        width: 2.5%;
        height: 2px;
        background-color: #111;
         left: 50%; bottom: 45%; transform: translate(-50%, -50%);
        /* left: 40.5%; top: 0; */
    }

`
const Title = styled.h3`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-transform: uppercase;
`
const Desc = styled.p`
    font-size: 0.875rem;
    color: #a0a0a0;
    
`
const ContentGrid = styled.div`
    flex-basis: 100%;
    padding: 48px 0;
    ul{
        display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
    li{
        flex-basis: 100%;
        text-align: center;
        @media screen and (min-width: 640px) {
            flex-basis: 50%;
        }
        @media screen and (min-width: 1024px) {
            flex-basis: 25%;
        }
        p:first-child{}
        p:last-child{}
        span{font-size: 60px; padding-top: 20px; display: block;}
    }
 
   
`
function Different() {

    const [isView, setIsView] = useState(false);
    useEffect(()=>{
        const scrollEvent = ()=>{
            const rect = document.querySelector("#content").getBoundingClientRect();
            console.log(rect);
            console.log(window.innerHeight)
            // 각자 보고 있는 화면에 따라 크기가 다르다.
            if (rect.top-200 <= window.innerHeight && rect.bottom >= 0){
               setIsView(true);
               console.log("dqpokdpoqkdpoqkdpoqk")
            }
        }
        window.addEventListener("scroll", scrollEvent)
        scrollEvent();

        return () => {
            window.removeEventListener("scroll", scrollEvent)
        }
        // 언마운트 될때 실행된다.

    }, [])
    const data = [
        {
            "title" : "설립일",
            "number" : "2017",
            "desc" : "Date of Foundation"
        },
        {
            "title" : "직원수",
            "number" : "456",
            "desc" : "Number Of Employees"
        },
        {
            "title" : "계약체결",
            "number" : "2431",
            "desc" : "Contract Conclusion"
        },
        {
            "title" : "견적문의",
            "number" : "5461",
            "desc" : "Request for a Quote"
        },
    ]

  return (
    <>
    <Container>
        <ContaninerWrap>
            
            <ContentTitle>
                
                <Title>Different</Title>
                <Desc>제목에 대한 부가 설명...</Desc>

            </ContentTitle>
            
            <ContentGrid>
                <ul id="content">
                        {
                         data.map((e,i)=>{
                                    return(
                        <li key={e}>
                            <p>{e.title}</p>                                                                                                               
                                <AnimateNumber
                                
                                value={e.number}
                                duration={5000}
                            formatValue={(value)=> `${value.toFixed(0)}`}
                                    />
                                                                                              
                            <p>{e.desc}</p>
                            </li> 
                                )
                            })         
                        }
                </ul>
                {/* classname 을 준다고 적용되지 않기 때문에 id 값을 주고 작성 */}
            </ContentGrid>
                                  
        </ContaninerWrap>

    </Container>
    </>
  )
}

export default Different
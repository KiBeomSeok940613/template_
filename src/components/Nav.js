import { faArrowRightFromBracket, faChevronDown, faLock, faRotate, faUser,  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import Main from '../pages/Main'



const NavContent =styled.div`
    width: 100%; position: sticky; top: 0; border-bottom: 1px solid rgba(255,255,255,0.3); background-color: #fff; 
    z-index: 40;
`
const NavWrap =styled.div`
    max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 10px 2%;
`
const NavLogo =styled.div`
    img{width: 100%}
`
const NavList =styled.div`
    display: flex; justify-content: space-between; flex-basis: 66.66667%;
    @media screen and (max-width : 1024px){
        display: none;
    }
    ul{
        display: flex; flex-basis: 100%; justify-content: space-between;
    }
    li{
        position: relative; flex-basis: 25%; text-align: center;
    }
`
const NavMember =styled.div`
    ul{
        display: flex; column-gap: 20px; justify-content: space-between;
    }
    a.active{
        font-weight: bold;
        color: hotpink;
    }
`
const NavSubmenu = styled.ul`
    position: absolute; background-color: rgb(30,41,59);
    transition: 0.5s; flex-wrap: wrap;
    text-align: center;
     overflow: hidden;
    height: ${({$isopen, $height}) => ($isopen === "true" ? $height : "0px")};
    /* ${({  })} */
   
    li{
        flex-basis: 100%  !important;
        padding: 20px 0;    
    }
    a{
        color: #fff;
    }

        /* 트랜지션은 height auto 일때 안먹힌다 */
    
`
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
const Container = styled.div`
        width: 320px;
        height: 100%;
        position: fixed;
        background-color: rgb(249,250,251);
        right: ${({$isopen})=> $isopen ? "0px" : "-320px"} ;
        top: 0;
        padding: 48px;
        box-sizing: border-box;
        z-index: 40;
        transition: all 0.5s;
        ::after{
            content: "";
            right: 0;
        }
    @media screen and (min-width: 1024px){display: none;}
    > ul{
        margin-top: 24px; 
        >li{
            padding: 20px; border-bottom: 1px solid #add; font-weight: bold; cursor: pointer;
        }
    }

`
const Msubmenu = styled(NavSubmenu)`  
    width: 100%;
    position: relative; 
    background-color: transparent;
    text-align: left;
    li{
        padding-left: 15px;
        a{
            color: #000;
        }
    }
    
`
const StyledIcon = styled(FontAwesomeIcon)`
    transition: all 0.5s;
    font-size: 12px;
    vertical-align: baseline;
    transform: rotate(${({$isopen})=> $isopen === "true" ? "180deg" : "0"});

`
    

const MsubmenuMember = styled(NavMember)`
    margin-top: 45px;
    ul{
        justify-content: center;
        li{
            border: 1px solid #ddd;
            padding: 10px; border-radius: 4px;
            background-color: purple;
            &:nth-child(2){
                background-color: hotpink;
            }
            a{
                color: white;
            }
        }
    }

`
// 스타일 css 가져오고 싶을때 소괄호 사용


function Nav({userState}) {
    // props 로 받는거라 중괄호를 꼭 사용했어야 했음
    // const userState = useSelector(state => state.user);
    const [isHeight, setIsHeight] = useState();

    const SubMenuHeight = (e) =>{ 
        const list = document.querySelectorAll(".sub_list")[e];
      
        const listLength = list.querySelectorAll("li").length;
        
        const value = listLength * 43+"px";
      

        return setIsHeight(value)
        // 이걸 사용하면 세로길이값 확인 가능
}
    const [isActive, setIsActive] = useState(-1); 
    const [isActive2, setIsActive2] = useState(false)
    
    // 큰따음표 를 사용하면 문자열 그냥 사용하면 false
    const subData = {
        company: [
            {
                title: "인사말",
                link : '/comapany/greetings'
            },
            {
                title: "연혁",
                link : '/company/history'
            },
            {
                title: "내부전경",
                link : '/company/interior'
            },
            {
                title: "오시는길",
                link : '/company/directions'
            },
        
            
        ], 
        business: [
            {
                title: "사업소개",
                link : '/business/buisness-1'
            },
            {
                title: "사업소개2",
                link : '/business/business-2'
            },
            {
                title: "사업소개3",
                link : '/business/business-3'
            },
         
        ], 
        product: [
            {
                title: "제품소개",
                link : '/product/product-1'
            },
            {
                title: "제품소개2",
                link : '/product/product-2'
            },
            {
                title: "제품소개3",
                link : '/product/product-3'
            },
        ], 
        service: [
            {
                title: "공지사항",
                link : '/service/notice'
            },
            {
                title: "온라인 상담",
                link : '/service/online'
            },
            {
                title: "질문과 답변",
                link : '/service/qna'
            },
            {
                title: "갤러리",
                link : '/service/gallery'
            },
        ], 
    }
    // 변수명 ["company"][0] .title 느낌으로 작성  
    
       

    
            
            const Nav = [
                {
                    title: "소개",
                    link: "company"
                },
                {
                    title: "사업소개",
                    link: "business"
                },
                {
                    title: "제품소개",
                    link: "product"
                },
                {
                    title: "고객센터",
                    link: "service"
                },

            ]
            
            // SubMenu[i].map((e,index)=>{
            //     return(
            //         console.log(e,index)
            //     )
            // })
    
  return (
    <>
        <NavContent>
            
            <NavWrap>
                
                <NavLogo>
                    <NavLink to="/">
                        <img src='https://via.placeholder.com/120x60' alt='로고' />
                    </NavLink>
                </NavLogo>
                
                <NavList>
                    
                    <ul>
                
                        {/* 반복문  */}
                        {
                         Nav.map((e,i) =>{
                            return(
                                <li  onMouseOver ={()=>{
                                    
                                    SubMenuHeight(i);
                                    setIsActive(i)
                                    
                                }} onMouseOut={()=>{
                                    setIsActive(-1)
                                }} key={i}><NavLink to={`/${e.link}`}>{e.title}</NavLink><StyledIcon icon={faChevronDown} $isopen={isActive === i ? "true" : "false"} />
                                <NavSubmenu className={`sub_list`} $isopen={isActive2 === i ? "true" : "false"}  $height = {isHeight}>
                                    {/* 그냥 쓰게되면 속성으로 잡히지만 $를 쓰게되면 속성으로 잡히지 않음 속성으로 보이는걸 방지하기 위함*/}
                                    {
                                        subData[e.link].map((el,index)=>{
                                            return(
                                                <li key={index}><NavLink to={el.link}>{el.title}</NavLink></li>
                                            )
                                        })
                                    }
                                </NavSubmenu>
                                
                                </li>
                            )
                        })}                                                     
                     </ul>
                
                </NavList>
                
                <NavMember>
                    <ul>
                        <li>
                            <NavLink to={userState.data?.nickname ? "/logout" : "/login"}>
                                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>{userState.data?.nickname ? "로그아웃" : "로그인"}
                                {/* 값이 없더라도 출력시키는 ? 코드 */}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/member">
                                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>회원가입
                            </NavLink>
                        </li>
                    </ul>
                </NavMember>

            </NavWrap>

            </NavContent>
            {/* 모바일 네비 */}
      

            <Hamburger className={isActive2 === true && "on"} onClick={()=>{setIsActive2(!isActive2)}}> 
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
                <Container $isopen={isActive2}>
                 <MsubmenuMember>
                    <ul>
                        <li>
                            <NavLink to="/login">
                                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>{userState.data?.nickname ? "로그아웃" : "로그인"}
                                {/* 값이 없더라도 출력시키는 ? 코드 */}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/member">
                                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>회원가입
                            </NavLink>
                        </li>
                    </ul>
                
                    </MsubmenuMember>
                   
                        <ul>
                        {
                            Nav.map((e,i)=>{
                                return(
                                    <li key={i} onClick={()=>{
                                        SubMenuHeight(i);
                                        (isActive !== i ? setIsActive(i) : setIsActive(-1));
                                    }}>{e.title}
                                         <Msubmenu className='sub_list' $isopen={isActive === i ? "true" : "false"} $height={isHeight}>
                                            {
                                            subData[e.link].map((el,index)=>{
                                                return(
                                                    <li key={index}><NavLink to={el.link}>{el.title}</NavLink></li>
                                                    )
                                                })
                                            }

                                         </Msubmenu>
                                    </li>

                                )
                            })
                        }
                        </ul>
                    
                </Container>
            {/* 모바일 네비 */}

        </>

    
  )
}

export default Nav

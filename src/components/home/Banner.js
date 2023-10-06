import React from 'react'
import {Swiper, SwiperSlide } from 'swiper/react'
import {Navigation, Autoplay, Pagination} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination' ;
import 'swiper/css/navigation' ;
import styled from 'styled-components';
import WOW from 'wowjs';
import 'animate.css'
import { useEffect } from 'react';

// yarn add wow js 다운로드 후 사용 가능

const  TxtData = [
  {
    title:"제목1",
    desc :"부제목",
    desc2 : "하고싶은 말..."
  },
  {
    title:"제목2",
    desc :"부제목",
    desc2 : "하고싶은 말..."
  },
  {
    title:"제목3",
    desc :"부제목",
    desc2 : "하고싶은 말..."
  },
  {
    title:"제목4",
    desc :"부제목",
    desc2 : "하고싶은 말..."
  },
  {
    title:"제목5",
    desc :"부제목",
    desc2 : "하고싶은 말..."
  },

]

// 컴포넌트 하나 만든다음 스타일 컴포넌트 () 안에 넣으면 사용가능
const StyleSlide = styled(SwiperSlide)`
      img{
        position: relative;
        width: 100%; height: auto;
       }
`
const DescContent = styled.div`
      position: absolute;
      left: 50%; top: 50%;
      transform: translate(-50%, -50%);
      h3{
        font-size: 48px;
        text-align: center;
        @media screen and (max-width: 768px) {
          font-size: 16px;
        }
        @media screen and (min-width: 1280px) {
          font-size: 30px;
        }
      }
      p{
        font-size: 24px;
        text-align: center; font-weight: bold;
        @media screen and (max-width: 768px) {
          font-size: 14px;
        }
        @media screen and (max-width: 1280px) {
          font-size: 20px;
        }
      }
`
function Banner() {

  useEffect(()=>{
      new WOW.WOW({
          boxClass: 'wow',
          AnimateClass: 'animate__animated',
          live: false,
          mobile : true


      }).init();
  }, [])
  return (

    
    <>
   
      <Swiper  
      autoplay={{
            delay : 3000,
           disableOnInteraction: false

        }}
        slidesPerView={1}
        navigation = {{clickable:true}}
        pagination = {{clickable:true}}
        loop={true}
        // 무한루프
        modules={[Autoplay, Navigation, Pagination]}
        // onSwiper={(Swiper)=>{
        //   console.log(Swiper)
        // }}
        onSlideChange={()=>{
         new WOW.WOW({
          live: false

         }).init()
        }}
        
        >
       
      {
      TxtData.map((e,i)=>{
        return(
          
            <StyleSlide key={i}><img src={`./images/img${i+1}.${ i === 2 ? 'png' : 'jpg' }`}  alt='slide'/>
              
              <DescContent>
                <h3 className='wow animate__fadeInDownBig' data-wow-duration="1s">{e.title}</h3>
                <p className='wow animate__fadeInDownBig' data-wow-duration="0.3s">{e.desc}</p>
                <p className='wow animate__fadeInDownBig' data-wow-duration="0.3s">{e.desc2}</p>
                </DescContent>

                
                </StyleSlide>
          
     
        )
         
      })
    }


      {/* <SwiperSlide>
          <img src='./images/1.jpg' alt='slide' />
        </SwiperSlide>
        <SwiperSlide>
        <img src='./images/2.jpg' alt='slide' />
        </SwiperSlide>
        <SwiperSlide>
        <img src='./images/3.png' alt='slide' />
        </SwiperSlide>
        <SwiperSlide>
        <img src='./images/4.jpg' alt='slide' />
        </SwiperSlide>
        <SwiperSlide>
        <img src='./images/5.jpg' alt='slide' />
        </SwiperSlide> */}
      </Swiper>

    </>
  )
}

export default Banner
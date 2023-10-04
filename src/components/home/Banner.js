import React from 'react'
import {Swiper, SwiperSlide } from 'swiper/react'
import {Navigation, Autoplay, Pagination} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination' ;
import 'swiper/css/navigation' ;
import styled from 'styled-components';




// 컴포넌트 하나 만든다음 스타일 컴포넌트 () 안에 넣으면 사용가능
const styleSlide = styled(SwiperSlide)`
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
  return (
    <>
   
      <Swiper  
      Autoplay={{
            delay :3000,
           disableOnInteraction: false

        }}
        slidesPerView={1}
        navigation = {{clickable:true}}
        pagination = {{clickable:true}}
        loop={true}
        // 무한루프
        modules={[Autoplay, Navigation, Pagination]}>
       
      {
      Array(5).fill().map((_,i)=>{
        return(
          
            <SwiperSlide key={i}><img src={`./images/img${i+1}.jpg`} alt='slide'></img>
              
              <DescContent>
                <h3>강조하는 제목</h3>
                </DescContent>
                
                
                
                </SwiperSlide>
          
     
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
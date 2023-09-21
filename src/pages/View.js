import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Modal from '../components/Modal';
import { useState } from 'react';
import { useEffect } from 'react';
import { deleteDoc, doc, getDoc, getFirestore, increment, updateDoc } from 'firebase/firestore';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faPen, faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons';



const Container = styled.div`
    background-color: #f5f5f5;
    height: calc(100vh - 86px);
    padding: 50px 0;
 
`
const ContentWrap = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border: 1px solid rgba(151,157,172,0.28);
    border-radius: 10px;
`
const Content = styled.div`
    padding-bottom: 5px;
    border-bottom:  1px solid rgba(151,157,172,0.28);
    > div{
        margin-top: 12px;
        width: 50%; display: flex; justify-content: space-between;
    }
`

const ButtonContent = styled.div`
    display: flex; justify-content: space-between;
`
const ButtonWrap = styled.div`
    margin-top: 50px;
    display: flex; justify-content: space-between;
    column-gap: 20px;
    &:nth-child(2) > button:nth-child(1){background-color: #115e59;}
    &:nth-child(2) > button:nth-child(2){background-color: #981c1c;}
         
`
const Button = styled.button`
    border-radius: 0.5rem;
    margin: 20px 0;
    background-color: #1150c9;
    padding: 0.6rem 1rem;
    font-size: 1.25rem;
    font-weight: bold;
    color: #fff;
    display: flex; align-items: center;
    outline: none; border: none;
    cursor: pointer;
    
    &:nth-child(2){
        background-color: #7e22ce;
    }
    a{color: #fff;}
    svg{margin-right: 12px;}
`


function View() {

    const  {board, view} = useParams();
    const boards = ["notice", 'online', 'qna', 'gallery'];
    const [isModal, setIsModal] = useState(view ? false : true);
    const navigate = useNavigate();
    const [post, setPost] = useState();
    const [message, setMessage] = useState('');
    const viewCnt = async(board, view) => {
        const viewRef = doc(getFirestore(), board,view);
        // 파이어 스토어 (인증후) board 값과 view 값을 가져온거임
        await updateDoc( viewRef,{
            view: increment(1)
            // 문서가 조회되었을때 실행해야함
        })
    }

    useEffect(()=>{
     
            const fetchData = async () => {
                const postRef = doc(getFirestore(), board ,view);
                const postSnapshot = await getDoc(postRef)
                if(postSnapshot.exists()){
                setPost(postSnapshot.data())
                }else{
                    setIsModal(true)
                    setMessage("해당 문서가 존재하지 않습니다.")
                }
                viewCnt(board, view)
                console.log(board,view)
            }
            
            fetchData();      
        }, [board,view])

        const deletePost = async () => {
            if(window.confirm('정말로 삭제 하시겠습니까?')){
                // window.confirm 확인, 취소를 띄우는 창
                alert("삭제 되었습니다.")
            
                const docRef = doc(getFirestore(), board, view);
                // doc 전체문서는 docs    문서를 불러와서
                await deleteDoc(docRef);
                // deletedoc 문서 삭제

                alert("게시물이 삭제 되었습니다.");
                navigate(`/service/${board}`);

            }
        }
     
  
    if(!boards. includes(board)){
        return (
            <> 
          
          isModal && <Modal error={message} onClose={()=>{setIsModal(false);}} />       
             
           </> 
        )
        
    }
    if(isModal){
        return( 
            <Modal error={message} onClose={()=>setIsModal(false)}/>
        )
    }
    
     

    if(!post){
        return(
            <div>로딩중</div>
        )
    }

    return(
        <>
         <Container>
                <ContentWrap>
                    <Content>
                        <h2>{post.title}</h2>
                            <div>
                                <span>{post.nickname}</span>
                                <span>{post.timestamp.toDate().toLocaleDateString()}</span>
                                <span>{post.view}</span>
                            </div>
                    </Content>
                    <div dangerouslySetInnerHTML={{ __html: post.content}}></div>
                    <ButtonContent>
            
                            <ButtonWrap>
                                <Button onClick={()=>{navigate(`/service/${board}`)}}><FontAwesomeIcon icon={faList}></FontAwesomeIcon>목록</Button>
                                <Button onClick={()=>{navigate(`/write/${board}`)}}><FontAwesomeIcon icon={faPen}></FontAwesomeIcon>글쓰기</Button>
                            </ButtonWrap>
                            
                            <ButtonWrap>
                            
                                <Button onClick={()=>{navigate(`/edit/${board}/${view}`)}}><FontAwesomeIcon icon={faPenSquare}></FontAwesomeIcon>수정</Button>
                                <Button onClick={deletePost}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>삭제</Button>

                            </ButtonWrap>
                        </ButtonContent>
                </ContentWrap>
                </Container>                       
        
        
       
        </>
   
   )
     
}

export default View
import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Modal from '../components/Modal';
import { useState } from 'react';
import { useEffect } from 'react';
import { Firestore, doc, getDoc, getFirestore } from 'firebase/firestore';



function View() {

    const  {board, view} = useParams();
    const boards = ["notice", 'online', 'qna', 'gallery'];
    const [isModal, setIsModal] = useState(true);
    const navigate = useNavigate();
    const [post, setPost] = useState();
    const [message, setMessage] = useState('');

    useEffect(()=>{
     
            const fetchData = async () => {
                const postRef = doc(Firestore(), board ,view);
                const postSnapshot = await getDoc(postRef)
                if(postSnapshot.exists()){
                setPost(postSnapshot.data())
                }else{
                    setIsModal(true)
                    setMessage("해당 문서가 존재하지 않습니다.")
                }
            }
            
            fetchData();      
        }, [board,view])

     
  
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
        <div>{post.title}</div>
        <div>{post.nickname}</div>
        <div>{post.timestamp.toDate().toLocaleDateString()}</div>
        <div>{post.view}</div>
        <div dangerouslySetInnerHTML={{ __html: post.content}}></div>

        <Link to='/service/notice'>목록</Link>
        <Link to='/write/notice'>글쓰기</Link>
        </>
   
   )
     
}

export default View
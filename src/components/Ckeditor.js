import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styled from 'styled-components';
import { addDoc, collection, doc, getFirestore,  serverTimestamp, updateDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { faList, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from './Modal';
import { useEffect } from 'react';
import { upload } from '@testing-library/user-event/dist/upload';
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'



const ButtonWrap = styled.div`
    display: flex;
    justify-content: space-between;

`
const Button = styled.div`
    border-radius: 0.5rem;
    margin: 20px 0;
    background-color: rgb(126,34,206);
    padding: 0.6rem 1rem;
    font-size: 1.25rem;
    font-weight: bold;
    color: #fff;
    display: flex; align-items: center;
    outline: none; border: none;
    cursor: pointer;
    &:nth-child(1){
        background-color: rgba(29,78,216);
    }
    a{color: #fff;}
    svg{margin-right: 12px;}
`

function Ckeditor({title, postData}) {
    const memberProfile = useSelector(state => state.user);
    const[isModal,setIsModal]=useState(false);
    const navigate=useNavigate();
    const[writeData,setWriteData]=useState("");
    // console.log(memberProfile)
    const[message,setMessage] = useState("");
    const {board, view} = useParams();
    const [editorInstance, setEditorInstance] = useState(null);
    const [fileUrl, setFileUrl] = useState("");
    

    useEffect(()=>{
        if(postData){
            setWriteData(postData.content);

        }
    }, [postData])
    // alert(board)
    const dataSubmit = async ()=>{
        if(title.length === 0){
            setIsModal(!isModal);
            setMessage("제목을 입력해주세요.");
        }else if(writeData.length === 0){ 
            setIsModal(!isModal);
            setMessage("내용을 입력해주세요")
            return;
        }
        try{
            if(board && view){
                const postRef = doc(getFirestore(), board, view);
                await updateDoc(postRef, {
                    title: title,
                    content: writeData
                })
                alert('게시글이 성공적으로 수정 되었습니다.')
                
            }else{
                const fileInput = document.querySelector("#file").files[0];
                // files[0] = 파일을 가져오는 기본 문법
                console.log(fileInput);
                if(fileInput){
                    uploadToFirebase(fileInput)
                }
                // await addDoc(collection(getFirestore(),board),{
                //     title : title,
                //     content: writeData,
                //     view: 1,
                //     uid:memberProfile.uid,
                //     name:memberProfile.data.name,
                //     email:memberProfile.data.email,
                //     nickname:memberProfile.data.nickname,
                //    file : fileUrl,
                //     timestamp:serverTimestamp()
                //     //timestamp는 서버의 타임스탬프가 함수형태로 들어감
    
                // })
            }
            
            alert("게시물이 성공적으로 등록 되었습니다. ")
            navigate(`/service/${board}`)
            //문서를 추가할거다 => 파이어스토어 데이터를 인증하고 => 내가 접속한 데이터 베이스 추가한다는 의미임
            //getFirestore는 파이어스토어에서 인증하는거
            //setDoc => 이름이 지정가능함(member 페이지에 uid)
            //addDoc => 랜덤으로 지정됨
        }catch(error){
            setIsModal(!isModal);
            setMessage(error);
        }
    }

    const uploadToFirebase = async (file) => {
        const storageRef = ref (getStorage(), 'images/' + file.name);
        const upload = uploadBytesResumable (storageRef, file)

        return new Promise((resolve, reject) =>{
            upload.on ('state_changed',
            (snapshot) =>{
                
            },
            (error) =>{
                reject(error)
            },
            ()=>{
                getDownloadURL(upload.snapshot.ref).then((result)=>{
                    resolve(result)
                    setFileUrl(result);
                })            
            }
            )
        })
    }

    function UploadAdapter(editor){
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return {
                upload : async () => {
                    const file = await loader.file;
                    const downURL = await uploadToFirebase(file);
                    return {default : downURL}
                }
            }
        }
    }

  return (
    <>
    {
        isModal && <Modal error={message} onClose={()=>setIsModal(false)}/>
    }
    {/* {writeData} */}
    {/* props를 받아올때 작명해 준 이름을 받아 와야함 */}
    <CKEditor 
                  
                    editor={ClassicEditor}
                    data ={writeData}

                    config={{
                         placeholder: "내용을 입력하세요.",
                         extraPlugins : [UploadAdapter]
                     }}
                    onReady={ editor => {
                        setEditorInstance(editor)
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setWriteData(data);
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
        <input type='file' id = 'file'></input>
                <ButtonWrap>
                    <Button ><Link to="/service/notice"><FontAwesomeIcon icon={faList}/>목록</Link></Button>
                    <Button onClick={dataSubmit} ><FontAwesomeIcon icon={faPen} />완료</Button>
                </ButtonWrap>
    
    </>
  )
}

export default Ckeditor
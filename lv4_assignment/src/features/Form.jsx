import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { addList } from '../redux/modules/logs';
import { __addList } from '../redux/modules/logs';

function Form() {
    const dispatch =useDispatch();
    const [title, setTitle] = useState('')
    const [content,setContent] = useState('')
    const logs = useSelector((state) => state.logs)
    // form 태그 내부에서 submit 실행된 경우 호출되는 함수
    const handleSubmitButtonClick = (e) => {
        e.preventDefault();
        // 추가하려는 log list를 newLog라는 객체로 새로 만듬
        const newLog = {
            id: 0,
            title,
            content,
        };
        //  Log list 추가하는 reducer 호출 
        dispatch(__addList(newLog));
        console.log("newLog", newLog)
        //제출 버튼 후 state 초기화
        setTitle("");
        setContent("");
    };
    // title 변경 감지하는 함수
    const handleTItleChange = (e) => {
        setTitle(e.target.value);
        console.log("Title", setTitle)
    };
    // content 변경 감지하는 함수
    const handleContentChange = (e) => {
        setContent(e.target.value);
        console.log("Content", setContent)
    };


    return (
    <>
    <form onSubmit={handleSubmitButtonClick}>
        <StWrapper>
            <StInputGroup>
                <StInputLabel>
                        제목
                    <StInput 
                    type="text"
                    placeholder="제목을 입력하세요."
                    value={title}
                    onChange={handleTItleChange}
                    />
                </StInputLabel>
                <StInputGroup>
                    <StInputLabel>
                        내용
                    <StInput 
                    type="text"
                    placeholder="내용을 입력하세요."
                    value={content}
                    onChange={handleContentChange}
                    />
                    </StInputLabel>
                </StInputGroup>
            </StInputGroup>

            <div>
                <StButton
                type='submit'
                >
                    추가하기
                </StButton>
            </div>
        </StWrapper>
    </form>
    </>
    )
}

export default Form
const StWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    margin-bottom: 24px;
    height: 200px;
    background-color: lightcoral;
`
const StInputGroup = styled.div`
    align-items: center;
    gap: 20px
`
const StInputLabel = styled.label`
    font-size: 15px;
    font-weight: 700;
`
const StInput = styled.input`
    width: 150px;
    height: 35px;
    border: 1px solid black;
    border-radius: 15px;
    margin: 10px;
`
const StButton = styled.button`
    width: 70px;
    height: 35px;
    border: 1px solid black;
    border-radius: 15px;
    cursor: pointer;
`
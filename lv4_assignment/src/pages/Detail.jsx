import React, { useEffect, useState } from 'react'
import { useNavigate,  } from 'react-router-dom'
import axios from 'axios';
import styled from 'styled-components';

function Detail() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState(null);
  const [inputValue, setInputValue] = useState({
    title: '',
  })
  const [targetID, setTargetID] = useState('');
  const [contents, setContents] = useState('');


  // 조회 함수
  const fetchLogs = async () => {
    const { data } = await axios.get('http://localhost:4000/logs');
    console.log('data', data)
    setLogs(data);
  };

  useEffect(() => {
      // db로부터 값을 가져올 것이다.
    fetchLogs()
  }, []);


  // 추가 함수
  const onSubmitHandler = async() => {
    axios.post('http://localhost:4000/logs', inputValue);
    // setLogs([...logs, inputValue]);
    fetchLogs();
  };

  // 삭제 함수
  const onDeleteButtonClickHandler = async (id) => {
    axios.delete(`http://localhost:4000/logs/${id}`)
    setLogs(logs.filter(item => {
      return item.id !== id;
    }));
  };

  // 수정 함수
  const onUpdateButtonClickHandler = async () => {
    axios.patch(`http://localhost:4000/logs/${targetID}`, {
      title: contents
    })
    setLogs(logs.map(item => {
      if (item.id == targetID) {
        return {...item, title: contents}
      } else {
        return item;
      }
    }))
  }

  return (
    <>
    {/* <div>{logs.id}</div>
    <div>{logs.title}</div>
    <div>{logs.content}</div> */}
    
      <StWrapper>
      <StToHomeButtonWrapper>
      <button
        onClick={()=>{navigate('/')}}>이전으로</button>
      </StToHomeButtonWrapper>

      <StAddButtonWrapper>
        {/* {INPUT 영역} */}
        <form onSubmit = {(e)=> {
          e.preventDefault();
          onSubmitHandler();
          //버튼 클릭 시, input에 들어있는 값(state)을 이용하여 DB에 저장(POST요청)
        }}>
          <input 
          type="text"
          placeholder='운동종목, set/reps'
          value={inputValue.title}
          onChange={(e) => {
            setInputValue({
              title: e.target.value});
          }}
          />
          <button type="submit">추가</button>
        </form>
      </StAddButtonWrapper>

      <StListContainer>
        {/* {데이터 영역} */}
        <div>
            {logs?.map((item) => {
              return (
                <div key={item.id}>
                  {item.id} : {item.title}
                  <button onClick={() => onDeleteButtonClickHandler(item.id)}>삭제</button>
                </div>
                );
              })}
        </div>
      </StListContainer>
        
      <div>
        {/* {수정 영역} */}
        <input 
        type="text" placeholder='수정할 운동번호'
        value={targetID}
        onChange={(e) => {
          setTargetID(e.target.value)
        }}
        />
        <input 
        type="text" placeholder='수정할 운동내용'
        value={contents}
        onChange={(e) => {
          setContents(e.target.value)
        }}
        />
        <button
        onClick={onUpdateButtonClickHandler}
        >수정</button>
      </div>
        
      </StWrapper>
    </>
  )
  
}

export default Detail

const StWrapper = styled.div`
  /* display: flex; */
  /* justify-content: space-between; */
  align-items: row;
  margin: 35pt;
  
`
const StToHomeButtonWrapper = styled.div`
  margin: 0 0 50pt 0;
`
const StAddButtonWrapper = styled.div`
  display: flex;
  justify-content: right;
  margin: 10px;
`
const StListContainer = styled.div`
  display: flex;
  margin: 15px;
  gap: 15px;
`
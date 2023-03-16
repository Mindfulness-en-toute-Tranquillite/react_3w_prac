import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { removeList } from '../redux/modules/logs'
import { __removeList } from '../redux/modules/logs'

function List() {
const logs = useSelector((state)=> state.logs)
const navigate = useNavigate();
const dispatch = useDispatch();

// 상세보기 클릭하면 페이지 이동
const handleDetailPageLinkClick = (logId) => {
    navigate(`/${logId}`);
}
// 삭제버튼 클릭 동작
const handleDeleteLogClick = (logId) => {
    dispatch(__removeList(logId));
}


    return (
    <StListWrapper>
        <StListHeader>
            개발일지 리스트
        </StListHeader>
        
        <StLogListBoxContainer>
            {
            logs.map((item) => {
                return (
                <StLogListBox key={item.id}>
                    <div>
                        <div>제목: {item.title}</div>
                        <div>내용: {item.content}</div>
                    </div>

                    <div>
                        <button
                        onClick={handleDetailPageLinkClick}
                        >
                            상세보기
                        </button>
                        <button
                        onClick={() => handleDeleteLogClick(item.id)}
                        >
                            삭제하기
                            </button>
                    </div>

                </StLogListBox>
            )})
            }
        </StLogListBoxContainer>
    </StListWrapper>
    )
}

export default List

const StListWrapper = styled.div`

    height: 500px;
    background-color: lightseagreen;
`
const StListHeader = styled.h3`
    font-size: 30px;
    font-weight: 500;
    width: 100%;
    height: 60px;
    background-color: #0b6560;
`
const StLogListBoxContainer = styled.div`
    display: flex;
    justify-content: left;
    align-items: row;
    margin: 15px;
    gap: 15px;
`


const StLogListBox = styled.div`
    display: flex;
    align-items: center;
    padding: 0 20px;
    margin-bottom: 24px;
    width: 250px;
    height: 150px;
    background-color: #08403d;
`
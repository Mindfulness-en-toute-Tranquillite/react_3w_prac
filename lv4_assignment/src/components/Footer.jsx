import React from 'react'
import styled from 'styled-components'

const Footer = () => {
    return (
    <StContainer>
        <div>개인정보 처리방침</div>
        <div>서비스 이용약관</div>
        <div>후원하기</div>
        <div>고객센터</div>
    </StContainer>
    );
};

export default Footer

const StContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    margin-bottom: 24px;
    height: 60px;
    background-color: darkgrey;
`
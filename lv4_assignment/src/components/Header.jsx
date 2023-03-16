import React from 'react'
import styled from 'styled-components'

const Header= () => {
    return (
        <StContainer>
            <div>Home</div>
            <div>운동일지</div>
        </StContainer>
    )
}

export default Header;

const StContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    margin-bottom: 24px;
    height: 60px;
    background-color: darkgrey;
`
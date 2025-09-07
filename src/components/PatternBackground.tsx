import React from 'react';
import styled from 'styled-components';

const Pattern = () => {
  return (
    <StyledWrapper>
      <div className="container" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container {
    width: 100%;
    height: 100vh;
    background: repeating-linear-gradient(60deg, transparent 30px, rgba(255, 0, 0, 0.2) 10px, rgba(255, 238, 0, 0.2) 90px),
      repeating-linear-gradient(120deg, transparent 30px, rgba(255, 0, 0, 0.2) 10px, rgba(255, 238, 0, 0.2) 90px),
      repeating-linear-gradient(180deg, transparent 30px, rgba(255, 0, 0, 0.2) 10px, rgba(255, 238, 0, 0.2) 90px);
  }`;

export default Pattern;

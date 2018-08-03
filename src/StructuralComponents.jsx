import styled from 'styled-components';

export const Split = styled.div`
  display: flex;
  height: 100vh;
`;

export const RenderedWindow = styled.div`
  background-color: #191324;
  width: 35%;
  padding: 20px;
  color: white;
  border-left: 1px solid #302b3a;
  h1, h2, h3, h4, h5, h6 {
    color: #82d8d8;
  }
  h1 {
    border-bottom: solid 3px red;
    padding-bottom: 10px;
  }
  a {
    color: red;
  }
`;

export const CodeWindow = styled.div`
  flex: 1;
  padding-top: 2rem;
  background-color: #191324;
`;

import styled from 'styled-components';

export const Header = styled.header`
  background-color: #191324;
  color: #75717c;
  font-size: 0.8rem;
  height: 23px;
  text-align: center;
  position: fixed;
  box-shadow: 0px 3px 3px rgba(0,0,0,0.2);
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10px;
  -webkit-app-region: drag;
`;

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

export const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #191324;
  height: 100vh;
`;

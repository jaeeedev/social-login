import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { SiKakao } from "react-icons/si";
import { SiNaver } from "react-icons/si";
import auth from "../util/auth";

const Login = () => {
  const naverButtonRef = useRef(null);

  useEffect(() => {
    auth.initKakaoSdk();
    auth.naverButtonInit();
  }, []);
  return (
    <Wrapper>
      <h2>로그인</h2>

      <Form>
        <input type="text" />
        <input type="text" />
        <button>로그인</button>
      </Form>

      <h2>간편 로그인</h2>
      <LoginButton domain="kakao" onClick={auth.kakaoAuthorize}>
        <SiKakao className="icon" />
        카카오 계정으로 로그인하기
      </LoginButton>
      <LoginButton
        domain="naver"
        onClick={() => {
          auth.naverAuthorize(naverButtonRef);
        }}
      >
        <SiNaver className="icon" />
        <div id="naverIdLogin" className="naverIdLogin" ref={naverButtonRef} />
        네이버 계정으로 로그인하기
      </LoginButton>
    </Wrapper>
  );
};

const brandColors = {
  kakao: "#fae100",
  naver: "#03c759",
};

const Form = styled.form`
  input {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    display: block;
    margin: 1rem auto;
  }

  button {
    border: none;
    padding: 0.5rem 2rem;
    border-radius: 0.5rem;
    background: #333;
    color: white;
  }

  margin-bottom: 5rem;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  align-items: center;
  text-align: center;

  h2 {
    margin-bottom: 1rem;
  }
`;

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ domain }) => brandColors[domain]};
  border: none;
  padding: 0.9rem 1.5rem;
  margin: 0 auto;
  cursor: pointer;
  font-weight: 700;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;

  .icon {
    font-size: 1.5rem;
  }

  .naverIdLogin {
    display: none;
  }
`;

export default Login;

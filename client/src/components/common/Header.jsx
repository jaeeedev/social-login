import { useState } from "react";
import styled from "styled-components";
import { Link, Outlet } from "react-router-dom";
import useHeader from "./hooks/useHeader";

const Header = () => {
  const { loginStatus, userInfo, logoutHandler, unlinkHandler } = useHeader();
  const [visible, setVisible] = useState(false);

  return (
    <StyledHeader>
      <div className="inner_header">
        <h1>
          <Link to="/">테스트</Link>
        </h1>

        {loginStatus ? (
          <div className="profile">
            <div
              className="profile_image"
              onClick={() => {
                setVisible((prev) => !prev);
              }}
            >
              <img src={userInfo.profile_image} alt="프로필 이미지" />
            </div>
            <p>{userInfo.nickname}</p>
            {visible && (
              <div className="options">
                <button onClick={logoutHandler}>로그아웃</button>
                {/* <button onClick={unlinkHandler}>연결끊기</button> */}
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="login">
            로그인
          </Link>
        )}
      </div>
      <Outlet />
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  width: 100%;
  height: 57px;
  background: #333;

  .profile {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    position: relative;

    .options {
      position: absolute;
      top: 3.5rem;
      right: 0;
      background: #666;

      button {
        display: block;
        width: 7rem;
        margin: 1rem;
        padding: 0.5rem;
        cursor: pointer;
        border: none;
      }
    }
  }

  .profile_image {
    width: 1.7rem;
    height: 1.7rem;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }

  .inner_header {
    h1 {
      font-size: 1.3rem;

      a {
        color: white;
        text-decoration: none;
      }
    }
    padding: 1rem;
    max-width: 1100px;
    margin: 0 auto;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .login {
      color: white;
      text-decoration: none;
    }
    .logout {
      border: none;
      color: white;
      background: transparent;
      font-size: 1rem;
      cursor: pointer;
    }
  }
`;

export default Header;

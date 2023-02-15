import loginState from "../../../atom/loginState";
import userState from "../../../atom/userState";

import { useRecoilState, useRecoilValue } from "recoil";

const useHeader = () => {
  const [{ loginStatus }, setLogout] = useRecoilState(loginState);
  const userInfo = useRecoilValue(userState);

  //로그아웃

  const logoutFn = {
    kakao: async () => {
      await window.Kakao.Auth.logout();
      localStorage.removeItem("auth_token");
      setLogout({ ...loginState, loginStatus: false });
    },
    naver: async () => {
      // 추가적으로 필요한 과정 해주고
      localStorage.removeItem("auth_token");
      setLogout({ ...loginState, loginStatus: false });
    },
  };

  const logoutHandler = async () => {
    // 로그아웃도 현재 로그인 상태에 따라 다른 함수가 실행되어야 함

    const path = localStorage.accessFrom;
    logoutFn[path]();
  };

  //연결 끊기
  const unlinkHandler = async () => {
    await window.Kakao.API.request({
      url: "/v1/user/unlink",
    });

    localStorage.removeItem("auth_token");
    setLogout({ ...loginState, loginStatus: false });
  };

  //로그아웃 함수, 연결 끊기 함수, 유저정보(닉네임, 프사), 로그인 여부
  return { logoutHandler, unlinkHandler, userInfo, loginStatus };
};

export default useHeader;

import { useCallback } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import loginState from "../../../atom/loginState";
import userState from "../../../atom/userState";

const useAuth = () => {
  const setLogin = useSetRecoilState(loginState);
  const setUserInfo = useSetRecoilState(userState);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const getKakaoAuthToken = useCallback(async () => {
    const code = searchParams.get("code");
    // 지금 말고 사용할 때 읽어와서 괜찮음
    const response = await axios.post("http://localhost:3030/api/auth/kakao", {
      code,
    });

    const getUserInfo = async () => {
      const info = await window.Kakao.API.request({
        url: "/v2/user/me",
      });

      const { nickname, profile_image_url } = info.kakao_account.profile;
      setUserInfo({
        nickname,
        profile_image: profile_image_url,
      });
    };

    const token = response.data.token || null;
    window.Kakao.Auth.setAccessToken(response.data.token.access_token);
    // 자바스크립트 SDK 로 로그아웃 하기위해 액세스 토큰을 SDK 로 넘겨주는 과정

    if (token) {
      localStorage.setItem("auth_token", JSON.stringify(token));
      setLogin({
        ...loginState,
        loginStatus: true,
      });
      getUserInfo();
      navigate("/");
      // 성공하면 리다이렉트
    }
  }, [navigate, searchParams, setLogin, setUserInfo]);

  const getNaverAuthToken = useCallback(async () => {
    const token = window.location.href.split("=")[1].split("&")[0];

    const response = await axios.post("http://localhost:3030/api/auth/naver", {
      token,
    });

    if (response.status === 200) {
      const userInfo = response.data.userInfo.response;

      localStorage.setItem("auth_token", JSON.stringify(token));

      setUserInfo({
        nickname: userInfo.name,
        profile_image: userInfo.profile_image,
      });

      setLogin({
        ...loginState,
        loginStatus: true,
      });
      navigate("/");
    }
  }, [navigate, setLogin, setUserInfo]);

  return { getKakaoAuthToken, getNaverAuthToken };
};

export default useAuth;

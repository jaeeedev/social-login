import { useEffect } from "react";
import useAuth from "../components/auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AuthProcess = () => {
  const { getKakaoAuthToken, getNaverAuthToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.accessFrom) {
      // 인증 처리 페이지에서 로컬스토리지를 삭제한 경우 예외처리

      console.log("잘못된 접근입니다.");
      navigate("/");
    }

    const accessFrom = localStorage.accessFrom;

    const getTokenFn = {
      kakao: getKakaoAuthToken,
      naver: getNaverAuthToken,
    };

    getTokenFn[accessFrom]();
  }, [getKakaoAuthToken, getNaverAuthToken, navigate]);
  return <div>인증 중입니다...</div>;
};

export default AuthProcess;

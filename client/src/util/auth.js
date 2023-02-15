import { KEY } from "../config";
import { URL } from "../config";

const initKakaoSdk = () => {
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(KEY.KAKAO_JS);
    window.Kakao.isInitialized();
  }
};

const kakaoAuthorize = () => {
  window.Kakao.Auth.authorize({
    redirectUri: URL.AUTH_REDIRECT_URL,
  });

  localStorage.setItem("accessFrom", "kakao");
};

const naverAuthorize = (ref) => {
  ref.current.children[0].click();

  localStorage.setItem("accessFrom", "naver");
};

const naverButtonInit = () => {
  const naverLogin = new window.naver.LoginWithNaverId({
    clientId: KEY.NAVER_ID,
    callbackUrl: URL.AUTH_REDIRECT_URL,
    isPopup: false,
    loginButton: { color: "green", type: 3, height: 58 },
    callbackHandle: true,
  });

  naverLogin.init();
};

const auth = {
  initKakaoSdk,
  kakaoAuthorize,
  naverButtonInit,
  naverAuthorize,
};

export default auth;

import { atom } from "recoil";

const loginState = atom({
  key: "loginState",
  default: {
    loginStatus: false,
  },
});

export default loginState;

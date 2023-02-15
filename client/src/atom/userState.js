import { atom } from "recoil";

const userState = atom({
  key: "userState",
  default: {
    nickname: "",
    profile_image: "",
  },
});
export default userState;

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 3030;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

app.get("/", (req, res) => {
  res.send("hello world");
});

const fetcher = (url, method, params) => {
  // return axios.method(url)
};

app.post("/api/auth/kakao", async (req, res) => {
  const { code } = req.body;
  const RESTAPI_KEY = "90d44c8bf80ba7d5fc28fcecb7a2d1f4";

  const authToken = await axios.post(
    "https://kauth.kakao.com/oauth/token",
    {},
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: {
        grant_type: "authorization_code",
        client_id: RESTAPI_KEY,
        code,
        redirect_uri: "http://localhost:3000/success",
      },
    }
  );

  if (authToken) {
    return res.status(200).json({
      isSuccess: true,
      token: authToken.data,
    });
  }
});

app.post("/api/auth/naver", async (req, res) => {
  const { token } = req.body;

  const userInfo = await axios.get("https://openapi.naver.com/v1/nid/me", {
    headers: { Authorization: "Bearer " + token },
  });

  if (userInfo) {
    return res.status(200).json({
      userInfo: userInfo.data,
    });
  }
});

app.listen(port, () => {
  console.log(`${port}번 포트에서 열림`);
});

import axios from "axios";
import { API_SERVER_HOST } from "./commonApi";

const rest_api_key = import.meta.env.VITE_KAKAO_REST_API_KEY;
const redirect_uri = "http://localhost:5173/member/kakao";
const client_secret = import.meta.env.VITE_KAKAO_CLIENT_SECRET;
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";
const access_token_url = "https://kauth.kakao.com/oauth/token";

export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};

export const getToken = async (authCode) => {
  const header = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  };

  // URLSearchParams를 사용하여 파라미터를 form-data 형식으로 변환
  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("client_id", rest_api_key);
  params.append("client_secret", client_secret); // client_secret 추가
  params.append("redirect_uri", redirect_uri);
  params.append("code", authCode);

  try {
    const res = await axios.post(access_token_url, params, header);
    console.log("tokens: ", res);

    return res.data; // 두 토큰 반환
  } catch (error) {
    console.error("Token Error:", error.response?.data || error);

    throw error;
  }
};

export const getMemberWithToken = async (accessToken, refreshToken) => {
  try {
    const res = await axios.get(`${API_SERVER_HOST}/api/member/kakao`, {
      params: {
        accessToken: accessToken, // 파라미터 이름을 정확히 일치시킴.
        refreshToken: refreshToken,
      },
    });
    console.log("------------------", res);
    return res.data;
  } catch (error) {
    console.error("Member API Error Response:", error.response?.data);
    throw error;
  }
};

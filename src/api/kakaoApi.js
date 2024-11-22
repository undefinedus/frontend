import axios from "axios";
import { API_SERVER_HOST } from "./commonApi";

const rest_api_key = import.meta.env.VITE_KAKAO_REST_API_KEY;
const redirect_uri = import.meta.env.VITE_REDIRECT_URI;

const auth_code_path = `http://kauth.kakao.com/oauth/authorize`;

const access_token_url = "http://kauth.kakao.com/oauth/token";

export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  return kakaoURL;
};

export const getAccessToken = async (authCode) => {
  try {
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("client_id", rest_api_key);
    params.append("redirect_uri", redirect_uri);
    params.append("code", authCode);

    const response = await axios.post(access_token_url, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    return response.data.access_token;
  } catch (error) {
    console.error("Access Token Error:", error);
    throw new Error("액세스 토큰 발급 실패");
  }
};

export const getMemberWithAccessToken = async (accessToken) => {
  try {
    const response = await axios.get(`${API_SERVER_HOST}/api/member/kakao`, {
      params: { accessToken },
    });
    return response.data;
  } catch (error) {
    console.error("Member Info Error:", error);
    throw new Error("회원 정보 조회 실패");
  }
};

export const registerSocialMember = async (registerData) => {
  try {
    const response = await axios.post(
      `${API_SERVER_HOST}/api/member/social-register`,
      registerData
    );
    return response.data;
  } catch (error) {
    console.error("Social Register Error:", error);
    throw new Error(error.response?.data?.msg || "회원가입 실패");
  }
};

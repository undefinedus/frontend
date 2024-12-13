import axios from "axios";
import jwtAxios from "../../util/jwtUtil";
import { API_SERVER_HOST } from "../commonApi";

const host = `${API_SERVER_HOST}/api/myPage`;
const rest_api_key =
  import.meta.env.MODE === "development" // 실행 환경이
    ? import.meta.env.VITE_KAKAO_REST_API_KEY_LOCAL
    : import.meta.env.VITE_KAKAO_REST_API_KEY;
const redirect_uri = "http://localhost:5173/settings/redirect";
const client_secret =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_KAKAO_CLIENT_SECRET_LOCAL
    : import.meta.env.VITE_KAKAO_CLIENT_SECRET;
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";
const access_token_url = "https://kauth.kakao.com/oauth/token";

export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};

export const getMyInformation = async () => {
  const res = await jwtAxios.get(`${host}`);

  console.log("res at api: ", res);

  return res.data.data;
};

export const deleteProfileImage = async () => {
  const res = await jwtAxios.post(`${host}/profile/drop`);

  console.log("res at api: ", res);

  return res;
};

export const modifyProfile = async (data) => {
  console.log("data at api: ", data);

  const res = await jwtAxios.patch(`${host}/profile`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  console.log("res at api: ", res);

  return res.data.result;
};

export const modifyUserInfo = async (birth, gender) => {
  console.log("data at api: ", birth, ", ", gender);

  const res = await jwtAxios.patch(
    `${host}/userInfo?birth=${birth}&gender=${gender}`
  );

  console.log("res at api: ", res);

  return res.data.result;
};

export const modifyPreferences = async (data) => {
  console.log("data at api: ", data);

  const res = await jwtAxios.patch(`${host}/preferences`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("res at api: ", res);

  return res.data.result;
};

export const getKakaoTokens = async (authCode) => {
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

export const getMember = async (accessToken, refreshToken) => {
  const res = await axios.get(`${API_SERVER_HOST}/api/member/kakao`, {
    params: {
      accessToken: accessToken,
      refreshToken: refreshToken,
    },
  });
  console.log("res at api: ", res);
  return res.data;
};

export const socializeMember = async (data) => {
  console.log("data at api: ", data);

  const res = await jwtAxios.patch(`${host}/socialize`, data);

  console.log("res at api: ", res);

  return res;
};

export const checkKakaoMessagePermission = async () => {
  const res = await jwtAxios.get(`${host}/kakao/message`);

  console.log("res at api: ", res);

  return res;
};

export const modifyKakaoMessage = async () => {
  const res = await jwtAxios.post(`${host}/kakao/update`);

  console.log("res at api: ", res);

  return res;
};

export const modifyIsPublic = async () => {
  const res = await jwtAxios.post(`${host}/public`);

  console.log("res at api: ", res);

  return res;
};

export const unregister = async () => {
  const res = await jwtAxios.delete(`${host}`);

  console.log("res at api: ", res);

  return res;
};

export const checkPassword = async (data) => {
  console.log("data at api: ", data);

  const res = await jwtAxios.post(`${host}/checkPassword`, data);

  console.log("res at api: ", res);

  return res.data.data.password;
};

export const modifyPassword = async (data) => {
  console.log("data at api: ", data);

  const res = await jwtAxios.patch(`${host}/password`, data);

  console.log("res at api: ", res);

  return res.data.data.password;
};

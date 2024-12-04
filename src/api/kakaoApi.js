import axios from "axios";
import { API_SERVER_HOST } from "./commonApi";
import jwtAxios from "../util/jwtUtil";

const rest_api_key = '433f010a1fa5963afe5402f4fa79bbb4';
const redirect_uri = 'http://localhost:5173/member/kakao';
// 카카오 개발자 콘솔에서 Client Secret 값을 가져와야 합니다
const client_secret = 'TZRwcwKgGbDJh9NrqfQPHP9obzZULtNE';

const auth_code_path = 'https://kauth.kakao.com/oauth/authorize';
const access_token_url = 'https://kauth.kakao.com/oauth/token';

export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};

export const getToken = async (authCode) => {

  const header = {headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}}

  // URLSearchParams를 사용하여 파라미터를 form-data 형식으로 변환
  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('client_id', rest_api_key);
  params.append('client_secret', client_secret);  // client_secret 추가
  params.append('redirect_uri', redirect_uri);
  params.append('code', authCode);

  try {
    const res = await axios.post(access_token_url, params, header);

    console.log("tokens: ", res);

    return res.data; // 두 토큰 반환
  } catch (error) { 
    console.error('Token Error:', error.response?.data || error);
    throw error;
  }
}

export const getMemberWithToken = async (accessToken, refreshToken) => {
  try {
    const res = await axios.get(`${API_SERVER_HOST}/api/member/kakao`, {
      params: {
        accessToken: accessToken,  // 파라미터 이름을 정확히 일치시킴.
        refreshToken: refreshToken
      }
      
    });
    console.log("------------------",res);
    return res.data
  } catch (error) {
    console.error('Member API Error Response:', error.response?.data);
    throw error;
  }
}

// 책갈피 수신 여부
export const updateKakaoMessagePermission = async () => {
  try {
    const res = await jwtAxios.post(`${API_SERVER_HOST}/api/myPage/kakao/message`);

    console.log("Kakao Message Permission Updated:", res.data);
    alert('카카오 메시지 권한이 업데이트되었습니다.');
    return res.data;
  } catch (error) {
    console.error('Kakao Message Permission Update Error:', error.response?.data || error);
    alert('카카오 메시지 권한 업데이트 중 오류가 발생했습니다.');
    throw error;
  }
};

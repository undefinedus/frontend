import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  checkKakaoMessagePermission,
  getKakaoTokens,
  socializeMember,
  getMember,
} from "../../../api/settings/myPageApi";
import axios from "axios";

const SocializeRedirectPage = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState();
  const [state, setState] = useState();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");

    if (state) {
      setState(state);
      console.log("스테 이트: ", state);
    }
    if (code) {
      setCode(code);
      console.log("인증 코드: ", code);
    }
  }, []);

  useEffect(() => {
    if (code) controller();
  }, [code, state]);

  const controller = async () => {
    if (code) {
      const res = await getTokens();
      console.log("res::::", res);

      if (state) {
        console.log("메세지 권한");
        await checkKakaoMessagePermission();
      } else {
        console.log("카카오 연동");
        const result = await getUserInfo(res.access_token, res.refresh_token);
        console.log("result: ", result);
        const data = {
          kakaoAccessToken: res.access_token,
          kakaoRefreshToken: res.refresh_token,
          username: "kakao_" + result.id,
        };

        console.log("data to update: ", data);
        //const finalResult = await socializeMember(data);
        //console.log("finalResult: ", finalResult);
      }
    }
  };

  const getTokens = async () => {
    console.log("code::::", code);

    try {
      const res = await getKakaoTokens(code);
      console.log("res: ", res);
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const getUserInfo = async (accessToken, refreshToken) => {
    if (!code) {
      return;
    }

    console.log("accessToken: ", accessToken);
    console.log("refreshToken: ", refreshToken);

    try {
      const response = await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });

      // const response = await getMemberWithToken(accessToken, refreshToken);

      console.log("사용자 정보 응답:", response.data);
      return response.data; // 사용자 정보 반환
    } catch (error) {
      console.error("사용자 정보 요청 실패:", error.response?.data || error);
      throw error;
    }
  };

  return (
    <div>
      <p>카카오 인증 처리중...</p>
    </div>
  );
};

export default SocializeRedirectPage;

// api/member/authAPI.js
import axios from "axios";
import { API_SERVER_HOST } from "./commonApi";

const host = `${API_SERVER_HOST}/api/member`;

// 이메일 중복 체크
export const emailDuplicateCheck = async (username) => {
  try {
    const res = await axios.get(`${host}/login/username-check`, {
      params: { username },
    });

    if (res.data.result === "success") {
      return { result: true };
    } else {
      return {
        result: false,
        message: res.data.msg || "이메일 중복 검사 실패",
      };
    }
  } catch (err) {
    throw new Error("이메일 중복 검사 중 오류가 발생했습니다.");
  }
};

// 닉네임 중복 체크
export const nicknameDuplicateCheck = async (nickname) => {
  try {
    const res = await axios.get(`${host}/login/nickname-check`, {
      params: { nickname },
    });

    if (res.data.result === "success") {
      return { result: true };
    } else {
      return {
        result: false,
        message: res.data.msg || "닉네임 중복 검사 실패",
      };
    }
  } catch (err) {
    throw new Error("닉네임 중복 검사 중 오류가 발생했습니다.");
  }
};

// 인증 메일 발송
export const sendVerificationEmail = async (email) => {
  try {
    const res = await axios.post(`${host}/email/send-verification`, null, {
      params: { email },
    });

    return {
      result: res.data.result === "success",
      message: res.data.message,
    };
  } catch (err) {
    throw new Error("인증 메일 발송 중 오류가 발생했습니다.");
  }
};

export const registMember = async (registerData) => {
  try {
    const res = await axios.post(`${host}/register`, registerData);

    if (res.data.result === "success")
      return {
        result: true,
        member: res.data.member,
      };
    else {
      return {
        result: false,
        message: "회원가입에 실패 하였습니다. ㅋㅋ",
      };
    }
  } catch (err) {
    throw new Error("어딘가에서 치명적일 수? 도 있는 오류가 발생 했을지도?");
  }
};

// 인증번호 확인
export const verifyEmailCode = async (email, code) => {
  try {
    const res = await axios.post(`${host}/email/verify`, null, {
      params: { email, code },
    });

    return {
      result: res.data.status === "success",
      message: res.data.message,
    };
  } catch (err) {
    throw new Error("인증번호 확인 중 오류가 발생했습니다.");
  }
};

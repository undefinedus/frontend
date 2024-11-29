import axios from "axios";
import { API_SERVER_HOST } from "./commonApi";

const host = `${API_SERVER_HOST}/api/member`;

const handleResponse = (response, errorMessage) => {
  if (response.data.result === "success") {
    return { result: true, member: response.data.member };
  }
  return {
    result: false,
    message: response.data.msg || errorMessage,
  };
};

const handleError = (error, message) => {
  console.error(message, error);
  throw new Error(message);
};

// API functions
export const emailDuplicateCheck = async (username) => {
  try {
    const res = await axios.get(`${host}/login/username-check`, {
      params: { username },
    });
    return handleResponse(res, "이메일 중복 검사 실패");
  } catch (error) {
    handleError(error, "이메일 중복 검사 중 오류가 발생했습니다.");
  }
};

// 비밀번호 찾기용 이메일 체크
export const checkEmailExists = async (username) => {
  try {
    const res = await axios.get(`${host}/login/username-check`, {
      params: { username },
    });

    return {
      result: res.data.result === "error", // error면 true(회원있음), success면 false(회원없음)
      message:
        res.data.result === "error"
          ? "등록된 이메일입니다."
          : "등록되지 않은 이메일입니다.",
    };
  } catch (error) {
    handleError(error, "이메일 확인 중 오류가 발생했습니다.");
  }
};

export const nicknameDuplicateCheck = async (nickname) => {
  try {
    const res = await axios.get(`${host}/login/nickname-check`, {
      params: { nickname },
    });
    return handleResponse(res, "닉네임 중복 검사 실패");
  } catch (error) {
    handleError(error, "닉네임 중복 검사 중 오류가 발생했습니다.");
  }
};

export const sendVerificationEmail = async (email) => {
  try {
    const res = await axios.post(`${host}/email/send-verification`, null, {
      params: { email },
    });
    return {
      result: res.data.result === "success",
      message: res.data.message,
    };
  } catch (error) {
    handleError(error, "인증 메일 발송 중 오류가 발생했습니다.");
  }
};

export const registMember = async (registerData) => {
  try {
    const res = await axios.post(`${host}/register`, registerData);

    if (res.data.result === "success") {
      return {
        result: true,
        member: res.data.member,
      };
    }
    return {
      result: false,
      message: res.data.message || "회원가입에 실패했습니다.",
    };
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("회원가입 처리 중 오류가 발생했습니다.");
    }
  }
};

export const socialRegistMember = async (registerData) => {
  try {
    const res = await axios.post(`${host}/social-register`, registerData);
    if (res.data.result === "success") {
      return {
        result: true,
        member: res.data.member,
      };
    }
    return {
      result: false,
      message: res.data.message || "회원가입에 실패했습니다.",
    };
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("회원가입 처리 중 오류가 발생했습니다.");
    }
  }
}

export const verifyEmailCode = async (email, code) => {
  try {
    const res = await axios.post(`${host}/email/verify`, null, {
      params: { email, code },
    });
    return {
      result: res.data.status === "success",
      message: res.data.message,
    };
  } catch (error) {
    handleError(error, "인증번호 확인 중 오류가 발생했습니다.");
  }
};

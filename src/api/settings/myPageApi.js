import jwtAxios from "../../util/jwtUtil";
import { API_SERVER_HOST } from "../commonApi";

const host = `${API_SERVER_HOST}/api/myPage`;

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

  return res;
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

  const res = await jwtAxios.patch(`${host}/preferences`, data);

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

export const unregister = async () => {
  const res = await jwtAxios.delete(`${host}`);

  console.log("res at api: ", res);

  return res;
};

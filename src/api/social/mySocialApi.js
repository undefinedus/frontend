import { API_SERVER_HOST } from "../commonApi";
import jwtAxios from "../../util/jwtUtil";

// 내 소셜 API - SocialController
const host = `${API_SERVER_HOST}/api/social`;

// 내 소셜 프로필 정보
export const getMySocialInfo = async () => {
  try {
    const res = await jwtAxios.get(`${host}/myInfo`);
    return res.data;
  } catch (error) {
    console.error(error, "내 소셜 정보를 불러오는 데 실패하였습니다");
    throw new Error("서버에서 내 소셜 정보를 가져오는 중 오류가 발생했습니다.");
  }
};

// 내 소셜 - 모든 유저 검색
export const getSearchUserList = async (search = "") => {
  try {
    const res = await jwtAxios.get(`${host}/main/search`, {
      params: { search },
    });
    console.log("***res", res);

    return res;
  } catch (error) {
    console.error(error, "모든 유저 정보를 불러오는 데 실패하였습니다");
    throw new Error(
      "서버에서 모든 유저 정보를 가져오는 중 오류가 발생했습니다."
    );
  }
};

// 내 소셜 - 팔로워/팔로잉 목록
export const getMySocialList = async (tabCondition, search = "") => {
  try {
    const res = await jwtAxios.get(`${host}/follow/search`, {
      params: { tabCondition, search },
    });
    return res.data.data;
  } catch (error) {
    console.error(error, "팔로워, 팔로잉 목록을 불러오는 데 실패하였습니다");
    throw new Error(
      "서버에서 팔로워, 팔로잉 목록을 가져오는 중 오류가 발생했습니다."
    );
  }
};

// 팔로우 상태 변경
export const patchFollow = async (targetMemberId) => {
  try {
    const res = await jwtAxios.patch(`${host}/follow/${targetMemberId}`);
    console.log("******res", res);
    return res;
  } catch (error) {
    console.error(error, "팔로우 상태를 변경하는 데 실패하였습니다");
    throw new Error("서버에서 데이터를 가져오는 중 오류가 발생했습니다.");
  }
};

import { API_SERVER_HOST } from "../commonApi";
import jwtAxios from "../../util/jwtUtil";

// 소셜 책장 API - SocialController
const host = `${API_SERVER_HOST}/api/social`;

// 유저 소셜 책장 프로필 정보
export const getSocialInfo = async (targetMemberId) => {
  try {
    const res = await jwtAxios.get(`${host}/otherInfo/${targetMemberId}`);
    console.log("******res", res);
    return res.data.data;
  } catch (error) {
    console.error(error, "유저 소셜 정보를 불러오는 데 실패하였습니다");
    throw new Error(
      "서버에서 유저 소셜 정보를 가져오는 중 오류가 발생했습니다."
    );
  }
};

// 유저 소셜 책장 - 팔로워/팔로잉 목록
export const getSocialList = async (
  tabCondition,
  search = "",
  targetMemberId
) => {
  try {
    const res = await jwtAxios.get(`${host}/follow/search/${targetMemberId}`, {
      params: { tabCondition, search },
    });
    return res;
  } catch (error) {
    console.error(
      error,
      "유저 팔로워, 팔로잉 목록을 불러오는 데 실패하였습니다"
    );
    throw new Error(
      "서버에서 유저 팔로워, 팔로잉 목록을 가져오는 중 오류가 발생했습니다."
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

// 유저 소셜 책장 - 책 목록
export const getSocialBooks = async (
  tabCondition,
  search = "",
  targetMemberId
) => {
  try {
    const res = await jwtAxios.get(`${host}/other/books/${targetMemberId}`, {
      params: { tabCondition, search },
    });
    return res;
  } catch (error) {
    console.error(error, "소셜 책장 책 목록을 불러오는 데 실패하였습니다");
    throw new Error(
      "서버에서 소셜 책장 책 목록을 가져오는 중 오류가 발생했습니다."
    );
  }
};

// 유저 소셜 책장 - 책 상세
export const getSocialBook = async (tabCondition, search = "", myBookId) => {
  try {
    const res = await jwtAxios.get(
      `${host}/other/books/{targetMemberId}/${myBookId}`,
      {
        params: { tabCondition, search },
      }
    );
    return res;
  } catch (error) {
    console.error(error, "소셜 책장 책 상세 정보를 불러오는 데 실패하였습니다");
    throw new Error(
      "서버에서 소셜 책장 책 상세 정보를 가져오는 중 오류가 발생했습니다."
    );
  }
};

// 유저 소셜 책장 - 내 책장(읽고 싶은 책)에 책 담기
export const postSocialBook = async (
  tabCondition,
  search = "",
  targetMyBookId
) => {
  try {
    const res = await jwtAxios.post(
      `${host}/other/books/insert/${targetMyBookId}`,
      {
        params: { tabCondition, search },
      }
    );
    return res;
  } catch (error) {
    console.error(error, "소셜 책장 책담기를 불러오는 데 실패하였습니다");
    throw new Error(
      "서버에서 소셜 책장 책담기를 가져오는 중 오류가 발생했습니다."
    );
  }
};

// 유저 소셜 책장 - 책갈피 목록 및 상세
export const getSocialBookmarks = async (
  tabCondition,
  search = "",
  targetMemberId
) => {
  try {
    const res = await jwtAxios.get(
      `${host}/other/bookmarks/${targetMemberId}`,
      {
        params: { tabCondition, search },
      }
    );
    return res;
  } catch (error) {
    console.error(error, "소셜 책장 책갈피 목록을 불러오는 데 실패하였습니다");
    throw new Error(
      "서버에서 소셜 책장 책갈피 목록을 가져오는 중 오류가 발생했습니다."
    );
  }
};

// 유저 소셜 책장 - 내 책장(책갈피)에 담기
export const postSocialBookmark = async (targetBookmarkId) => {
  try {
    const res = await jwtAxios.post(
      `${host}/other/bookmarks/${targetBookmarkId}`,
      {
        params: { targetBookmarkId },
      }
    );
    return res;
  } catch (error) {
    console.error(error, "소셜 책장 책갈피 담기를 불러오는 데 실패하였습니다");
    throw new Error(
      "서버에서 소셜 책장 책갈피 담기를 가져오는 중 오류가 발생했습니다."
    );
  }
};

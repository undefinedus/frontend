import { API_SERVER_HOST } from "../commonApi";
import jwtAxios from "../../util/jwtUtil";

// 소셜 책장 API - SocialController
const host = `${API_SERVER_HOST}/api/social`;

// 유저 소셜 책장 프로필 정보
export const getSocialInfo = async (targetMemberId) => {
  const res = await jwtAxios.get(`${host}/otherInfo/${targetMemberId}`);
  return res.data.data;
};

// 유저 소셜 책장 - 팔로워/팔로잉 목록
export const getSocialList = async (
  targetMemberId,
  tabCondition,
  search = "",
  lastId = null
) => {
  let apiRoute = `${host}/follow/search/${targetMemberId}?tabCondition=${tabCondition}&search=${search}`;
  if (lastId) {
    apiRoute += `&lastId=${lastId}`;
  }
  const res = await jwtAxios.get(apiRoute);
  return res.data.data;
};

// 팔로우 상태 변경
export const patchFollow = async (targetMemberId) => {
  const res = await jwtAxios.patch(`${host}/follow/${targetMemberId}`);
  return res;
};

// 유저 소셜 책장 - 책 목록
export const getSocialBookList = async (
  targetMemberId,
  status,
  sort,
  search,
  lastId = null
) => {
  let apiRoute = `${host}/other/books/${targetMemberId}?status=${status}&sort=${sort}&search=${search}`;
  if (lastId) {
    apiRoute += `&lastId=${lastId}`;
  }
  const res = await jwtAxios.get(apiRoute);
  return res.data.data;
};

// 유저 소셜 책장 - 책 상세
export const getSocialBookDetail = async (targetMemberId, myBookId) => {
  const res = await jwtAxios.get(
    `${host}/other/books/${targetMemberId}/${myBookId}`
  );
  return res.data.data;
};

// 유저 소셜 책장 - 내 책장(읽고 싶은 책)에 책 담기
export const addSocialBookToMyBook = async (targetMyBookId) => {
  const res = await jwtAxios.post(
    `${host}/other/books/insert/${targetMyBookId}`
  );
  return res;
};

// 유저 소셜 책장 - 책갈피 목록 및 상세
export const getSocialBookmarkList = async (
  targetMemberId,
  search,
  sort,
  lastId = null
) => {
  let apiRoute = `${host}/other/bookmarks/${targetMemberId}?search=${search}&sort=${sort}`;
  if (lastId) {
    apiRoute += `&lastId=${lastId}`;
  }
  const res = await jwtAxios.get(apiRoute);
  return res.data.data;
};

// 유저 소셜 책장 - 내 책장(책갈피)에 담기
export const addSocialBookmarkToMyBook = async (targetBookmarkId) => {
  const res = await jwtAxios.post(
    `${host}/other/bookmarks/${targetBookmarkId}`
  );
  return res;
};

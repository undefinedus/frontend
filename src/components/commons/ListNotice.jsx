import React from "react";
import {
  PiBookOpenDuotone,
  PiWarningCircleDuotone,
  PiEyesFill,
  PiXCircleDuotone,
  PiChatCenteredSlash,
  PiChatCenteredSlashLight,
  PiBookmarksDuotone,
} from "react-icons/pi";

const ListNotice = ({ type }) => {
  const content = {
    noResult: {
      icon: <PiWarningCircleDuotone size={28} color="#51392F" />,
      message: "검색 결과가 없습니다",
    },
    noFollower: {
      icon: <PiWarningCircleDuotone size={28} color="#51392F" />,
      message: "팔로우하는 친구가 없어요",
    },
    noFollowing: {
      icon: <PiWarningCircleDuotone size={28} color="#51392F" />,
      message: "팔로잉하는 친구가 없어요",
    },
    emptyBook: {
      icon: <PiBookOpenDuotone size={32} color="#51392F" />,
      message: "책장이 비어 있어요",
    },
    emptyBookMark: {
      icon: <PiBookmarksDuotone size={32} color="#51392F" />,
      message: (
        <>
          책을 읽다 발견한 소중한 한 줄로
          <br />
          나만의 책갈피를 채워보세요
        </>
      ),
    },
    socialSearch: {
      icon: <PiEyesFill size={32} color="#51392F" />,
      message: "새로운 소셜 친구를 찾아 보세요",
    },
    noProposed: {
      icon: <PiXCircleDuotone size={32} color="#51392F" />,
      message: (
        <>
          아직 발의된 주제가 없어요
          <br />
          흥미로운 토론 주제를 발의해 보세요
        </>
      ),
    },
    noScheduled: {
      icon: <PiXCircleDuotone size={32} color="#51392F" />,
      message: (
        <>
          아직 채택된 토론이 없어요
          <br />
          흥미로운 토론 주제에 투표해 보세요
        </>
      ),
    },
    noInProgress: {
      icon: <PiXCircleDuotone size={32} color="#51392F" />,
      message: "아직 진행 중인 토론이 없어요",
    },
    noCompleted: {
      icon: <PiXCircleDuotone size={32} color="#51392F" />,
      message: "아직 종료된 토론이 없어요",
    },
    noBestComment: {
      icon: <PiChatCenteredSlashLight size={20} color="#51392F" />,
      message: "베스트 의견이 없어요",
    },
  };

  const { icon, message } = content[type] || {};
  console.log("******검색결과 타입:", type);

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <div className="flex justify-center">{icon}</div>
      <div className="flex justify-center text-und16 text-undpoint pt-1">
        {message}
      </div>
    </div>
  );
};

export default ListNotice;

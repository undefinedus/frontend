import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiArrowElbowDownRight, PiSiren, PiThumbsUpFill } from "react-icons/pi";
import useDateDiff from "../../hooks/useDateDiff";
import PortraitPlaceholder from "../commons/PortraitPlaceholder";
import useCustomLogin from "../../hooks/useCustomLogin.js";

// 토론 댓글 카드
const commentCard = ({
  forum,
  comment,
  onReply,
  isReplyActive,
  onClickReport,
  onClickLike,
  onClickDislike,
}) => {
  const { diffFromNow } = useDateDiff();
  const { loginState } = useCustomLogin();
  const [isAuthor, setIsAuthor] = useState(false); // 작성자 일치

  // 작성자와 로그인 유저 일치 여부
  useEffect(() => {
    setIsAuthor(comment.nickname === loginState.nickname);
  }, [comment, loginState]);

  // useEffect(() => {
  //   console.log("댓글", comment);
  //   // console.log(`forum, ${coment}`);
  //   // console.log(`댓글 작성 시간, ${coment.createTime}`);
  // }, [comment]);
  return (
    <div className="flex gap-2">
      {comment.parentId !== null && (
        <div className="flex-shrink-0">
          <PiArrowElbowDownRight size={24} color="#78716C" />
        </div>
      )}
      <div
        className={`flex flex-col w-full p-4 mb-4 border rounded-md gap-2 ${
          comment.voteType === "AGREE"
            ? "border-undagree bg-undagree/10"
            : comment.voteType === "DISAGREE"
            ? "border-unddisagree bg-unddisagree/10"
            : "border-unddisabled bg-transparent"
        }`}
      >
        {/* 프로필, 닉네임, 칭호, 신고, 몇분전 */}
        <div className="flex justify-between gap-2">
          {/* 프로필 사진 */}

          <div className="w-9 h-9 items-center flex-shrink-0 rounded-full overflow-hidden">
            {comment.profileImage &&
            comment.profileImage !== "defaultProfileImage.jpg" ? (
              <img
                src={comment.profileImage}
                alt={`${comment.nickname}의 프로필`}
                className="w-full h-full object-cover"
              />
            ) : (
              <PortraitPlaceholder iconSize={20} circleSize={9} />
            )}
          </div>
          {/* 닉네임, 칭호, 신고, 작성시간 */}
          <div className="flex flex-col w-full">
            <div className="flex w-full justify-between">
              <p className="text-und14 font-bold text-undtextdark">
                {comment.nickname}
              </p>
              <div className="flex gap-1.5 items-center text-und12 text-undtextgray">
                <p>{diffFromNow(comment.createTime)} 전</p>
                {comment.nickname !== "탈퇴한 회원" && !isAuthor && (
                  <PiSiren size={16} color="#D55636" onClick={onClickReport} />
                )}
              </div>
            </div>
            <p className="flex w-full justify-between text-und12 text-undtextgray">
              {comment.honorific}
            </p>
          </div>
        </div>
        <div className="flex text-und14 text-left gap-1">
          {comment?.parentNickname && (
            <p className="font-bold text-undtextgray">
              @{comment.parentNickname}
            </p>
          )}
          <p className="text-undtextdark">{comment.content}</p>
        </div>
        <div className="flex justify-between">
          {/* 좋아요 싫어요 */}
          <div className="flex gap-4 text-undtextgray text-und12 h-4 text-left">
            <div
              className="flex gap-0.5 justify-center items-center"
              onClick={onClickLike}
            >
              <PiThumbsUpFill size={18} color="A0CDDF" />
              {comment.like}
            </div>
            <div
              className="flex gap-0.5 justify-center items-center"
              onClick={onClickDislike}
            >
              <PiThumbsUpFill size={18} color="DFA0B5" />
              {comment.dislike}
            </div>
          </div>
          {/* 댓글 달기 */}
          {comment?.isSelected === false && forum?.status !== "COMPLETED" && (
            <p
              className="text-undtextgray font-bold text-und12"
              onClick={onReply} // 댓글 달기 핸들러 호출
            >
              {isReplyActive ? "작성 취소" : "의견 작성"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default commentCard;
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { PiArrowElbowDownRight, PiSiren, PiThumbsUpFill } from "react-icons/pi";
// import useDateDiff from "../../hooks/useDateDiff";
// import PortraitPlaceholder from "../commons/PortraitPlaceholder";
// import useCustomLogin from "../../hooks/useCustomLogin.js";

// // 토론 댓글 카드
// const commentCard = ({
//   forum,
//   comment,
//   onClickReport,
//   onClickLike,
//   onClickDislike,
// }) => {
//   const { diffFromNow } = useDateDiff();
//   const { loginState } = useCustomLogin();
//   const [isAuthor, setIsAuthor] = useState(false); // 작성자 일치

//   // 작성자와 로그인 유저 일치 여부
//   useEffect(() => {
//     setIsAuthor(comment.nickname === loginState.nickname);
//   }, [comment, loginState]);

//   // useEffect(() => {
//   //   console.log("댓글", comment);
//   //   // console.log(`forum, ${coment}`);
//   //   // console.log(`댓글 작성 시간, ${coment.createTime}`);
//   // }, [comment]);
//   return (
//     <div className="flex gap-2">
//       {comment.parentId !== null && (
//         <PiArrowElbowDownRight size={24} color="#78716C" />
//       )}
//       <div
//         className={`flex flex-col w-full p-4 mb-4 border rounded-md gap-2 ${
//           comment.voteType === "AGREE"
//             ? "border-undagree bg-undagree/10"
//             : comment.voteType === "DISAGREE"
//             ? "border-unddisagree bg-unddisagree/10"
//             : "border-unddisabled bg-transparent"
//         }`}
//       >
//         {/* 프로필, 닉네임, 칭호, 신고, 몇분전 */}
//         <div className="flex justify-between gap-2">
//           {/* 프로필 사진 */}

//           <div className="w-9 h-9 items-center flex-shrink-0 rounded-full overflow-hidden">
//             {comment.profileImage &&
//             comment.profileImage !== "defaultProfileImage.jpg" ? (
//               <img
//                 src={comment.profileImage}
//                 alt={`${comment.nickname}의 프로필`}
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <PortraitPlaceholder iconSize={20} circleSize={9} />
//             )}
//           </div>
//           {/* 닉네임, 칭호, 신고, 몇분전 */}
//           <div className="flex flex-col w-full">
//             <div className="flex w-full justify-between">
//               <p className="text-und14 font-bold text-undtextdark">
//                 {comment.nickname}
//               </p>
//               <div className="flex gap-1.5 items-center text-und12 text-undtextgray">
//                 <p>{diffFromNow(comment.createTime)} 전</p>
//                 {comment.nickname !== "탈퇴한 회원" && !isAuthor && (
//                   <PiSiren size={16} color="#D55636" onClick={onClickReport} />
//                 )}
//               </div>
//             </div>
//             <p className="flex w-full justify-between text-und12 text-undtextgray">
//               {comment.honorific}
//             </p>
//           </div>
//         </div>
//         <div className="flex text-und14 text-left gap-1">
//           {comment?.parentNickname && (
//             <p className="font-bold text-undtextgray">
//               @{comment.parentNickname}
//             </p>
//           )}
//           <p className="text-undtextdark">{comment.content}</p>
//         </div>
//         <div className="flex justify-between">
//           <div className="flex gap-4 text-undtextgray text-und12 h-4 text-left">
//             <div
//               className="flex gap-0.5 justify-center items-center"
//               onClick={onClickLike}
//             >
//               <PiThumbsUpFill size={18} color="A0CDDF" />
//               {comment.like}
//             </div>
//             <div
//               className="flex gap-0.5 justify-center items-center"
//               onClick={onClickDislike}
//             >
//               <PiThumbsUpFill size={18} color="DFA0B5" />
//               {comment.dislike}
//             </div>
//           </div>
//           {forum?.status !== "COMPLETED" && (
//             <p className="text-undtextgray font-bold text-und12">댓글 달기</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default commentCard;

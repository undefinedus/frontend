import React, { useState } from "react";
import TwoButtonModal from "../commons/TwoButtonModal";
import { PiCircle, PiRadioButtonFill } from "react-icons/pi";
import {
  addReportForum,
  addReportComment,
} from "../../../api/forum/forumReportApi";

const AddReportModal = ({ forum, comment, onCancel, refresh = null }) => {
  // 신고 사유 목록
  const reasons = [
    "욕설, 비방, 차별, 혐오",
    "홍보, 영리목적",
    "불법 정보",
    "음란, 청소년 유해",
    "개인정보 노출, 유포, 거래",
    "도배, 스팸",
  ];

  const forumId = forum?.discussionId;
  const commentId = comment?.commentId;
  const [selectedReason, setSelectedReason] = useState(""); // 선택된 사유 상태

  const handleReasonChange = (reason) => {
    setSelectedReason(reason);
  };

  // 토론글 신고 API
  const fetchReportForum = async () => {
    try {
      const res = await addReportForum(forumId, selectedReason);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  // 토론 댓글 신고 API
  const fetchReportComment = async () => {
    try {
      const res = await addReportComment(commentId, selectedReason);
      console.log("신고 res: ", res);

      return res;
    } catch (error) {
      console.log(error);
    }
  };

  // 토론 글 또는 댓글 신고 핸들러
  const handleReportSubmit = async () => {
    console.log("handleReportSubmit 실행됨");
    console.log("댓글ID", commentId);
    console.log("댓글ID", comment);
    console.log("신고 내용", selectedReason);

    try {
      let res;
      if (comment && commentId) {
        // 댓글 신고 API 호출
        res = await fetchReportComment(commentId, selectedReason);
      } else if (forumId) {
        // 토론글 신고 API 호출
        res = await fetchReportForum(forumId, selectedReason);
      } else {
        throw new Error("신고 대상을 찾을 수 없습니다."); // 예외 처리
      }
      if (refresh) refresh();
      onCancel(); // 모달 닫기
      return res;
    } catch (error) {
      console.error("신고 작성 실패:", error);
    }
  };

  return (
    <TwoButtonModal
      onCancel={onCancel}
      onConfirm={handleReportSubmit}
      confirmText="제출"
    >
      <div className="px-4">
        <h1 className="text-und20 font-bold pb-6 text-undclickbrown">
          신고하기
        </h1>
        <p className="text-und16 font-bold pb-2 text-undclickbrown text-left">
          신고 사유를 선택해 주세요
        </p>
        {reasons.map((reason, index) => (
          <label
            key={index}
            className="flex items-center gap-2 pb-2 text-und16 text-undtextdark cursor-pointer"
            onClick={() => handleReasonChange(reason)}
          >
            {selectedReason === reason ? (
              <PiRadioButtonFill color="78716C" />
            ) : (
              <PiCircle color="78716C" />
            )}
            <span>{reason}</span>
          </label>
        ))}
      </div>
    </TwoButtonModal>
  );
};

export default AddReportModal;

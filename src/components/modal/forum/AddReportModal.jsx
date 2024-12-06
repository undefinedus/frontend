import React, { useState } from "react";
import TwoButtonModal from "../commons/TwoButtonModal";
import { PiCircle, PiRadioButtonFill } from "react-icons/pi";
import { addReport } from "../../../api/forum/reportApi";

const AddReportModal = ({ forum, onCancel, onConfirm }) => {
  // 신고 사유 목록
  const reasons = [
    "욕설, 비방, 차별, 혐오",
    "홍보, 영리목적",
    "불법 정보",
    "음란, 청소년 유해",
    "개인정보 노출, 유포, 거래",
    "도배, 스팸",
  ];

  const [selectedReason, setSelectedReason] = useState(""); // 선택된 사유 상태
  const [customReason, setCustomReason] = useState(""); // 기타 입력값 상태

  const handleReasonChange = (reason) => {
    setSelectedReason(reason);
    if (reason !== "기타") {
      setCustomReason(""); // "기타" 외에는 입력값 초기화
    }
  };

  const handleCustomReasonChange = (event) => {
    setCustomReason(event.target.value);
  };

  // const fetchAddReport = async () => {
  //   const reportData = {
  //     ReportRequestDTO: {
  //       reportedId: forum.isbn13, // 신고당한 사람 id
  //       targetType: "DISCUSSION", // DISCUSSION / COMMENT
  //       reason: selectedReason, //신고 사유
  //       discussionId: forum.link, //토론/댓글 id 둘 중 하나 입력 시, 나머지 하나는 null값
  //       commentId: null,
  //     },
  //     // bookStatusRequestDTO: bookInput,
  //   };

  //   try {
  //     // 성공 토스트메세지
  //     const res = await addReport(reportData);
  //     console.log(res);
  //     if (res.data.result === "success") onClose();
  //     return "success";
  //   } catch (err) {
  //     console.error(err);
  //     // 실패 토스트메세지
  //     return "error";
  //   }
  // };

  return (
    <TwoButtonModal
      onCancel={onCancel}
      onConfirm={() =>
        onConfirm(selectedReason === "기타" ? customReason : selectedReason)
      }
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

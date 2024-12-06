import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import { PrevTitle } from "../../layouts/TopLayout";
import Button from "../../components/commons/Button";
import {
  getReportDetail,
  rejectReport,
  approvalReport,
} from "../../api/settings/reportApi";
import TwoButtonModal from "../../components/modal/commons/TwoButtonModal";

function ReportDetailPage() {
  const { id } = useParams();
  const [reportDetail, setReportDetail] = useState(null);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [reasonStatus, setReasonStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReportDetail = async () => {
      try {
        const res = await getReportDetail(id);
        setReportDetail(res.data);
        updateStatus(res.data);
      } catch (error) {
        console.error("신고 상세 정보 조회 실패 :", error);
      }
    };

    if (id) {
      fetchReportDetail();
    }
  }, [id]);

  const updateStatus = (report) => {
    if (report.status === "PENDING") {
      setStatus("미처리");
    } else if (report.status === "ACCEPTED") {
      setStatus("승인됨");
    } else if (report.status === "REJECTED") {
      setStatus("거절됨");
    } else if (report.status === "TEMPORARY_ACCEPTED") {
      setStatus("관리자 확인 필요");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const reportFields = [
    { label: "ID", value: reportDetail?.id },
    { label: "신고 종류", value: reportDetail?.reportReason },
    { label: "신고자", value: reportDetail?.reporterNickname },
    { label: "피신고자", value: reportDetail?.reportedNickname },
    { label: "신고 일자", value: reportDetail?.reportTime, format: formatDate },
    {
      label: "신고 형태",
      value: reportDetail?.targetType,
      format: (type) => (type === "DISCUSSION" ? "게시물" : "댓글"),
    },
  ];

  const commonStyles = {
    container: "flex items-center justify-between w-full",
    label: "flex flex-col items-center",
    value:
      "border border-undtextdark text-undtextgray bg-white rounded-full w-52 h-11 flex flex-col items-center justify-center",
  };

  if (!reportDetail) {
    return <div>Loading...</div>;
  }

  const handleApprovalModalOpen = () => {
    setIsApprovalModalOpen(true);
  };

  const handleRejectModalOpen = () => {
    setIsRejectModalOpen(true);
  };

  const handleReject = async () => {
    try {
      await rejectReport(id);
      navigate("/admin/report");
    } catch (error) {
      alert("신고 반려 처리중 오류가 발생하였습니다.");
      console.error(error);
    }
  };

  const handleApproval = async () => {
    try {
      await approvalReport(id);
      navigate("/admin/report");
    } catch (error) {
      alert("신고 승인 처리중 오류가 발생하였습니다.");
      console.error(error);
    }
  };

  return (
    <BasicLayout>
      <PrevTitle
        title="신고 상세"
        showLine={false}
        onClick={() => navigate(-1)}
      />
      <div className="flex flex-col gap-4 px-8 pb-20">
        <div className="flex flex-col gap-5">
          {reportDetail.status !== "PENDING" && (
            <div className={commonStyles.container}>
              <div className={commonStyles.label}>처리 상태</div>
              <div className={commonStyles.value}>{status}</div>
            </div>
          )}
          {reportFields.map((field, index) => (
            <div key={index} className={commonStyles.container}>
              <div className={commonStyles.label}>{field.label}</div>
              <div className={commonStyles.value}>
                {field.format ? field.format(field.value) : field.value}
              </div>
            </div>
          ))}
          {reportDetail.targetType === "DISCUSSION" && (
            <div className="flex flex-col items-start justify-between w-full gap-1">
              <div className={commonStyles.label}>발의글 제목</div>
              <div className="border border-undtextdark text-undtextgray bg-white rounded-lg w-full h-auto flex flex-col items-start justify-start text-start py-3 px-4">
                {reportDetail.discussionTitle}
              </div>
            </div>
          )}
          <div className="flex flex-col gap-1">
            <div className="flex justify-start">{`${
              reportDetail.targetType === "DISCUSSION"
                ? "발의글 내용"
                : "댓글 내용"
            }`}</div>
            <div className="text-start p-5 border border-undtextdark rounded-lg text-undtextgray bg-white">
              {`${
                reportDetail.targetType === "DISCUSSION"
                  ? reportDetail.discussionContent
                  : reportDetail.commentContent
              }`}
            </div>
          </div>
        </div>

        {(reportDetail.status === "TEMPORARY_ACCEPTED" ||
          reportDetail.status === "PENDING") && (
          <div className="flex w-full h-12 gap-3.5">
            <Button
              className="w-full rounded-lg cursor-pointer"
              color="unddisabled"
              onClick={handleRejectModalOpen}
            >
              반려
            </Button>
            <Button
              className="w-full rounded-lg cursor-pointer"
              color="undpoint"
              onClick={handleApprovalModalOpen}
            >
              승인
            </Button>
          </div>
        )}

        {isApprovalModalOpen && (
          <TwoButtonModal
            onCancel={() => setIsApprovalModalOpen(false)}
            onConfirm={handleApproval}
          >
            해당 신고글을 승인하시겠습니까?
          </TwoButtonModal>
        )}
        {isRejectModalOpen && (
          <TwoButtonModal
            onCancel={() => setIsRejectModalOpen(false)}
            onConfirm={handleReject}
          >
            해당 신고글을 반려하시겠습니까?
          </TwoButtonModal>
        )}
      </div>
    </BasicLayout>
  );
}

export default ReportDetailPage;

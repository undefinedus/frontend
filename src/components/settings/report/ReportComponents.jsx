import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { PiProhibit, PiCheckCircle } from "react-icons/pi";

function ReportComponents({ reports = [] }) {
  const navigate = useNavigate();

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

  const handleReportClick = (reportId) => {
    navigate(`/admin/report/${reportId}`);
  };

  if (!reports || reports.length === 0) {
    return (
      <div className="flex justify-center items-center py-10 text-undtextgray">
        신고 내역이 없습니다.
      </div>
    );
  }

  // const variants = {
  //   initial: (index) => ({
  //     opacity: 0,
  //     x: index % 2 === 0 ? -20 : 20, // x 이동 거리 감소
  //     y: 10, // y 이동 거리 감소
  //   }),
  //   animate: {
  //     opacity: 1,
  //     x: 0,
  //     y: 0,
  //   },
  //   exit: {
  //     opacity: 0,
  //     y: -10, // exit 시 위로 살짝 이동
  //   },
  // };

  // 애니메이션 효과 O
  // return (
  //   <div className="flex flex-col gap-4">
  //     <AnimatePresence mode="wait">
  //       {reports.map((report, index) => (
  //         <motion.div
  //           key={report.id}
  //           variants={variants}
  //           initial="initial"
  //           animate="animate"
  //           exit="exit"
  //           custom={index}
  //           transition={{
  //             type: "spring",
  //             stiffness: 200, // 스프링 강도 증가
  //             damping: 20, // 감쇠 추가
  //             delay: index * 0.05, // 딜레이 시간 감소
  //           }}
  //           onClick={() => handleReportClick(report.id)}
  //           className="cursor-pointer hover:opacity-80 transition-opacity"
  //         >
  //           <div className="bg-undbgsub flex flex-col gap-6 items-start p-4 rounded-md">
  //             <div className="flex justify-between w-full flex-col gap-1">
  //               <div className="flex justify-between gap-1 text-sm">
  //                 <div className="font-bold">
  //                   {index + 1}. {report.reportReason}
  //                 </div>
  //                 <div className="font-bold">{report.id}</div>
  //               </div>
  //               <div className="text-undtextgray text-xs flex flex-col items-start">
  //                 신고자 : {report.reporterNickname}
  //               </div>
  //               <div className="text-undtextgray text-xs flex flex-col items-start">
  //                 피신고자 : {report.reportedNickname}
  //               </div>
  //             </div>
  //             <div className="text-undtextgray text-sm flex flex-col items-start gap-1">
  //               <div>
  //                 {report.targetType === "DISCUSSION" ? "게시물" : "댓글"}
  //               </div>
  //               <div>{formatDate(report.reportTime)}</div>
  //             </div>
  //           </div>
  //           {reports.indexOf(report) !== reports.length - 1 && (
  //             <motion.div
  //               className="border-t-2 mt-4"
  //               initial={{ scaleX: 0 }}
  //               animate={{ scaleX: 1 }}
  //               transition={{ duration: 0.2 }} // 구분선 애니메이션 시간 감소
  //             />
  //           )}
  //         </motion.div>
  //       ))}
  //     </AnimatePresence>
  //   </div>
  // );

  // 애니메이션 효과 X
  return (
    <div className="flex flex-col gap-4">
      {reports.map((report, index) => (
        <div
          key={report.id}
          onClick={() => handleReportClick(report.id)}
          className="cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="bg-undbgsub flex flex-col gap-6 items-start p-4 rounded-md">
            <div className="flex justify-between w-full flex-col gap-1">
              <div className="flex justify-between gap-1 text-sm">
                <div className="font-bold">
                  {index + 1}. {report.reportReason}
                </div>
                <div className="font-bold">{report.id}</div>
              </div>
              <div className="text-undtextgray text-xs flex flex-col items-start">
                신고자 : {report.reporterNickname}
              </div>
              <div className="text-undtextgray text-xs flex flex-col items-start">
                피신고자 : {report.reportedNickname}
              </div>
            </div>
            <div className="text-undtextgray text-sm flex flex-col items-start gap-1 w-full">
              <div>
                {report.targetType === "DISCUSSION" ? "게시물" : "댓글"}
              </div>
              <div className="flex justify-between w-full">
                <div>{formatDate(report.reportTime)}</div>
                {report.status === "REJECTED" && (
                  <div className="flex gap-1 items-center">
                    <PiProhibit size={20} color="#d55636" />
                    <div>반려</div>
                  </div>
                )}
                {report.status === "ACCEPTED" && (
                  <div className="flex gap-1 items-center">
                    <PiCheckCircle size={20} color="#07BE60" />
                    <div>승인</div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {reports.indexOf(report) !== reports.length - 1 && (
            <div className="border-t-2 mt-4" />
          )}
        </div>
      ))}
    </div>
  );
}

export default ReportComponents;

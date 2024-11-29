import React, { useEffect, useState } from "react";
import useDateDiff from "../../hooks/useDateDiff";
import PercentageBar from "../commons/PercentageBar";
import { PiStar, PiStarFill } from "react-icons/pi";
import DrawMyRating from "./DrawMyRating";

const BookCustomInformation = ({ book }) => {
  const [ratingList, setRatingList] = useState([]);
  const {
    status,
    startDate,
    endDate,
    currentPage,
    itemPage,
    myRating,
    oneLineReview,
    updateCount,
  } = book;

  const { diffToday, diffEnd } = useDateDiff();

  return (
    <div className="flex flex-col justify-center gap-4">
      {/* 독서 기간 출력 */}
      <div className="w-full flex flex-col">
        <div
          className={`flex ${
            status !== "STOPPED" ? "justify-between" : "justify-start"
          }`}
        >
          <p className="text-und16 text-undtextdark font-bold">독서 기간</p>
          {status !== "STOPPED" && (
            <p className="w-1/2 flex justify-center text-und14 text-undtextgray rounded-s-full rounded-e-full bg-undbgsub">
              {status === "COMPLETED"
                ? diffEnd(startDate, endDate)
                : diffToday(startDate)}
              {"일 동안"}
              {status === "READING" && ` ${updateCount}번`}
              {" 읽었어요"}
            </p>
          )}
        </div>
        <div className={`flex ${status !== "READING" && "gap-5"} mt-2.5`}>
          <div
            className={`flex ${
              status !== "READING"
                ? "flex-col w-1/2 gap-1"
                : "justify-between w-full"
            } items-center`}
          >
            <div
              className={`${
                status !== "READING" ? "w-full" : "w-1/2"
              } flex justify-start text-und14 text-undtextgray font-bold`}
            >
              시작일
            </div>
            <div
              className={`${
                status !== "READING" ? "w-full mt-1" : "w-1/2"
              } flex justify-center text-und14 text-undtextgray rounded-s-full rounded-e-full bg-undbgsub`}
            >
              {startDate}
            </div>
          </div>
          {status !== "READING" && (
            <div className={`flex flex-col w-1/2 gap-1`}>
              <div className="w-full flex justify-start text-und14 text-undtextgray font-bold">
                {status === "COMPLETED" ? "종료일" : "중단일"}
              </div>
              <div className="w-full mt-1 flex justify-center text-und14 text-undtextgray rounded-s-full rounded-e-full bg-undbgsub">
                {endDate}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 페이지 출력 */}
      {(status === "READING" || status === "STOPPED") && (
        <div
          className={`${
            status === "STOPPED"
              ? "flex justify-between items-center"
              : "flex flex-col"
          } w-full`}
        >
          <div className="flex justify-start text-und16 text-undtextdark font-bold">
            {status === "STOPPED" ? "중단한 페이지" : "읽은 페이지 수"}
          </div>
          {status === "READING" && (
            <div className="flex justify-between items-center gap-2.5 mt-2.5">
              <div className="w-full">
                <PercentageBar
                  hasInner={false}
                  leftValue={Math.floor(
                    ((currentPage === "" ? 0 : currentPage) / itemPage) * 100
                  )}
                />
              </div>
              <div className="text-und14 text-undpoint">{`${Math.floor(
                ((currentPage === "" ? 0 : currentPage) / itemPage) * 100
              )}%`}</div>
            </div>
          )}

          <div
            className={`flex items-center ${status === "READING" && "mt-1"}`}
          >
            <div className="w-16 h-6 text-center text-und14 text-undtextgray rounded-s-full rounded-e-full bg-undbgsub">
              {currentPage}
            </div>

            <div className="text-und14 text-undtextgray">/ {itemPage} 쪽</div>
          </div>
        </div>
      )}

      {/* 별점 출력 */}
      {status === "COMPLETED" && (
        <div className="w-full flex items-center justify-between">
          <div className="text-und16 text-undtextdark font-bold">별점</div>

          <div className="flex w-32 justify-between">
            <DrawMyRating myRating={myRating} />
          </div>
        </div>
      )}

      {(status === "COMPLETED" || status === "STOPPED") && (
        <div className="w-full flex flex-col items-center justify-center gap-2.5">
          <div className="w-full flex items-center justify-between">
            <div className="text-und16 text-undtextdark font-bold">
              한 줄 평
            </div>
            <div className="text-und14 text-undtextgray font-bold">{`(${
              oneLineReview?.length || 0
            }/${100}자)`}</div>
          </div>
          <div className="w-full">
            <div
              className={`w-full bg-undbgsub rounded-xl whitespace-pre-wrap text-center snap-center content-center p-3 text-undtextgray ${
                oneLineReview && "text-start"
              }`}
            >
              {oneLineReview === "" ? "한 줄 평이 없어요" : oneLineReview}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookCustomInformation;

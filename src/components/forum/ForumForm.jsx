import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/commons/Button";
import DatePickerSlider from "../../components/commons/DatePickerSlider";
import TimePickerSlider from "../../components/commons/TimePickerSlider";
import ResizableTextarea from "../../components/forum/ResizableTextarea";

const ForumForm = ({ onSubmit, children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [bookTitle, setBookTitle] = useState(""); // 책 제목 길이
  const [subjectText, setSubjectText] = useState(""); // 제목 길이
  const [contentText, setContentText] = useState(""); // 내용 길이

  const [date, setDate] = useState("일자 선택"); // 선택된 날짜
  const [time, setTime] = useState("시간 선택"); // 선택된 시간
  const [minDate, setMinDate] = useState(); // 최소 일시
  const [maxDate, setMaxDate] = useState(); // 최대 일시

  const now = new Date();

  const bookTitleRef = useRef(null); // 책제목 textarea
  const { book } = location.state || {}; // 검색한 책
  // 현재 시간을 기준으로 24시간 후와 7일 후 계산(최소일, 최대일)
  const getFormattedDate = (hoursToAdd) => {
    const futureDate = new Date();
    futureDate.setHours(futureDate.getHours() + hoursToAdd);
    const year = futureDate.getFullYear();
    const month = String(futureDate.getMonth() + 1).padStart(2, "0");
    const day = String(futureDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 최초 렌더링시 현재시간 기준으로 minDate, maxDate 의 날짜정보 setting
  useEffect(() => {
    const now = new Date();

    // 현재 시간 기준 24시간 후
    const min = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    // 현재 시간 기준 168시간(7일) 후
    const max = new Date(now.getTime() + 168 * 60 * 60 * 1000);
    setMinDate(min);
    setMaxDate(max);
    setTime("시간 선택");
  }, [date]);

  useEffect(() => {
    if (date === "일자 선택") {
      return; // 일자가 선택되지 않았다면 설정하지 않음
    }

    // // const selectedDate = new Date(date.replace(/\./g, "-"));
    // const minDateObj = new Date(minDate.replace(/\./g, "-"));
    // const maxDateObj = new Date(maxDate.replace(/\./g, "-"));

    const isMinDate = new Date(date).getDate() === minDate.getDate();
    const isMaxDate = new Date(date).getDate() === maxDate.getDate();
    // console.log("민데이트, 맥스데이트", isMinDate, isMaxDate);

    if (!isMinDate) {
      setMinDate((date) => {
        const updatedDate = new Date(date);
        updatedDate.setHours(0, 0, 0, 0); // 시간 부분을 00:00:00으로 변경
        return updatedDate;
      });
    }
    if (!isMaxDate) {
      setMaxDate((date) => {
        const updatedDate = new Date(date);
        updatedDate.setHours(23, 59, 59, 99); // 시간 부분을 23:59:59:99으로 변경
        return updatedDate;
      });
    }
  }, [date]);

  // 현재 시간을 기준으로 24시간 후와 7일 후 계산
  const getFormattedTime = (hoursToAdd) => {
    const futureDate = new Date();
    futureDate.setHours(futureDate.getHours() + hoursToAdd);
    const hours = String(futureDate.getHours()).padStart(2, "0");
    const minutes = String(
      Math.floor(futureDate.getMinutes() / 30) * 30
    ).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // 날짜 포맷 변환 함수
  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  // 시간 포맷 변환 함수
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  };

  // 책 제목 입력 클릭 핸들러
  const handleBookTitleClick = () => {
    navigate("/forum/propose/searchBook", {
      state: {
        title: "발의할 책 추가",
        prevActiveTab: "",
        pathname: "/forum/propose/write",
      },
    });
  };

  const handleOnSubmit = () => {
    const startDate = date + "T" + time;

    onSubmit(book.isbn13, subjectText, contentText, startDate);
  };

  return (
    <div>
      <div className="flex flex-col w-full h-full px-6 pt-20 pb-20 gap-4">
        {/* 책 제목 */}
        <div className="flex flex-col text-left justify-start gap-1">
          <p className="text-und16 font-bold text-undtextdark">책 제목</p>
          <div
            ref={bookTitleRef}
            className="w-full border border-unddisabled rounded-[10px] p-4 text-und14 text-left cursor-pointer bg-white text-undtextdark"
            style={{ overflow: "hidden", minHeight: "54.6px" }}
            onClick={handleBookTitleClick}
          >
            {book?.title}
          </div>
        </div>
        {/* 발의 주제 */}
        <ResizableTextarea
          label="발의 주제"
          value={subjectText}
          onChange={(e) => setSubjectText(e.target.value)}
          maxLength={100}
          rows={1} // 기본 행 수
          disabled={!book?.title} // book?.title 값이 없으면 비활성화
        />
        {/* 발의 내용 */}
        <ResizableTextarea
          label="발의 내용"
          value={contentText}
          onChange={(e) => setContentText(e.target.value)}
          maxLength={1500}
          rows={20} // 기본 행 수
          disabled={!subjectText}
        />
        {/* 토론 예정 시간 */}
        <div className="flex flex-col text-left justify-start gap-1">
          <p className="text-und16 font-bold text-undtextdark">
            토론 예정 시간
          </p>
          <p className="text-und12 font-bold text-undtextgray whitespace-pre-line">
            토론 예정일은 작성일 24시간 이후~7일 이내,{"\n"}토론 예정 시간은
            30분 간격으로 선택 가능합니다
          </p>
          <div className="flex justify-between items-center gap-4">
            {/* DatePickerSlider */}
            <DatePickerSlider
              date={date}
              setDate={(selectedDate) => {
                // console.log("SelectedDate", selectedDate);

                setDate(selectedDate); // 날짜 업데이트
              }}
              minDate={minDate}
              maxDate={maxDate}
              disabled={!contentText}
            >
              <div
                className={`flex w-full h-12 p-2 justify-center text-und14 border border-unddisabled rounded-[10px] items-center bg-white ${
                  date === "일자 선택" ? "text-undtextgray" : "text-undtextdark"
                }`}
              >
                {date === "일자 선택" ? "일자 선택" : date}
              </div>
            </DatePickerSlider>
            {/* TimePickerSlider */}
            <div
              className={`flex w-full h-12 p-2 justify-center text-und14 border border-unddisabled rounded-[10px] items-center bg-white ${
                date === "일자 선택"
                  ? "cursor-not-allowed pointer-events-none"
                  : ""
              }`}
              onClick={(e) => {
                if (date === "일자 선택") {
                  e.preventDefault(); // 클릭 이벤트 차단
                }
              }}
            >
              <TimePickerSlider
                time={date}
                setTime={(selectedTime) => {
                  setTime(formatTime(selectedTime)); // 시간 업데이트
                }}
                minTime={minDate}
                maxTime={maxDate}
                disabled={date === "일자 선택"} // 추가적인 보호
              >
                <div
                  className={`flex w-full h-12 p-2 justify-center items-center ${
                    time === "시간 선택"
                      ? "text-undtextgray"
                      : "text-undtextdark"
                  }`}
                >
                  {time}
                </div>
              </TimePickerSlider>
            </div>
          </div>
        </div>
        {/* 제출 버튼 */}
        <Button
          className="py-2.5 rounded-full font-bold text-und18 w-full"
          color={time === "시간 선택" ? "unddisabled" : "undpoint"}
          onClick={time !== "시간 선택" ? handleOnSubmit : undefined}
          buttonDisabled={time === "시간 선택"}
        >
          {children}
        </Button>
      </div>
    </div>
  );
};

export default ForumForm;

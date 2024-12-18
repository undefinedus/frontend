import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/commons/Button";
import DatePickerSlider from "../../components/commons/DatePickerSlider";
import TimePickerSlider from "../../components/commons/TimePickerSlider";
import ResizableTextarea from "../../components/forum/ResizableTextarea";

const ForumForm = ({ forum, onSubmit, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const now = new Date();

  const bookTitleRef = useRef(null); // 책제목 textarea
  const { book } = location.state || {}; // 검색한 책

  const [bookTitle, setBookTitle] = useState(
    forum?.bookTitle || book?.title || ""
  ); // 책 제목 길이
  const [subject, setSubject] = useState(forum?.title || ""); // 제목 길이
  const [content, setContent] = useState(forum?.content || ""); // 내용 길이

  // const [date, setDate] = useState("일자 선택"); // 선택된 날짜
  // const [time, setTime] = useState("시간 선택"); // 선택된 시간
  const [date, setDate] = useState(
    forum?.startDate?.split("T")[0] || "일자 선택"
  ); // 선택된 날짜
  const [time, setTime] = useState(
    forum?.startDate?.split("T")[1]?.slice(0, 5) || "시간 선택"
  ); // 선택된 시간
  const [minDate, setMinDate] = useState(); // 최소 일시
  const [maxDate, setMaxDate] = useState(); // 최대 일시

  const [isModified, setIsModified] = useState(false); // 수정 여부 상태

  // 초기값 저장
  const initialSubject = useRef(forum?.title || "");
  const initialContent = useRef(forum?.content || "");
  const initialDate = useRef(forum?.startDate?.split("T")[0] || "일자 선택");
  const initialTime = useRef(
    forum?.startDate?.split("T")[1]?.slice(0, 5) || "시간 선택"
  );

  // (글 수정)기존값 변경 여부 확인 후 버튼 활성화
  useEffect(() => {
    const hasChanged =
      subject !== initialSubject.current ||
      content !== initialContent.current ||
      date !== initialDate.current ||
      time !== initialTime.current;

    setIsModified(hasChanged); // 변경 여부 업데이트
  }, [subject, content, date, time]);

  // 작성 또는 수정 버튼 클릭
  const handleOnSubmit = () => {
    const startDate = date + "T" + time;
    if (!forum) {
      onSubmit(book.isbn13, subject, content, startDate);
    } else onSubmit(forum.id, subject, content, startDate);
  };

  // (글 수정)토론 예정 일시 기존 값 설정
  useEffect(() => {
    if (forum?.startDate) {
      console.log(time);
      console.log(forum.startDate.split("T")[1].slice(0, 5));

      setDate(forum.startDate.split("T")[0]); // 날짜 부분만 설정
      setTime(forum.startDate.split("T")[1].slice(0, 5)); // 시간 부분만 설정
    }
  }, [forum]);

  // (글 작성) 최초 렌더링시 현재시간 기준으로 minDate, maxDate 의 날짜정보 setting
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

  // (글 작성)
  useEffect(() => {
    console.log("시간선택 유즈이펙트 진입");
    console.log("minDate: ", minDate);
    console.log("maxDate: ", maxDate);
    console.log("date: ", date);

    if (date === "일자 선택") {
      return; // 일자가 선택되지 않았다면 설정하지 않음
    }

    if (minDate && maxDate) {
      const isMinDate = new Date(date).getDate() === minDate.getDate();
      const isMaxDate = new Date(date).getDate() === maxDate.getDate();

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

      console.log("minDate: ", minDate);
      console.log("maxDate: ", maxDate);
    }
  }, [date]);

  // 일자 - 현재 시간을 기준으로 24시간 후와 7일 후 계산(최소일, 최대일)
  const getFormattedDate = (hoursToAdd) => {
    const futureDate = new Date();
    futureDate.setHours(futureDate.getHours() + hoursToAdd);
    const year = futureDate.getFullYear();
    const month = String(futureDate.getMonth() + 1).padStart(2, "0");
    const day = String(futureDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 시간 - 현재 시간을 기준으로 24시간 후와 7일 후 계산
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
        prevActiveTab: "주제 발의",
        pathname: "/forum/propose/write",
        book: "",
      },
    });
  };

  const handleModal = (boolean) => {
    if (boolean) {
      // 스크롤을 최하단으로 이동
      window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" });

      // 스크롤 막기
      document.body.style.overflow = "hidden";
      document.body.style.height = "auto";
    } else {
      // 스크롤 복구
      document.body.style.overflow = "auto";
    }
  };

  return (
    <div>
      <div className="flex flex-col w-full h-full px-6 pt-20 pb-20 gap-4">
        {/* 책 제목 */}
        <div className="flex flex-col text-left justify-start gap-1">
          <p className="text-und16 font-bold text-undtextdark">책 제목</p>
          <div
            ref={bookTitleRef}
            // className="w-full border border-unddisabled rounded-[10px] p-4 text-und14 text-left cursor-pointer bg-white text-undtextdark"
            className={`w-full border rounded-[10px] p-4 text-und14 text-left bg-white ${
              forum?.bookTitle === bookTitle
                ? "cursor-not-allowed text-undtextgray bg-[#F9F8F7]" // 비활성화 스타일
                : "cursor-pointer text-undtextdark" // 활성화 스타일
            }`}
            style={{ overflow: "hidden", minHeight: "54.6px" }}
            onClick={
              forum?.bookTitle !== bookTitle ? handleBookTitleClick : null
            }
          >
            {bookTitle}
          </div>
        </div>
        {/* 발의 주제 */}
        <ResizableTextarea
          label="발의 주제"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          maxLength={100}
          rows={1} // 기본 행 수
          disabled={!bookTitle}
        />
        {/* 발의 내용 */}
        <ResizableTextarea
          label="발의 내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={1500}
          rows={20} // 기본 행 수
          disabled={!subject}
        />
        {/* 토론 예정 시간 */}
        <div className="flex flex-col text-left justify-start gap-1">
          <p className="text-und16 font-bold text-undtextdark">
            토론 예정 시간
          </p>
          <p className="text-und12 font-bold text-undtextgray whitespace-pre-line">
            작성일 기준으로 다음 날부터 7일 이내까지 선택 가능합니다
          </p>
          <div className="flex justify-between items-center gap-4">
            <DatePickerSlider
              date={date}
              setDate={(selectedDate) => {
                // console.log("SelectedDate", selectedDate);

                setDate(selectedDate); // 날짜 업데이트
              }}
              minDate={minDate}
              maxDate={maxDate}
              disabled={!content}
              setModalOpen={handleModal}
            >
              <div
                className={`flex w-full h-12 p-2 justify-center text-und14 border border-unddisabled rounded-[10px] items-center bg-white ${
                  date === "일자 선택" && !content
                    ? "text-undtextgray bg-[#F9F8F7]"
                    : "text-undtextdark"
                }`}
              >
                {date === "일자 선택" ? "일자 선택" : date}
              </div>
            </DatePickerSlider>
            <TimePickerSlider
              time={date}
              setTime={(selectedTime) => {
                setTime(formatTime(selectedTime)); // 시간 업데이트
              }}
              minTime={minDate}
              maxTime={maxDate}
              disabled={date === "일자 선택"} // 추가적인 보호
              setModalOpen={handleModal}
            >
              <div
                className={`flex w-full h-12 p-2 justify-center text-und14 border border-unddisabled rounded-[10px] items-center bg-white ${
                  time === "시간 선택" && !subject
                    ? "text-undtextgray bg-[#F9F8F7]"
                    : "text-undtextdark bg-white"
                }`}
              >
                {time}
              </div>
            </TimePickerSlider>
          </div>
        </div>
        {/* 버튼 */}
        <Button
          className="py-2.5 rounded-full font-bold text-und18 w-full"
          color={
            time === "시간 선택" || !isModified ? "unddisabled" : "undpoint"
          }
          onClick={
            time === "시간 선택" || !isModified ? undefined : handleOnSubmit
          }
          buttonDisabled={time === "시간 선택" || !isModified}
        >
          {children}
        </Button>
      </div>
    </div>
  );
};

export default ForumForm;

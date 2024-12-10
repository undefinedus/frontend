import { useState, useRef, useEffect } from "react";
import { getBookList, getBookDetail } from "../../api/book/bookApi";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import koLocale from "@fullcalendar/core/locales/ko";
import BookCard from "../book/BookCard";
import "./StatisticsFullCalendar.css";

const StatisticsFullCalendar = () => {
  const calendarRef = useRef(null);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const [bookEvents, setBookEvents] = useState({});
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedBooks, setSelectedBooks] = useState([]);

  const handleDateClick = async (date) => {
    const formattedDate = date.toLocaleDateString("fr-CA");
    setSelectedDate(formattedDate);

    // 선택된 날짜의 도서 정보 가져오기
    const dayEvents = bookEvents[formattedDate];
    if (dayEvents && dayEvents.books) {
      // 각 책의 상세 정보를 API로 조회
      try {
        const detailedBooks = await Promise.all(
          dayEvents.books.map((book) => getBookDetail(book.myBookId))
        );
        setSelectedBooks(detailedBooks);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setSelectedBooks([]);
      }
    } else {
      setSelectedBooks([]);
    }
  };

  const formattedDisplayDate = selectedDate
    ? new Date(selectedDate).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  // 연도 배열 생성 (현재 연도 기준 과거 10년)
  const years = Array.from(
    { length: 11 },
    (_, i) => currentYear - 10 + i
  ).filter((year) => year <= currentYear);

  // 월 배열 생성
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // 책 데이터 가져오기
  const fetchBookData = async () => {
    try {
      const response = await getBookList("COMPLETED", "latest", "");
      console.log("Book API Response:", response); // API 응답 전체를 확인

      if (response?.content) {
        // data.content인지 content인지 확인 필요
        const eventsByDate = {};

        response.content.forEach((book) => {
          console.log("Processing book:", book); // 각 책의 데이터 구조 확인
          const startDate = book.startDate;
          const endDate = book.endDate;

          // startDate와 endDate에만 이벤트 추가
          if (startDate) {
            if (!eventsByDate[startDate]) {
              eventsByDate[startDate] = { books: [] };
            }
            eventsByDate[startDate].books.push({
              bookCover: book.cover,
              bookTitle: book.title,
              myBookId: book.id,
              recordedAt: startDate,
            });
          }

          if (endDate) {
            if (!eventsByDate[endDate]) {
              eventsByDate[endDate] = { books: [] };
            }
            eventsByDate[endDate].books.push({
              bookCover: book.cover,
              bookTitle: book.title,
              myBookId: book.id,
              recordedAt: endDate,
            });
          }
        });

        setBookEvents(eventsByDate);
      }
    } catch (error) {
      console.error("Error fetching book data:", error);
    }
  };

  useEffect(() => {
    fetchBookData();
  }, []);

  // 이전/다음 버튼 활성화 상태 체크
  useEffect(() => {
    const isCurrentMonth =
      selectedYear === currentYear && selectedMonth === currentMonth;
    setIsNextDisabled(isCurrentMonth);
  }, [selectedYear, selectedMonth, currentYear, currentMonth]);

  const handleDayCellContent = (arg) => {
    const dayNumber = arg.dayNumberText.replace("일", "");
    const currentDate = arg.date.toLocaleDateString("fr-CA");
    const dayEvents = bookEvents[currentDate];

    const hasBooks = dayEvents && dayEvents.books && dayEvents.books.length > 0;

    return (
      <div
        className={`day-cell-content ${
          hasBooks ? "has-books cursor-pointer" : ""
        }`}
        onClick={hasBooks ? () => handleDateClick(arg.date) : undefined}
      >
        <div className="day-number">{dayNumber}</div>
        <div
          className={`book-covers ${
            dayEvents?.books?.length > 1 ? "grid-layout" : "single-layout"
          }`}
        >
          {hasBooks &&
            dayEvents.books.slice(0, 4).map((book, index) => (
              <div
                key={`${book.myBookId}-${book.recordedAt}`}
                className={`book-cover-container ${
                  dayEvents.books.length === 1 ? "single-image" : ""
                }`}
              >
                <img
                  src={book.bookCover}
                  alt={book.bookTitle}
                  className="book-cover"
                />
              </div>
            ))}
        </div>
      </div>
    );
  };

  const handleYearChange = (event) => {
    const year = parseInt(event.target.value);
    if (year > currentYear) return;
    setSelectedYear(year);
    updateCalendarDate(year, selectedMonth);
  };

  const handleMonthChange = (event) => {
    const month = parseInt(event.target.value);
    if (selectedYear === currentYear && month > currentMonth) return;
    setSelectedMonth(month);
    updateCalendarDate(selectedYear, month);
  };

  const updateCalendarDate = (year, month) => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.gotoDate(`${year}-${String(month).padStart(2, "0")}-01`);
    }
  };

  const handleDateSet = (arg) => {
    const date = arg.view.currentStart;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    if (year > currentYear || (year === currentYear && month > currentMonth)) {
      updateCalendarDate(selectedYear, selectedMonth);
      return;
    }

    setSelectedYear(year);
    setSelectedMonth(month);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative calendar-container h-full">
        <div className="flex gap-4 mb-4 absolute top-4 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10">
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="block w-28 px-3 py-2 bg-white border border-gray-300 rounded-md 
                    shadow-sm focus:outline-none focus:ring-2 focus:ring-undpoint
                    focus:border-undpoint"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}년
              </option>
            ))}
          </select>

          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="block w-20 px-3 py-2 bg-white border border-gray-300 rounded-md 
                    shadow-sm focus:outline-none focus:ring-2 focus:ring-undpoint
                    focus:border-undpoint"
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}월
              </option>
            ))}
          </select>
        </div>

        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          locale={koLocale}
          headerToolbar={{
            left: "prev",
            center: "",
            right: "next",
          }}
          dayHeaderFormat={{ weekday: "short" }}
          dayCellContent={handleDayCellContent}
          datesSet={handleDateSet}
          className="mt-16"
          nextDayThreshold="00:00:00"
          fixedWeekCount={false}
          showNonCurrentDates={false}
        />
      </div>
      {selectedDate && selectedBooks.length > 0 && (
        <div className="w-full max-w-screen-lg mx-auto">
          <div className="flex justify-start font-extrabold text-sm mb-4">
            {formattedDisplayDate} 읽은 책
          </div>
          <div className="flex flex-col">
            {selectedBooks.map((book) => (
              <BookCard
                key={`${book.myBookId}-${book.recordedAt}`}
                book={book}
                infoOnly={false}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatisticsFullCalendar;

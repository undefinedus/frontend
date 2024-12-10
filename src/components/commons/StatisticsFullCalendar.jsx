import { useState, useRef, useEffect } from "react";
import { getStamps } from "../../api/settings/statistics/stampApi";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import koLocale from "@fullcalendar/core/locales/ko";
import "./StatisticsFullCalendar.css";

const StatisticsFullCalendar = () => {
  const calendarRef = useRef(null);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // JavaScript의 월은 0부터 시작
  const [events, setEvents] = useState([]);

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  // 연도 배열 생성 (현재 연도 기준 과거 10년)
  const years = Array.from(
    { length: 11 },
    (_, i) => currentYear - 10 + i
  ).filter((year) => year <= currentYear);

  const processBooks = (books) => {
    const bookMap = new Map();

    books.forEach((book) => {
      const { status, myBookId, startDate, endDate, recordedAt, currentPage } =
        book;

      // COMPLETED 상태인 경우 endDate에 표시
      if (status === "COMPLETED") {
        if (endDate) {
          if (!bookMap.has(endDate)) {
            bookMap.set(endDate, new Map());
          }
          bookMap.get(endDate).set(myBookId, book);
        }
      }
      // READING 상태인 경우
      else if (status === "READING") {
        // startDate에 표시
        if (startDate) {
          if (!bookMap.has(startDate)) {
            bookMap.set(startDate, new Map());
          }
          const existingBook = bookMap.get(startDate).get(myBookId);

          // 같은 책이 있는 경우 currentPage가 더 큰 것을 선택
          if (!existingBook || existingBook.currentPage < currentPage) {
            bookMap.get(startDate).set(myBookId, book);
          }
        }

        // recordedAt이 있는 경우에도 표시
        if (recordedAt && recordedAt !== startDate) {
          if (!bookMap.has(recordedAt)) {
            bookMap.set(recordedAt, new Map());
          }
          const existingBook = bookMap.get(recordedAt).get(myBookId);

          // 같은 책이 있는 경우 currentPage가 더 큰 것을 선택
          if (!existingBook || existingBook.currentPage < currentPage) {
            bookMap.get(recordedAt).set(myBookId, book);
          }
        }
      }
    });

    // Map을 원하는 형식의 객체로 변환
    const result = {};
    bookMap.forEach((value, date) => {
      result[date] = Array.from(value.values());
    });

    return result;
  };

  // API 데이터를 가져오는 함수
  const fetchStamps = async (year, month) => {
    try {
      const response = await getStamps(year, month);
      const stamps = response.data.data;

      // 데이터 처리
      const processedStamps = {};
      Object.entries(stamps).forEach(([date, books]) => {
        const processedBooks = processBooks(books);
        Object.entries(processedBooks).forEach(([bookDate, bookList]) => {
          if (!processedStamps[bookDate]) {
            processedStamps[bookDate] = [];
          }
          processedStamps[bookDate].push(...bookList);
        });
      });

      // 이벤트 데이터 생성
      const newEvents = Object.entries(processedStamps).map(
        ([date, books]) => ({
          date,
          books: books,
        })
      );
      setEvents(newEvents);
    } catch (error) {
      console.error("Failed to fetch stamps:", error);
    }
  };

  // 년도나 월이 변경될 때 데이터 가져오기
  useEffect(() => {
    fetchStamps(selectedYear, selectedMonth);
  }, [selectedYear, selectedMonth]);

  const handleDayCellContent = (arg) => {
    const dayNumber = arg.dayNumberText.replace("일", "");
    const currentDate = arg.date.toISOString().split("T")[0];
    const dayEvents = events.find((event) => event.date === currentDate);

    return (
      <div className="day-cell-content">
        <div className="day-number">{dayNumber}</div>
        <div
          className={`book-covers ${
            dayEvents?.books?.length > 1 ? "grid-layout" : "single-layout"
          }`}
        >
          {dayEvents &&
            dayEvents.books &&
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

  // 월 배열 생성
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // 이전/다음 버튼 활성화 상태 체크
  useEffect(() => {
    const isCurrentMonth =
      selectedYear === currentYear && selectedMonth === currentMonth;
    setIsNextDisabled(isCurrentMonth);
  }, [selectedYear, selectedMonth, currentYear, currentMonth]);

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

  // 캘린더 버튼 이벤트 핸들러
  const handleDateSet = (arg) => {
    const date = arg.view.currentStart;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    // 현재 날짜를 넘어가지 않도록 제한
    if (year > currentYear || (year === currentYear && month > currentMonth)) {
      updateCalendarDate(selectedYear, selectedMonth);
      return;
    }

    setSelectedYear(year);
    setSelectedMonth(month);
  };

  return (
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
  );
};

export default StatisticsFullCalendar;

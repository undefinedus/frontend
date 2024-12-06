const useDateDiff = () => {
  const diffToday = (date) => {
    let differenceInDays = null;

    const today = new Date();
    const startDateObject = new Date(date);

    // 날짜만 비교 (시간 정보 제거)
    const todayDateOnly = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const startDateOnly = new Date(
      startDateObject.getFullYear(),
      startDateObject.getMonth(),
      startDateObject.getDate()
    );

    // 날짜 차이 계산
    const differenceInMilliseconds =
      todayDateOnly.getTime() - startDateOnly.getTime();

    differenceInDays = Math.ceil(
      differenceInMilliseconds / (1000 * 60 * 60 * 24) + 1
    );

    return differenceInDays;
  };

  const diffEnd = (startDate, endDate) => {
    let differenceInDays = null;

    const endDateObject = new Date(endDate);
    const startDateObject = new Date(startDate);

    // 날짜만 비교 (시간 정보 제거)
    const endDateOnly = new Date(
      endDateObject.getFullYear(),
      endDateObject.getMonth(),
      endDateObject.getDate()
    );
    const startDateOnly = new Date(
      startDateObject.getFullYear(),
      startDateObject.getMonth(),
      startDateObject.getDate()
    );

    // 날짜 차이 계산
    const differenceInMilliseconds =
      endDateOnly.getTime() - startDateOnly.getTime();

    differenceInDays = Math.ceil(
      differenceInMilliseconds / (1000 * 60 * 60 * 24) + 1
    );

    return differenceInDays;
  };

  // 토론 - 예정, 진행 중
  const diffFromNow = (targetTime) => {
    const now = new Date();
    const targetDate = new Date(targetTime);

    const diffInMs = targetDate - now; // 시간 차이 (밀리초)
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60)); // 분 단위로 변환

    if (diffInMinutes < 1) {
      return ""; // 과거 시각
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}분`; // 1~59분
    } else if (diffInMinutes < 1440) {
      // 하루(24시간) 이내
      const diffInHours = Math.floor(diffInMinutes / 60);
      return `${diffInHours}시간`;
    }
  };

  return { diffToday, diffEnd, diffFromNow };
};

export default useDateDiff;

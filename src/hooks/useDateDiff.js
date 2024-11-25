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

  return { diffToday, diffEnd };
};

export default useDateDiff;

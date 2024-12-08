import React, { useEffect, useRef, useState } from "react";
import Calendar from "../../commons/Calendar";
import CheckBox from "../../commons/CheckBox";
import Button from "../../commons/Button";
import { debounce } from "lodash";

const UserInfo = () => {
  const [birth, setBirth] = useState("");
  const [isValidBirth, setIsValidBirth] = useState(null);
  const [validBirthText, setValidBirthText] = useState("");
  const [validCheckBirth, setValidCheckBirth] = useState(false);
  const [gender, setGender] = useState(null);
  const [buttonDisableCondition, setButtonDisableCondition] = useState(true);

  useEffect(() => {
    console.log("gender: ", gender);
    console.log("birth: ", birth);
  }, [birth, gender]);

  // 디바운스된 생년월일 체크
  const debouncedBirthCheck = useRef(
    debounce(async (birth) => {
      if (!birth) {
        setIsValidBirth(null);
        setValidBirthText("");
        return;
      }

      if (!validateBirthLength(birth)) {
        setIsValidBirth(false);
        setValidBirthText("생년월일은 8자리로 입력해 주세요.");
        setValidCheckBirth(false);
        return;
      }

      const isValidAge = validateBirth(birth);
      if (!isValidAge) {
        setIsValidBirth(false);
        setValidBirthText("만 14세 이상만 가입할 수 있습니다.");
        setValidCheckBirth(false);
      } else {
        setIsValidBirth(true);
        setValidBirthText("사용 가능한 생년월일 입니다!");
        setValidCheckBirth(true);
      }
    }, 300)
  ).current;

  // 생년월일 길이 검사
  const validateBirthLength = (birth) => {
    return birth.length === 8;
  };

  // 생년월일 나이 검사
  const validateBirth = (birth) => {
    const currentYear = new Date().getFullYear();
    const year = parseInt(birth.slice(0, 4), 10);
    return year <= currentYear - 14;
  };

  const handleChangeBirth = (e) => {
    const inputBirth = e.target.value;
    if (inputBirth) {
      // YYYYMMDD 형식으로 검증
      debouncedBirthCheck(inputBirth);

      // YYYY-MM-DD 형식으로 상태 저장
      if (inputBirth.length === 8) {
        const year = inputBirth.substring(0, 4);
        const month = inputBirth.substring(4, 6);
        const day = inputBirth.substring(6, 8);
        const formattedBirth = `${year}-${month}-${day}`;
        setBirth(formattedBirth);
        setButtonDisableCondition(false);
      }
    } else {
      setBirth("");
      setIsValidBirth(null);
      setValidBirthText("");
    }
  };

  const handleGenderCheck = (selectedGender) => {
    setGender(selectedGender);
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-4">
        <div>
          <Calendar
            className={`w-full border ${
              isValidBirth === null
                ? "border-undtextdark"
                : isValidBirth
                ? "border-undpoint"
                : "border-red-500"
            }`}
            name="birth"
            labeltext="생년월일"
            onChange={handleChangeBirth}
            value={birth}
            onDateSelect={(date) => {
              if (date) {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const day = String(date.getDate()).padStart(2, "0");
                const yyyymmdd = `${year}${month}${day}`;
                const formattedDate = `${year}-${month}-${day}`; // YYYY-MM-DD

                handleChangeBirth({
                  target: {
                    value: yyyymmdd, // 검증용 YYYYMMDD
                  },
                });
                setBirth(formattedDate); // 상태에는 YYYY-MM-DD로 저장
              }
            }}
          />
          <p
            className={`text-xs text-start mt-1 ${
              isValidBirth === null
                ? "text-gray-500"
                : isValidBirth
                ? "text-undpoint"
                : "text-red-500"
            }`}
          >
            {validBirthText}
          </p>
        </div>

        <div>
          <div className="flex flex-col text-base">
            <span className="flex justify-start mt-2">성별</span>
            <div className="w-full flex">
              <div className="w-1/2">
                <CheckBox
                  checked={gender === "MALE"}
                  onChange={() => handleGenderCheck("MALE")}
                  value="남성"
                />
              </div>
              <div className="w-1/2">
                <CheckBox
                  checked={gender === "FEMALE"}
                  onChange={() => handleGenderCheck("FEMALE")}
                  value="여성"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-7 left-0 right-0 px-6">
        <Button
          className="py-2.5 rounded-full w-full"
          color={buttonDisableCondition ? "unddisabled" : "undpoint"}
          buttonDisabled={buttonDisableCondition}
        >
          수정하기
        </Button>
      </div>
    </div>
  );
};

export default UserInfo;

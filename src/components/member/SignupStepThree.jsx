import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MemberLayout from "../../layouts/MemberLayout";
import Input from "../../components/commons/Input";
import Button from "../../components/commons/Button";
import CheckBox from "../../components/commons/CheckBox";
import { registMember, nicknameDuplicateCheck } from "../../api/signupApi";
import { debounce } from "lodash";
import PropTypes from "prop-types";
import Calendar from "../../components/commons/Calendar";
import Filter from "badwords-ko";
const SignupStepThree = ({
  registerData,
  onRegisterDataUpdate,
  onComplete,
}) => {
  const navigate = useNavigate();

  const [buttonDisableCondition, setButtonDisableCondition] = useState(true);
  const [nickname, setNickname] = useState("");
  const [birth, setBirth] = useState("");
  const [isValid, setIsValid] = useState(null);
  const [isValidBirth, setIsValidBirth] = useState(null);
  const [validText, setValidText] = useState(
    "한글, 영문, 숫자 선택 혼용 2~10자로 입력해 주세요"
  );
  const [validBirthText, setValidBirthText] = useState("");
  const [validCheckNickname, setValidCheckNickname] = useState(false);
  const [validCheckBirth, setValidCheckBirth] = useState(false);
  const [gender, setGender] = useState(null);

  // 닉네임 형식 검사
  const validateNickname = (nickname) => {
    const nicknameRegex = /^[a-zA-Z가-힣0-9]{2,10}$/;
    const isValidFormat = nicknameRegex.test(nickname);

    // 비속어 검사
    const containsProfanity = badwordsFilter.isProfane(nickname);

    return isValidFormat && !containsProfanity;
  };

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

  const badwordsFilter = new Filter();
  badwordsFilter.addWords(
    "라주엽",
    "주엽",
    "라주",
    "관리자",
    "admin",
    "administration",
    "administer",
    "master",
    "administrator",
    "administrater",
    "webmaster",
    "manage",
    "manager",
    "탈퇴회원",
    "탈퇴 회원",
    "탈퇴한 회원",
    "탈퇴한회원"
  );

  // 디바운스된 닉네임 체크
  const debouncedNicknameCheck = useRef(
    debounce(async (nickname) => {
      if (!nickname) {
        setIsValid(null);
        setValidText("");
        return;
      }

      const isValidFormat = validateNickname(nickname);

      if (!isValidFormat) {
        setIsValid(false);
        if (badwordsFilter.isProfane(nickname)) {
          setValidText("사용불가능한 단어가 포함되어 있습니다");
        } else {
          setValidText("한글, 영문, 숫자 선택 혼용 2~10자로 입력해 주세요");
        }
        setValidCheckNickname(false);
        return;
      }

      try {
        const { result } = await nicknameDuplicateCheck(nickname);
        if (result) {
          setIsValid(true);
          setValidText("사용 가능한 닉네임입니다");
          setValidCheckNickname(true);
        } else {
          setIsValid(false);
          setValidText("이미 등록된 닉네임입니다");
          setValidCheckNickname(false);
        }
      } catch (err) {
        setIsValid(false);
        setValidText(err.message);
        setValidCheckNickname(false);
      }
    }, 500)
  ).current;

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
        setValidBirthText("생년월일은 8자리로 입력해 주세요");
        setValidCheckBirth(false);
        return;
      }

      const isValidAge = validateBirth(birth);
      if (!isValidAge) {
        setIsValidBirth(false);
        setValidBirthText("만 14세 이상만 가입할 수 있습니다");
        setValidCheckBirth(false);
      } else {
        setIsValidBirth(true);
        setValidBirthText("사용 가능한 생년월일 입니다!");
        setValidCheckBirth(true);
      }
    }, 300)
  ).current;

  const handleChange = (e) => {
    const inputNickname = e.target.value;
    setNickname(inputNickname);

    if (inputNickname) {
      setValidText("닉네임 확인 중...");
      setIsValid(null);
    }

    debouncedNicknameCheck(inputNickname);
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

  const validateInputs = () => {
    const isNicknameVerified = isValid && validCheckNickname;
    const isBirthVerified = isValidBirth && validCheckBirth;
    const isGenderVerified = gender !== null;

    return isNicknameVerified && isBirthVerified && isGenderVerified;
  };

  useEffect(() => {
    setButtonDisableCondition(!validateInputs());
  }, [
    nickname,
    birth,
    gender,
    isValid,
    isValidBirth,
    validCheckNickname,
    validCheckBirth,
  ]);

  const handleRegister = async () => {
    try {
      const updatedData = {
        nickname,
        birth: birth,
        gender: gender,
      };

      onRegisterDataUpdate(updatedData);
      onComplete?.();
    } catch (err) {
      console.error("회원가입 실패:", err);
      alert("회원가입 처리 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    return () => {
      debouncedNicknameCheck.cancel();
      debouncedBirthCheck.cancel();
    };
  }, []);

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-4">
        <div>
          <Input
            className={`w-full border ${
              isValid === null
                ? "border-undtextgray"
                : isValid
                ? "border-undpoint"
                : "border-red-500"
            }`}
            name="nickname"
            value={nickname}
            labeltext="닉네임"
            maxLength="10"
            minLength="2"
            placeholder="한글, 영문, 숫자 선택 혼용 2~10자"
            onChange={handleChange}
          />
          <p
            className={`text-xs text-start mt-1 ${
              isValid === null
                ? "text-gray-500"
                : isValid
                ? "text-undpoint"
                : "text-red-500"
            }`}
          >
            {validText}
          </p>
        </div>

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

      <div className="flex items-center mb-5">
        <Button
          className="py-2.5 rounded-full w-full"
          color={buttonDisableCondition ? "unddisabled" : "undpoint"}
          buttonDisabled={buttonDisableCondition}
          onClick={handleRegister}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

SignupStepThree.propTypes = {
  registerData: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    nickname: PropTypes.string,
    birth: PropTypes.string,
    gender: PropTypes.string,
    preferences: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onRegisterDataUpdate: PropTypes.func.isRequired,
  onComplete: PropTypes.func,
};

export default SignupStepThree;

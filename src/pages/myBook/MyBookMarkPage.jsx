import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MemberLayout from "../../layouts/MemberLayout";
import Input from "../../components/commons/Input";
import Button from "../../components/commons/Button";
import CheckBox from "../../components/commons/CheckBox";
import { registMember, nicknameDuplicateCheck } from "../../api/signupApi";
import { debounce } from "lodash";
import PropTypes from "prop-types";

const MyBookMarkPage = ({ onComplete }) => {
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
    return nicknameRegex.test(nickname);
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
        setValidText("한글, 영문, 숫자 선택 혼용 2~10자로 입력해 주세요");
        setValidCheckNickname(false);
        return;
      }

      try {
        const { result } = await nicknameDuplicateCheck(nickname);
        if (result) {
          setIsValid(true);
          setValidText("사용 가능한 닉네임입니다.");
          setValidCheckNickname(true);
        } else {
          setIsValid(false);
          setValidText("이미 등록된 닉네임입니다.");
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
    setBirth(inputBirth);

    if (inputBirth) {
      setValidBirthText("생년월일 확인 중...");
      setIsValidBirth(null);
    }

    debouncedBirthCheck(inputBirth);
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
      const registerData = {
        nickname,
        birth,
        gender,
      };

      const response = await registMember(registerData);
      if (response.result) {
        onComplete?.();
        navigate("/signup/complete");
      } else {
        alert("회원가입에 실패했습니다.");
      }
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
    <MemberLayout value="거의 다 왔어요!">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-4">
          <div>
            <Input
              className={`w-full border ${
                isValid === null
                  ? "border-undtextdark"
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
            <Input
              className={`w-full border ${
                isValidBirth === null
                  ? "border-undtextdark"
                  : isValidBirth
                  ? "border-undpoint"
                  : "border-red-500"
              }`}
              name="birth"
              type="number"
              value={birth}
              labeltext="생년월일"
              placeholder="8자리로 입력해 주세요. ex)19960323"
              onChange={handleChangeBirth}
              onInput={(e) => {
                if (e.target.value.length > 8)
                  e.target.value = e.target.value.slice(0, 8);
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
    </MemberLayout>
  );
};

MyBookMarkPage.propTypes = {
  onComplete: PropTypes.func,
};

export default MyBookMarkPage;

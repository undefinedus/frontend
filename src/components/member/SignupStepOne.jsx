import React, { useState, useEffect, useRef } from "react";
import { debounce } from "lodash";
import Button from "../commons/Button";
import Input from "../commons/Input";
import CountdownTimer from "../commons/CountdownTimer";
import { PiArrowCounterClockwiseBold } from "react-icons/pi";
import {
  emailDuplicateCheck,
  sendVerificationEmail,
  verifyEmailCode,
} from "../../api/signupApi";
import PropTypes from "prop-types";

function SignupStepOne({ onEmailVerified }) {
  const initialState = {
    email: "",
    isValid: null,
    validText: "",
    validNum: false,
    buttonDisabled: true,
    inputHandler: false,
    validTimeExpired: false,
    validCheckUsername: false,
  };

  const [email, setEmail] = useState(initialState.email);
  const [isValid, setIsValid] = useState(initialState.isValid);
  const [validText, setValidText] = useState(initialState.validText);
  const [validNum, setValidNum] = useState(initialState.validNum);
  const [buttonDisabled, setButtonDisabled] = useState(
    initialState.buttonDisabled
  );
  const [inputHandler, setInputHandler] = useState(initialState.inputHandler);
  const [validTimeExpired, setValidTimeExpired] = useState(
    initialState.validTimeExpired
  );
  const [validCheckUsername, setValidCheckUsername] = useState(
    initialState.validCheckUsername
  );
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");

  const [timerKey, setTimerKey] = useState(0); // 타이머 재시작을 위한 key

  const firstInputRef = useRef(null);
  const secondInputRef = useRef(null);
  const thirdInputRef = useRef(null);
  const fourthInputRef = useRef(null);

  // 이메일 형식 검사
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  // 디바운스된 이메일 체크
  const debouncedEmailCheck = useRef(
    debounce(async (email) => {
      if (!email) {
        setIsValid(null);
        setValidText("");
        return;
      }

      const isValidFormat = validateEmail(email);

      if (!isValidFormat) {
        setIsValid(false);
        setValidText("올바른 이메일 형식이 아닙니다.");
        setValidCheckUsername(false);
        return;
      }

      try {
        const { result } = await emailDuplicateCheck(email);

        if (result) {
          setIsValid(true);
          setValidText("사용 가능한 메일입니다.");
          setValidCheckUsername(true);
        } else {
          setIsValid(false);
          setValidText("이미 등록된 메일입니다.");
          setValidCheckUsername(false);
        }
      } catch (err) {
        setIsValid(false);
        setValidText(err.message);
        setValidCheckUsername(false);
      }
    }, 500)
  ).current;

  // 인증번호 전송
  const handleButtonHandler = async () => {
    try {
      const response = await sendVerificationEmail(email);
      if (response.result) {
        setIsVerified(false); // 이전 인증 상태 초기화
        setVerificationMessage(""); // 이전 인증 메시지 초기화
        resetVerificationInputs(); // 입력된 인증번호 초기화
        setValidTimeExpired(false); // 타이머 만료 상태 초기화
        setTimerKey((prev) => prev + 1); // 타이머 재시작
        setValidNum(true);
        setInputHandler(true);
        setValidText(response.message);
      } else {
        setValidText(response.message);
      }
    } catch (err) {
      setValidText(err.message);
    }
  };

  // 인증번호 입력값 초기화
  const resetVerificationInputs = () => {
    [firstInputRef, secondInputRef, thirdInputRef, fourthInputRef].forEach(
      (ref) => {
        if (ref.current) ref.current.value = "";
      }
    );
    firstInputRef.current?.focus();
    setVerificationCode("");
  };

  // 인증번호 입력 처리
  const handleInputChange = (e, nextRef) => {
    const input = e.target.value;

    if (/^\d*$/.test(input)) {
      if (input.length === 1 && nextRef) {
        nextRef.current.focus();
      }

      // 인증번호 상태 업데이트
      const refs = [
        firstInputRef,
        secondInputRef,
        thirdInputRef,
        fourthInputRef,
      ];
      const codes = refs.map((ref) => ref.current?.value || "");
      const fullCode = codes.join("");
      setVerificationCode(fullCode);

      // 4자리 입력 완료시 자동 검증
      if (fullCode.length === 4) {
        verifyCode(fullCode);
      }
    }
  };

  // 인증번호 확인
  const verifyCode = async (code) => {
    try {
      const response = await verifyEmailCode(email, code);
      setIsVerified(response.result);
      setVerificationMessage(response.message);

      if (!response.result) {
        resetVerificationInputs();
      } else {
        onEmailVerified(email);
      }
    } catch (err) {
      setIsVerified(false);
      setVerificationMessage(err.message);
    }
  };

  const handleChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    if (inputEmail) {
      setValidText("이메일 확인 중...");
      setIsValid(null);
    }

    debouncedEmailCheck(inputEmail);
  };

  // 인증 시간 만료 처리
  const handleTimeEnd = () => {
    setValidTimeExpired(true);
    setVerificationMessage("인증번호 입력 시간이 초과되었습니다");
    resetVerificationInputs();
  };

  const resetState = () => {
    setEmail(initialState.email);
    setIsValid(initialState.isValid);
    setValidText(initialState.validText);
    setValidNum(initialState.validNum);
    setButtonDisabled(initialState.buttonDisabled);
    setInputHandler(initialState.inputHandler);
    setValidTimeExpired(initialState.validTimeExpired);
    setValidCheckUsername(initialState.validCheckUsername);
    setVerificationCode("");
    setIsVerified(false);
    setVerificationMessage("");
  };

  useEffect(() => {
    return () => {
      debouncedEmailCheck.cancel();
    };
  }, []);

  useEffect(() => {
    if (isVerified) {
      onEmailVerified(email);
    }
  }, [isVerified, email, onEmailVerified]);

  return (
    <div className="flex flex-col justify-between h-full items-center ">
      <div className="w-full h-full flex flex-col justify-between gap-4">
        <div className="w-full flex flex-col justify-center items-center gap-4">
          <div className="w-full">
            <div className="relative w-full">
              <Input
                className={`focus:outline-none w-full border ${
                  isValid === null
                    ? "border-undtextdark"
                    : isValid
                    ? "border-undpoint"
                    : "border-red-500"
                }`}
                labeltext="아이디"
                type="email"
                name="email"
                value={email}
                placeholder="이메일을 입력해 주세요."
                onChange={handleChange}
                disabled={inputHandler || isVerified}
              />
              <PiArrowCounterClockwiseBold
                className="absolute right-3 top-2/3 transform -translate-y-1/2 cursor-pointer"
                onClick={resetState}
              />
            </div>
            <p
              className={`text-sm text-start ${
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

          {validNum && (
            <div>
              <div>
                <p className="mt-14 mb-3 text-sm font-semibold">
                  이메일로 전송된 인증번호를 입력해 주세요.
                </p>
                <CountdownTimer onTimeEnd={handleTimeEnd} restart={timerKey} />
                <div className="flex justify-between gap-5">
                  {[
                    { ref: firstInputRef, nextRef: secondInputRef },
                    { ref: secondInputRef, nextRef: thirdInputRef },
                    { ref: thirdInputRef, nextRef: fourthInputRef },
                    { ref: fourthInputRef, nextRef: null },
                  ].map((input, index) => (
                    <Input
                      key={index}
                      ref={input.ref}
                      className={`w-14 text-center font-bold text-undtextdark border border-undtextgray
                        ${
                          validTimeExpired
                            ? "border border-red-500"
                            : isVerified
                            ? "border border-undpoint"
                            : "border-unddisabled"
                        }`}
                      placeholder="-"
                      maxLength="1"
                      type="text"
                      pattern="\d*"
                      disabled={validTimeExpired || isVerified}
                      onChange={(e) => handleInputChange(e, input.nextRef)}
                    />
                  ))}
                </div>
                {verificationMessage && (
                  <p
                    className={`text-sm mt-2 ${
                      isVerified ? "text-undpoint" : "text-red-500"
                    }`}
                  >
                    {verificationMessage}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="w-full">
          <div className="w-full">
            {!validNum && (
              <Button
                onClick={handleButtonHandler}
                className="py-2.5 rounded-full w-full"
                buttonDisabled={!isValid || !validCheckUsername}
                color={
                  !isValid || !validCheckUsername ? "unddisabled" : "undpoint"
                }
              >
                인증번호 전송
              </Button>
            )}
            {validTimeExpired && !isVerified && (
              <Button
                onClick={handleButtonHandler}
                className="py-2.5 rounded-full w-full"
                color="undpoint"
              >
                인증번호 재전송
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

SignupStepOne.propTypes = {
  onEmailVerified: PropTypes.func.isRequired,
};

export default SignupStepOne;

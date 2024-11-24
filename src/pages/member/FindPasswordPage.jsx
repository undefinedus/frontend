import React, { useState, useEffect, useRef } from "react";
import { debounce } from "lodash";
import CountdownTimer from "../../components/commons/CountdownTimer";
import Button from "../../components/commons/Button";
import Input from "../../components/commons/Input";
import MemberLayout from "../../layouts/MemberLayout";
import {
  checkEmailExists,
  sendVerificationEmail,
  verifyEmailCode,
} from "../../api/signupApi";

function FindPasswordPage(props) {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(null);
  const [validText, setValidText] = useState("");
  const [validNum, setValidNum] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [inputHandler, setInputHandler] = useState(false);
  const [validTimeExpired, setValidTimeExpired] = useState(false);
  const [validCheckUsername, setValidCheckUsername] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");

  const [timerKey, setTimerKey] = useState(0); // 타이머 재시작을 위한 key

  const firstInputRef = useRef(null);
  const secondInputRef = useRef(null);
  const thirdInputRef = useRef(null);
  const fourthInputRef = useRef(null);
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
        const { result } = await checkEmailExists(email);

        if (result) {
          // 이메일이 존재하면
          setIsValid(true);
          setValidText("유효한 이메일입니다.");
          setValidCheckUsername(true);
        } else {
          // 이메일이 존재하지 않으면
          setIsValid(false);
          setValidText("존재하지 않는 이메일입니다.");
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

  useEffect(() => {
    return () => {
      debouncedEmailCheck.cancel();
    };
  }, []);

  return (
    <MemberLayout value={"비밀번호 찾기"}>
      <div className="flex flex-col justify-between h-full items-center ">
        <div className="w-full h-full flex flex-col justify-between gap-4">
          <div className="w-full flex flex-col justify-center items-center gap-4">
            <div className="w-full">
              <div className="w-full">
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
                  <CountdownTimer
                    onTimeEnd={handleTimeEnd}
                    restart={timerKey}
                  />
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
              {validNum && (
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
    </MemberLayout>
  );
}

export default FindPasswordPage;

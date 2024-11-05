import React, { useState, useEffect, useRef } from "react";
import Button from "../../components/commons/Button";
import Input from "../../components/commons/Input";
import CountdownTimer from "../../components/commons/CountdownTimer";
import { PiX, PiArrowCounterClockwiseBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const initialState = {
    email: "",
    isValid: null,
    validText: "",
    validNum: false,
    buttonDisabled: false,
    inputHandler: false,
    validTimeExpired: false,
  };

  const resetState = () => {
    setEmail(initialState.email);
    setIsValid(initialState.isValid);
    setValidText(initialState.validText);
    setValidNum(initialState.validNum);
    setButtonDisabled(initialState.buttonDisabled);
    setInputHandler(initialState.inputHandler);
    setValidTimeExpired(initialState.validTimeExpired);
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

  const firstInputRef = useRef(null);
  const secondInputRef = useRef(null);
  const thirdInputRef = useRef(null);
  const fourthInputRef = useRef(null);
  const navigate = useNavigate();

  const handleInputChange = (e, nextRef) => {
    const input = e.target.value;
    if (input.length === 1 && nextRef) {
      nextRef.current.focus();
    }
  };

  useEffect(() => {
    if (isValid === true) {
      setValidText("사용 가능한 이메일입니다.");
      setButtonDisabled(false);
    } else if (isValid === false) {
      setValidText("올바른 이메일 형식이 아닙니다.");
      setButtonDisabled(true);
    } else {
      setButtonDisabled(true);
    }
  }, [isValid, validNum]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email); // 이메일 형식 유효성 검사 코드
  };

  const handleChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    setIsValid(validateEmail(inputEmail)); // 이메일 유효성 검사 결과를 상태로 저장
  };

  const handleButtonHandler = () => {
    setValidNum(true);
    setInputHandler(true);
  };

  const hanldeTimeEnd = () => {
    setValidTimeExpired(true);
  };

  const home = () => {
    navigate("/Login");
  };

  return (
    <div className="flex flex-col justify-center items-center p-auto h-full py-[30px] gap-[56px]">
      <div className="flex justify-center w-full">
        <div className="w-1/3"></div>
        <div className="w-1/3 font-bold text-undpoint text-xl">회원가입</div>
        <PiX className="w-1/3" onClick={home} size={28} />
      </div>
      <div className="w-full h-full flex flex-col justify-between">
        <div className="w-full flex flex-col justify-center items-center gap-4">
          <div>
            <div className="relative">
              <Input
                className={`focus:outline-none ${
                  isValid === null
                    ? "border border-black"
                    : isValid
                    ? "border border-black"
                    : " border border-red-500"
                } `}
                label="아이디"
                type="email"
                name="email"
                value={email}
                placeholder="이메일을 입력해 주세요."
                onChange={handleChange}
                disabled={inputHandler}
              />
              <PiArrowCounterClockwiseBold
                className={`absolute right-3 top-2/3 transform -translate-y-1/2 cursor-pointer 
              `}
                onClick={resetState}
              />
            </div>

            {!isValid && (
              <p className="text-red-500 text-sm text-start">{validText}</p>
            )}
            {isValid && (
              <p className="text-undpoint text-sm text-start">{validText}</p>
            )}
          </div>

          {validNum && (
            <div>
              <div>
                <p className="mt-14 mb-3 text-sm font-semibold">
                  이메일로 전송된 인증번호를 입력해 주세요.
                </p>
                <CountdownTimer onTimeEnd={hanldeTimeEnd} />
                <div className="flex justify-between gap-5">
                  <Input
                    ref={firstInputRef}
                    className={`"w-auto text-center border font-bold w-[58px]  text-undtextdark"
                    ${
                      validTimeExpired
                        ? "border border-red-500"
                        : "border-unddisabled"
                    }`}
                    placeholder="-"
                    maxLength="1"
                    disabled={validTimeExpired}
                    onChange={(e) => handleInputChange(e, secondInputRef)}
                  />
                  <Input
                    ref={secondInputRef}
                    className={`"w-auto text-center border font-bold w-[58px] text-undtextdark"
                    ${
                      validTimeExpired
                        ? "border border-red-500"
                        : "border-unddisabled"
                    }`}
                    placeholder="-"
                    maxLength="1"
                    disabled={validTimeExpired}
                    onChange={(e) => handleInputChange(e, thirdInputRef)}
                  />
                  <Input
                    ref={thirdInputRef}
                    className={`"w-auto text-center border font-bold w-[58px] text-undtextdark"
                    ${
                      validTimeExpired
                        ? "border border-red-500"
                        : "border-unddisabled"
                    }`}
                    placeholder="-"
                    maxLength="1"
                    disabled={validTimeExpired}
                    onChange={(e) => handleInputChange(e, fourthInputRef)}
                  />
                  <Input
                    ref={fourthInputRef}
                    className={`"w-auto text-center border font-bold w-[58px] text-undtextdark"
                    ${
                      validTimeExpired
                        ? "border border-red-500"
                        : "border-unddisabled"
                    }`}
                    placeholder="-"
                    maxLength="1"
                    disabled={validTimeExpired}
                    onChange={(e) => handleInputChange(e, null)}
                  />
                </div>
                <div className="text-red-500 mt-2 text-sm">
                  인증번호 입력 시간이 초과 되었습니다.
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-full">
          <div className="w-full">
            {!validNum && (
              <div className="w-full">
                <Button
                  onClick={handleButtonHandler}
                  className=" py-2.5 rounded-full w-[297px]"
                  disabled={buttonDisabled}
                  color={`${buttonDisabled ? "unddisabled" : "undpoint"}`}
                >
                  인증번호 전송
                </Button>
              </div>
            )}
            {validTimeExpired && (
              <div>
                <Button
                  className=" py-2.5 rounded-full w-[297px]"
                  disabled={buttonDisabled}
                  color="undpoint"
                >
                  인증번호 재전송
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// const verifyCode = () =>{

// }

export default SignUpPage;

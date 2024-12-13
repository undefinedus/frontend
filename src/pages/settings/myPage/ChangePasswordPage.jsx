import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { triggerRefresh } from "../../../slices/myPageRefreshSlice";
import Button from "../../../components/commons/Button";
import { PrevTitle } from "../../../layouts/TopLayout";
import Input from "../../../components/commons/Input";
import { debounce } from "lodash";
import { checkPassword, modifyPassword } from "../../../api/settings/myPageApi";

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [prevPassword, setPrevPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [newPasswordCheck, setNewPasswordCheck] = useState();
  const [isValidPrevPassword, setIsValidPrevPassword] = useState(false);
  const [isValidNewPassword, setIsValidNewPassword] = useState(false);
  const [isValidNewPasswordCheck, setIsValidNewPasswordCheck] = useState(false);
  const [validText, setValidText] = useState();
  const [validCheckText, setValidCheckText] = useState("");
  const [strength, setStrength] = useState();

  const [buttonDisableCondition, setButtonDisableCondition] = useState(true);

  useEffect(() => {
    setButtonDisableCondition(!isValidNewPasswordCheck);
  }, [isValidNewPasswordCheck]);

  useEffect(() => {
    if (newPassword !== newPasswordCheck) {
      setIsValidNewPasswordCheck(false);
    } else if (newPassword === newPasswordCheck) {
      setIsValidNewPasswordCheck(true);
    }
  }, [newPassword]);

  const handlePrevPasswordChange = (e) => {
    const value = e.target.value;
    setPrevPassword(value);
    debouncedPrevPasswordCheck(value);
  };

  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);

    if (value === prevPassword) {
      setIsValidNewPassword(false);
      setValidText("이전 비밀번호와 다르게 입력해 주세요");
      setStrength("사용 불가");
      return;
    }

    handleNewPasswordCheck(value);
  };

  const handleNewPasswordCheckChange = (e) => {
    const value = e.target.value;
    setNewPasswordCheck(value);

    if (value !== newPassword) {
      setIsValidNewPasswordCheck(false);
      setValidCheckText("비밀번호가 일치하지 않습니다");
      return;
    } else {
      setIsValidNewPasswordCheck(true);
      setValidCheckText("");
    }
  };

  const validatePassword = (password) => {
    // 허용된 특수문자
    const allowedSpecialChars = /[~!@#$%^&*]/;
    // 허용되지 않은 특수문자를 확인 (허용된 것 제외)
    const disallowedSpecialChars = /[^a-zA-Z0-9~!@#$%^&*]/;

    // 조건 체크
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = allowedSpecialChars.test(password);
    const hasDisallowedChars = disallowedSpecialChars.test(password);

    if (hasDisallowedChars) {
      return {
        strength: "사용 불가",
        error: "특수문자는 ~ ! @ # $ % ^ & * 만 사용 가능합니다",
      };
    }

    const isValidLength = password.length >= 12 && password.length <= 20;

    const count = [hasLetters, hasNumbers, hasSpecialChars].filter(
      Boolean
    ).length;

    if (!isValidLength) {
      return {
        strength: "사용 불가",
        error: "영문, 숫자, 특수문자 혼용 12~20자로 입력해 주세요",
      };
    }

    if (count >= 3) {
      return { strength: "안전", error: "" };
    } else if (count === 2) {
      return { strength: "보통", error: "" };
    } else {
      return {
        strength: "사용 불가",
        error: "영문, 숫자, 특수문자 혼용 12~20자로 입력해 주세요",
      };
    }
  };

  const debouncedPrevPasswordCheck = useRef(
    debounce(async (prevPassword) => {
      if (!prevPassword || prevPassword === "") {
        setIsValidPrevPassword(false);
        setValidText("");
        return;
      }

      try {
        const res = await checkPassword({ prevPassword });
        console.log("비밀번호 체킹 결과: ", res);

        if (res === "same") {
          setValidText("영문, 숫자, 특수문자 혼용 12~20자로 입력해 주세요");
          setIsValidPrevPassword(true);
        } else {
          setIsValidPrevPassword(false);
          setValidText("비밀번호가 일치하지 않습니다");
        }
      } catch (error) {
        setIsValidPrevPassword(false);
        setValidText(error.message || "비밀번호 체킹 중 오류가 발생했습니다.");
      }
    }, 500)
  ).current;

  const handleNewPasswordCheck = (newPassword) => {
    // 빈 값은 안됨
    if (!newPassword || newPassword === "") {
      setIsValidNewPassword(false);
      setValidText("새 비밀번호를 입력해 주세요");
      return;
    }

    const newPasswordCheckResult = validatePassword(newPassword);

    // 유효성 검사
    if (newPasswordCheckResult.strength === "사용 불가") {
      setIsValidNewPassword(false);
      setStrength(newPasswordCheckResult.strength);
      setValidText(newPasswordCheckResult.error);
      return;
    }

    // 모든 조건 통과시
    setIsValidNewPassword(true);
    setStrength(newPasswordCheckResult.strength);
    setValidText("");
  };

  const handleModifyPassword = async () => {
    await fetchModifyPassword(newPassword);
  };

  const fetchModifyPassword = async (newPassword) => {
    const data = { newPassword: newPassword };
    try {
      const res = await modifyPassword(data);
      console.log("res: ", res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-full bg-undbgmain px-6">
      <div className="fixed top-0 left-0 right-0">
        <PrevTitle
          title={"비밀번호 변경"}
          showLine={false}
          onClick={() =>
            navigate({ pathname: "/settings/myPage" }, { replace: true })
          }
        />
      </div>

      <div className="fixed top-16 bottom-20 left-0 right-0 px-6">
        <div className="flex flex-col pt-14 justify-start h-full">
          {!isValidPrevPassword && (
            <div>
              <Input
                className={`border border-undtextgray focus:outline-none ${
                  !isValidPrevPassword &&
                  "border-undred focus:border-0 focus:ring-1 focus:ring-undred"
                } w-full`}
                type="password"
                name="password"
                value={prevPassword}
                onChange={handlePrevPasswordChange}
                labeltext="기존 비밀번호"
                placeholder="기존 비밀번호를 입력해 주세요"
              ></Input>
              {!isValidPrevPassword && (
                <span
                  className={`flex justify-start mt-1 text-und14 text-undred`}
                >
                  {validText}
                </span>
              )}
            </div>
          )}
          {isValidPrevPassword && (
            <div className="flex flex-col gap-4">
              <div>
                <Input
                  className="border border-undtextgray w-full"
                  type="password"
                  name="password"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  labeltext="새 비밀번호"
                  placeholder="새로운 비밀번호를 입력해 주세요"
                >
                  {strength && (
                    <p
                      style={{
                        color:
                          strength === "안전"
                            ? "green"
                            : strength === "보통"
                            ? "orange"
                            : "red",
                      }}
                    >
                      {strength}
                    </p>
                  )}
                </Input>
                {!isValidNewPassword && validText && (
                  <span
                    className={`text-xs text-undtextgray flex justify-start mt-1`}
                    style={{
                      color:
                        strength === "안전" || strength === "보통"
                          ? "gray"
                          : strength === "사용 불가"
                          ? "red"
                          : "gray",
                    }}
                  >
                    {validText}
                  </span>
                )}
              </div>
              <div>
                <Input
                  className="border border-undtextgray w-full"
                  type="password"
                  labeltext="새 비밀번호 확인"
                  value={newPasswordCheck}
                  onChange={handleNewPasswordCheckChange}
                  placeholder="비밀번호를 입력해 주세요"
                ></Input>
                {isValidNewPassword && (
                  <span className="text-xs text-red-500 flex justify-start mt-1">
                    {validCheckText}
                  </span>
                )}
              </div>
            </div>
          )}
          <div className="fixed bottom-7 left-0 right-0 px-6">
            <Button
              className="py-2.5 rounded-full w-full text-und18 font-bold"
              color={buttonDisableCondition ? "unddisabled" : "undpoint"}
              buttonDisabled={buttonDisableCondition}
              onClick={handleModifyPassword}
            >
              수정하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;

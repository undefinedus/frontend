import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../commons/Button";
import Input from "../commons/Input";
import PropTypes from "prop-types";

function FindPasswordStepTwoComponent({ email, confirmButton }) {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] = useState("");
  const [validText, setValidText] = useState("");
  const [strength, setStrength] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);

  const validatePassword = (password) => {
    const allowedSpecialChars = /[~!@#$%^&*]/;
    const disallowedSpecialChars = /[^a-zA-Z0-9~!@#$%^&*]/;

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

    if (count >= 3) return { strength: "안전", error: "" };
    if (count === 2) return { strength: "보통", error: "" };
    return {
      strength: "사용 불가",
      error: "영문, 숫자, 특수문자 혼용 12~20자로 입력해 주세요",
    };
  };

  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);

    const validation = validatePassword(value);
    setStrength(validation.strength);
    setValidText(validation.error);
    setIsValidPassword(validation.strength !== "사용 불가");

    // 비밀번호 확인란과 일치 여부 체크
    if (newPasswordCheck && value !== newPasswordCheck) {
      setValidText("비밀번호가 일치하지 않습니다");
      setIsValidPassword(false);
    }
  };

  const handleNewPasswordCheckChange = (e) => {
    const value = e.target.value;
    setNewPasswordCheck(value);

    if (value !== newPassword) {
      setValidText("비밀번호가 일치하지 않습니다");
      setIsValidPassword(false);
    } else {
      setValidText("");
      setIsValidPassword(true);
    }
  };

  const handleSubmit = () => {
    if (isValidPassword && newPassword === newPasswordCheck) {
      confirmButton(newPassword);
      navigate("/member/login", { replace: true });
    }
  };

  return (
    <div className="flex flex-col justify-between h-full items-center">
      <div className="w-full flex flex-col gap-4">
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
          {validText && (
            <span className="text-xs text-red-500 flex justify-start mt-1">
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
            placeholder="비밀번호를 다시 입력해 주세요"
          />
        </div>
      </div>

      <div className="w-full mt-4">
        <Button
          className="py-2.5 rounded-full w-full"
          color={!isValidPassword ? "unddisabled" : "undpoint"}
          buttonDisabled={!isValidPassword}
          onClick={handleSubmit}
        >
          비밀번호 변경
        </Button>
      </div>
    </div>
  );
}

FindPasswordStepTwoComponent.propTypes = {
  email: PropTypes.string.isRequired,
  confirmButton: PropTypes.func.isRequired,
};

export default FindPasswordStepTwoComponent;

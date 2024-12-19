import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/commons/Button";
import Input from "../../components/commons/Input";
import useCustomLogin from "../../hooks/useCustomLogin";
import SignupModal from "../modal/member/SignupModal";
import BigCheckBox from "../commons/BigCheckBox";
import CheckBox from "../commons/CheckBox";
import KakaoLoginComponent from "./KakaoLoginComponent";

const initState = {
  username: "",
  password: "",
};

const LoginComponent = () => {
  const [loginParam, setLoginParam] = useState({ ...initState });
  const [loginError, setLoginError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState({
    allAgree: false,
    serviceAgree: false,
    privacyAgree: false,
  });
  const [ageCheck, setAgeCheck] = useState({
    under14: false,
    over14: false,
  });

  const openSignupModal = () => setIsModalOpen(true);
  const closeSignupModal = () => {
    setIsModalOpen(false);
    setCheckboxStates({
      allAgree: false,
      serviceAgree: false,
      privacyAgree: false,
    });
    setAgeCheck({
      under14: false,
      over14: false,
    });
  };

  const { doLogin, moveToPath, isLogin } = useCustomLogin();
  const modalBackground = useRef();

  useEffect(() => {
    console.log("isLogin : " + isLogin);
    if (isLogin) {
      moveToPath("/myBook");
    }
  }, [isLogin]);

  const handleChange = (e) => {
    loginParam[e.target.name] = e.target.value;

    setLoginParam({ ...loginParam });
  };

  const handleClickLogin = () => {
    doLogin(loginParam).then((data) => {
      if (data.error) {
        console.log("로그인 에러");
        setLoginError("아이디 또는 비밀번호가 일치하지 않습니다");
      } else {
        // ADMIN 역할이 포함되어 있는지 확인
        if (data.roles?.includes("ADMIN")) {
          moveToPath("/admin");
        } else {
          moveToPath("/myBook");
        }
      }
    });
  };

  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClickLogin();
    }
  };

  // 전체 동의 체크박스 핸들러
  const handleAllAgree = (checked) => {
    setCheckboxStates({
      allAgree: checked,
      serviceAgree: checked,
      privacyAgree: checked,
    });
  };

  // 개별 체크박스 핸들러
  const handleSingleCheck = (name, checked) => {
    const newStates = {
      ...checkboxStates,
      [name]: checked,
    };

    // 필수 약관들이 모두 체크되었는지 확인
    const allChecked = newStates.serviceAgree && newStates.privacyAgree;

    setCheckboxStates({
      ...newStates,
      allAgree: allChecked,
    });
  };

  // 연령 체크박스 핸들러
  const handleAgeCheck = (name, checked) => {
    setAgeCheck({
      ...checkboxStates,
      under14: name === "under14" ? checked : false,
      over14: name === "over14" ? checked : false,
    });
  };

  const signupButtonHandler = () => {
    // 필수 약관 동의 확인
    const isAgreed = checkboxStates.serviceAgree && checkboxStates.privacyAgree;
    // 연령 확인 (14세 이상만 가입 가능)
    const isAgeVerified = ageCheck.over14;

    return isAgreed && isAgeVerified;
  };

  return (
    <div className="flex flex-col items-center p-6 h-full gap-4">
      <div className="flex justify-center mt-6 w-52">
        <img src="/assets/logos/Logo2.png" alt="logoWithText" />
      </div>
      <div className="flex flex-col w-full">
        <Input
          className="mb-4 w-full border border-undtextgray"
          labeltext="아이디"
          type="text"
          name="username"
          value={loginParam.username}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          placeholder={"아이디를 입력해 주세요."}
        />
        <Input
          className="w-full border border-undtextgray"
          labeltext="비밀번호"
          type="password"
          name="password"
          value={loginParam.password}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          placeholder={"비밀번호를 입력해 주세요."}
        />
        <p className="text-sm text-red-500">{loginError}</p>
      </div>

      <div className="flex w-full flex-col justify-center mt-10 gap-4">
        <Button
          className="text-white text-und18 py-2.5 rounded-full font-bold w-full"
          color="undpoint"
          onClick={handleClickLogin}
        >
          로그인
        </Button>
        <KakaoLoginComponent />
      </div>

      <div className="flex gap-2 mt-5">
        <div className=" text-undpoint">
          <Link to="/member/findPassword" className="underline">
            비밀번호 찾기
          </Link>
        </div>
        <div>|</div>
        <div
          className="underline cursor-pointer text-undpoint"
          onClick={openSignupModal}
        >
          회원가입
        </div>
      </div>
      <div className="flex fixed bottom-11 justify-center gap-4 ">
        {isModalOpen && (
          <SignupModal
            isOpen={isModalOpen}
            onClose={closeSignupModal}
            confirmText={"회원가입"}
            buttonDisabled={!signupButtonHandler()}
            Bottom={true}
          >
            <BigCheckBox
              checked={checkboxStates.allAgree}
              onChange={handleAllAgree}
              value={"약관 전체 동의"}
            />
            <CheckBox
              checked={checkboxStates.serviceAgree}
              onChange={(checked) => handleSingleCheck("serviceAgree", checked)}
              value={"(필수) 서비스 이용약관 동의"}
              showMessage={true}
              onClick={() => navigate("/member/TermsOfUse")}
            />
            <CheckBox
              checked={checkboxStates.privacyAgree}
              onChange={(checked) => handleSingleCheck("privacyAgree", checked)}
              value={"(필수) 개인정보 수집 및 이용 동의"}
              showMessage={true}
              onClick={() =>
                navigate("/member/privacyPolicy", {
                  state: { from: "/member/login" },
                })
              }
            />
            <div className="border border-undpoint opacity-80 my-2"></div>
            <div className="flex flex-col items-start">
              <div className="text-lg font-bold text-undpoint">
                가입 가능 연령 확인
              </div>
              <div className="text-xs font-bold text-undtextgray">
                만 14세 미만은 법적 보호자 동의없이 가입할 수 없어요.
              </div>
              <div className="flex flex-col gap-4 mt-4">
                <CheckBox
                  checked={ageCheck.under14}
                  onChange={(checked) => handleAgeCheck("under14", checked)}
                  value={"만 14세 미만입니다."}
                />
                <CheckBox
                  checked={ageCheck.over14}
                  onChange={(checked) => handleAgeCheck("over14", checked)}
                  value={"만 14세 이상입니다."}
                />
              </div>
            </div>
          </SignupModal>
        )}
      </div>
    </div>
  );
};

export default LoginComponent;

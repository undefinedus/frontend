import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/commons/Button";
import Input from "../../components/commons/Input";
import useCustomLogin from "../../hooks/useCustomLogin";

const initState = {
  email: "",
  pw: "",
};

const LoginComponent = () => {
  const [loginParam, setLoginParam] = useState({ ...initState });

  const { doLogin, moveToPath, isLogin } = useCustomLogin();

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
        alert("이메일 혹은 패스워드를 확인해 주세요.");
      } else {
        moveToPath("/myBook");
      }
    });
  };

  // const handleKeyDown = (e) => {
  //   if (e.key === "Enter") {
  //     handleClickLogin;
  //   }
  // };

  return (
    <div className="p-8">
      <div className="flex justify-center">
        <img src="/assets/logos/gongchaekWithText.png" alt="logo" />
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <Input
          label="아이디"
          type="text"
          name="email"
          value={loginParam.email}
          onChange={handleChange}
          placeholder={"아이디를 입력해 주세요."}
        />
        <Input
          label="비밀번호"
          type="password"
          name="pw"
          value={loginParam.pw}
          onChange={handleChange}
          placeholder={"비밀번호를 입력해 주세요."}
        />
      </div>
      <div className="flex justify-end mt-3 mb-10 text-undpoint">
        <Link to="/findPassword" className="underline">
          비밀번호 찾기
        </Link>
      </div>

      <div className="flex flex-col justify-center gap-2">
        <Button
          className="text-white py-2.5 rounded-full font-semibold w-full"
          color="undpoint"
          onClick={handleClickLogin}
        >
          로그인
        </Button>
        <Button className="text-undpoint py-3 rounded-full font-semibold w-full">
          <img
            className="rounded-full h-[45.6px]"
            src="/assets/img/kakao_login.png"
            alt=""
          />
        </Button>
      </div>

      <div className="flex justify-center mt-16 underline  text-undpoint">
        <Link to="/signup">회원가입</Link>
      </div>
    </div>
  );
};

export default LoginComponent;

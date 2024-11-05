import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/commons/Button";
import Input from "../../components/commons/Input";
import logo from "../../assets/logos/gongchaekWithText.png";
import kakaoLogin from "../../assets/img/kakao_login.png";

const initState = {
  email: "",
  password: "",
};

function Login(props) {
  const [loginParam, setLoginParam] = useState({ ...initState });

  const handleChange = (e) => {
    loginParam[e.target.name] = e.target.value;

    setLoginParam({ ...loginParam });
  };

  const navigate = useNavigate();

  return (
    <div className="p-8">
      <div className="flex justify-center">
        <img src={logo} alt="logo" />
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <Input
          label="아이디"
          type="id"
          name="id"
          placeholder={"아이디를 입력해 주세요."}
        />
        <Input
          label="비밀번호"
          type="password"
          name="password"
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
        >
          로그인
        </Button>
        <Button className="text-undpoint py-3 rounded-full font-semibold w-full">
          <img className="rounded-full h-[45.6px]" src={kakaoLogin} alt="" />
        </Button>
      </div>
      <div className="flex justify-center mt-16  text-undpoint">
        <Link to="/signup">회원가입</Link>
      </div>
    </div>
  );
}

export default Login;

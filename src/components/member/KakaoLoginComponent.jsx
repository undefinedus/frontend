import React from "react";
import { getKakaoLoginLink } from "../../api/kakaoApi";
import { Link, replace, useNavigate } from "react-router-dom";

const link = getKakaoLoginLink();

function KakaoLoginComponent(props) {
  const navigate = useNavigate();
  return (
    <div>
      <Link to={link}>
        <img
          className="rounded-full w-full"
          src="/public/assets//img/kakao_login.png"
          alt="카카오로 시작하기 버튼 이미지"
        />
      </Link>
    </div>
  );
}

export default KakaoLoginComponent;

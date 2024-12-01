import { Link } from "react-router-dom";
import { getKakaoLoginLink } from "../../api/kakaoApi";

const link = getKakaoLoginLink;

const KakaoLoginComponent = (props) => {

  const handleKakaoLogin = (e) => {
    e.preventDefault();
    const kakaoAuthUrl = getKakaoLoginLink();
    window.location.href = kakaoAuthUrl;
  };

  return ( 
    <button onClick={handleKakaoLogin} className="w-full">
        <img
            className="rounded-full"
            src="/assets/img/kakao_login.png"
            alt="카카오 로그인"
          />
          <Link to={link}></Link>
    </button>
  );
}

export default KakaoLoginComponent;

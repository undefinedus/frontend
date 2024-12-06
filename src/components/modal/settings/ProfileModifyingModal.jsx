import React, { useEffect, useRef, useState } from "react";
import SlrModalLayout from "../../../layouts/SlrModalLayout";
import { getMySocialInfo } from "../../../api/social/mySocialAPI";
import { nicknameDuplicateCheck } from "../../../api/signupApi";
import { PiCameraFill, PiXCircleFill } from "react-icons/pi";
import PortraitPlaceholder from "../../commons/PortraitPlaceholder";

const ProfileModifyingModal = ({ onClose }) => {
  const [myInfo, setMyInfo] = useState({});
  const fileInputRef = useRef(null);
  const [profileImg, setProfileImg] = useState("");
  const [nickname, setNickname] = useState("");
  const [isValidNickname, setIsValidNickname] = useState(false);
  const [wrongNickname, setWrongNickname] = useState(false);
  const [isReady, setIsReady] = useState(null);

  // 초기 정보 로드
  useEffect(() => {
    fetchMyInfo();
  }, []);

  // 닉네임 유효성 검사
  useEffect(() => {
    if (nickname.trim() === "") {
      setIsValidNickname(null);
      setIsReady(false); // 바로 isReady를 false로 설정
      return;
    }
    fetchValidNickname();
  }, [nickname]);

  useEffect(() => {
    if (
      (isValidNickname === true && nickname !== myInfo.nickname) ||
      profileImg !== myInfo.profileImage
    ) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [isValidNickname, nickname, profileImg]);

  const fetchMyInfo = async () => {
    try {
      const res = await getMySocialInfo();
      console.log(res.data);
      setMyInfo(res.data);
      setProfileImg(res.data.profileImage);
      setNickname(res.data.nickname);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchValidNickname = async () => {
    if (nickname.trim() === "") {
      setIsValidNickname(null);
      return;
    }
    if (!nicknameChecker(nickname)) {
      setWrongNickname(true);
      return;
    }
    try {
      const res = await nicknameDuplicateCheck(nickname);
      console.log("nickname check: ", res);
      setIsValidNickname(res.result === true);
      setWrongNickname(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleProfileChange = (target) => {
    const file = target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImg(e.target.result); // 선택한 파일의 데이터를 profileImg에 설정
      };
      reader.readAsDataURL(file); // 파일 데이터를 Base64로 읽음
    }
  };

  const handleChangeNickname = (e) => {
    const val = e.target.value;
    if (val.length <= 10) {
      setNickname(val);
    }
  };

  const nicknameChecker = (nickname) => {
    if (!nickname || nickname.trim() === "") {
      return false;
    }
    const regex = /^[가-힣a-zA-Z0-9]+$/;
    return regex.test(nickname);
  };

  return (
    <SlrModalLayout size={"profile"} onClose={() => onClose(false)}>
      <div className="flex flex-col items-center">
        {/* 프로필사진 */}
        <div className="relative rounded-full shadow-md flex justify-center items-center">
          {profileImg === "defaultProfileImag.jpg" ? (
            <PortraitPlaceholder iconSize={72} circleSize={28} />
          ) : (
            <div className="w-28 h-28 rounded-full">
              <img
                alt="myProfileImage"
                src={
                  "https://gongchaekbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%80%E1%85%A9%E1%86%AF%E1%84%8C%E1%85%A1%E1%84%85%E1%85%B5.png"
                }
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          )}

          <div
            className="absolute w-10 h-10 shadow-md bottom-0 -end-4 bg-white rounded-full flex justify-center items-center"
            onClick={() => fileInputRef.current.click()}
          >
            <PiCameraFill size={24} color={"#0c0a09"} />
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={(e) => handleProfileChange(e.target)}
              style={{ display: "none" }}
            />
          </div>
        </div>

        {/* 닉네임 */}
        <div className="mx-4 border-b pb-2 border-undpoint w-52 mt-8 flex items-center">
          <div className="w-1/12"></div>
          <input
            className="w-10/12 text-und16 font-extrabold text-center"
            value={nickname}
            onChange={(e) => handleChangeNickname(e)}
          />
          <div
            className="w-1/12 flex items-center justify-center"
            onClick={() => {
              setNickname("");
              setIsValidNickname(null);
              setIsReady(false);
            }}
          >
            <PiXCircleFill size={20} color={"#7d5c4d"} />
          </div>
        </div>

        {/* 닉네임 안내 메세지 */}
        <div className="w-full mt-4">
          <p
            className={`text-und14 ${
              isValidNickname === false || wrongNickname
                ? "text-undred"
                : "text-undtextgray"
            }`}
          >
            {isValidNickname === null
              ? "한글, 영문, 숫자 선택 혼용 2~10자로 입력해 주세요"
              : isValidNickname && !wrongNickname
              ? "사용 가능한 닉네임입니다"
              : wrongNickname
              ? "한글, 영문, 숫자 선택 혼용 2~10자로 입력해 주세요"
              : "이미 등록된 닉네임입니다"}
          </p>
        </div>

        {/* 버튼 */}
        <div className="fixed bottom-7 px-7 w-full">
          <button
            className={`w-full py-2.5 rounded-full text-und18 ${
              isReady
                ? "bg-undpoint text-white"
                : "bg-unddisabled text-undtextgray"
            }`}
          >
            수정하기
          </button>
        </div>
      </div>
    </SlrModalLayout>
  );
};

export default ProfileModifyingModal;

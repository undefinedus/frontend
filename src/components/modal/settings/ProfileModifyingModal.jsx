import { useEffect, useRef, useState } from "react";
import SlrModalLayout from "../../../layouts/SlrModalLayout";
import { nicknameDuplicateCheck } from "../../../api/signupApi";
import { PiCameraFill, PiXCircleFill } from "react-icons/pi";
import PortraitPlaceholder from "../../commons/PortraitPlaceholder";
import {
  deleteProfileImage,
  modifyProfile,
} from "../../../api/settings/myPageApi";
import TwoButtonModal from "../commons/TwoButtonModal";

const ProfileModifyingModal = ({ onClose, myInfo, setRefresh }) => {
  const fileInputRef = useRef(null);
  const [profileImg, setProfileImg] = useState("");
  const [nickname, setNickname] = useState("");
  const [isValidNickname, setIsValidNickname] = useState(false);
  const [wrongNickname, setWrongNickname] = useState(false);
  const [isReady, setIsReady] = useState(null);
  const [optionModalOpen, setOptionModalOpen] = useState(false);
  const [resetProfileImage, setResetProfileImage] = useState(false);

  useEffect(() => {
    setProfileImg(myInfo.profileImage);
    setNickname(myInfo.nickname);
  }, [myInfo]);

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

  const handleSubmit = async () => {
    if (!isReady) return;

    if (resetProfileImage) {
      fetchDeleteProfileImage();
    }

    const formData = new FormData();

    const file = fileInputRef.current.files[0];

    if (file) {
      formData.append("profileImage", file);
    }

    if (nickname && nickname !== "") {
      formData.append("nickname", nickname);
    }

    try {
      const res = await modifyProfile(formData);
      console.log("Profile updated successfully: ", res);
      setRefresh((prev) => !prev);
      handleCloseOptionModal();
      onClose(false);
    } catch (error) {
      console.error("Failed to update profile: ", error);
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
      setResetProfileImage(false);
    }
  };

  const handleChangeNickname = (e) => {
    const val = e.target.value;
    if (val.length <= 10) {
      setNickname(val);
    }
  };

  const handleResetProfileImage = (boolean) => {
    setResetProfileImage(boolean);
    handleCloseOptionModal();
  };

  const nicknameChecker = (nickname) => {
    if (!nickname || nickname.trim() === "") {
      return false;
    }
    const regex = /^[가-힣a-zA-Z0-9]+$/;
    return regex.test(nickname);
  };

  const handleOpenOptionModal = () => {
    setOptionModalOpen(true);
  };

  const handleCloseOptionModal = () => {
    setOptionModalOpen(false);
  };

  const fetchDeleteProfileImage = async () => {
    try {
      const res = await deleteProfileImage();
      console.log("delete profileImage: ", res);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SlrModalLayout size={"profile"} onClose={() => onClose(false)}>
      <div className="flex flex-col items-center">
        {/* 프로필사진 */}
        <div
          className="relative rounded-full shadow-md flex justify-center items-center"
          onClick={handleOpenOptionModal}
        >
          {profileImg === "defaultProfileImage.jpg" || resetProfileImage ? (
            <PortraitPlaceholder iconSize={72} circleSize={28} />
          ) : (
            <div className="w-28 h-28 rounded-full">
              <img
                alt="myProfileImage"
                src={profileImg}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          )}

          <div className="absolute w-10 h-10 shadow-md bottom-0 -end-4 bg-white rounded-full flex justify-center items-center">
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
            onClick={handleSubmit}
          >
            수정하기
          </button>
        </div>
      </div>
      {optionModalOpen && (
        <TwoButtonModal
          cancelText="기본 프로필"
          onCancel={() => handleResetProfileImage(true)}
          confirmText="프로필 변경"
          onConfirm={() => {
            fileInputRef.current.click();
            handleCloseOptionModal();
          }}
          onClose={handleCloseOptionModal}
        >
          <p>{`                 ↑                  `}</p>
          {`<--------------- 취소 --------------->`}
        </TwoButtonModal>
      )}
    </SlrModalLayout>
  );
};

export default ProfileModifyingModal;

import { useEffect, useRef, useState } from "react";
import SlrModalLayout from "../../../layouts/SlrModalLayout";
import { nicknameDuplicateCheck } from "../../../api/signupApi";
import { PiCameraFill, PiXCircleFill } from "react-icons/pi";
import PortraitPlaceholder from "../../commons/PortraitPlaceholder";
import {
  deleteProfileImage,
  modifyProfile,
} from "../../../api/settings/myPageApi";
import { debounce } from "lodash";
import TwoButtonModal from "../commons/TwoButtonModal";
import { useDispatch } from "react-redux";
import { triggerRefresh } from "../../../slices/myPageRefreshSlice";

const ProfileModifyingModal = ({ onClose, myInfo }) => {
  const fileInputRef = useRef(null);
  const [profileImg, setProfileImg] = useState("");
  const [nickname, setNickname] = useState("");
  const [isValidNickname, setIsValidNickname] = useState(null);
  const [isReady, setIsReady] = useState(null);
  const [optionModalOpen, setOptionModalOpen] = useState(false);
  const [resetProfileImage, setResetProfileImage] = useState(false);
  const [validText, setValidText] = useState(
    "한글, 영문, 숫자 선택 혼용 2~10자로 입력해 주세요"
  );
  const [isInitState, setIsInitState] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setProfileImg(myInfo.profileImage);
    setNickname(myInfo.nickname);
    setIsInitState(true);
  }, [myInfo]);

  // 닉네임 유효성 검사 함수
  const validateNickname = (nickname) => {
    if (!nickname || nickname.trim() === "") {
      return false;
    }
    const regex = /^[가-힣a-zA-Z0-9]{2,10}$/;
    return regex.test(nickname);
  };

  // 디바운스된 닉네임 검사 함수
  const debouncedNicknameCheck = useRef(
    debounce(async (nickname) => {
      if (!nickname || isInitState) {
        setIsValidNickname(null);
        setValidText("한글, 영문, 숫자 선택 혼용 2~10자로 입력해 주세요");
        return;
      }

      if (!validateNickname(nickname)) {
        setIsValidNickname(false);
        setValidText("한글, 영문, 숫자 선택 혼용 2~10자로 입력해 주세요");
        return;
      }

      try {
        const { result } = await nicknameDuplicateCheck(nickname);
        setIsValidNickname(result);
        setValidText(
          result ? "사용 가능한 닉네임입니다." : "이미 등록된 닉네임입니다."
        );
      } catch (error) {
        setIsValidNickname(false);
        setValidText(error.message || "닉네임 검증 중 오류가 발생했습니다.");
      }
    }, 500)
  ).current;

  // 닉네임 변경 감지
  useEffect(() => {
    if (isInitState) {
      setIsInitState(false);
      return;
    }
    debouncedNicknameCheck(nickname.trim());
  }, [nickname]);

  useEffect(() => {
    // 버튼 활성화 조건: 닉네임이 변경되었거나, 프로필 이미지가 변경되었거나, 초기화된 경우
    if (
      (isValidNickname && nickname !== myInfo.nickname) || // 닉네임이 변경되고 유효한 경우
      resetProfileImage || // 프로필 이미지를 초기화한 경우
      (fileInputRef.current && fileInputRef.current.files[0]) // 새로운 프로필 이미지를 업로드한 경우
    ) {
      setIsReady(true); // 버튼 활성화
    } else {
      setIsReady(false); // 버튼 비활성화
    }
  }, [
    isValidNickname,
    nickname,
    myInfo.nickname,
    resetProfileImage,
    profileImg,
  ]);

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
      dispatch(triggerRefresh());
      handleCloseOptionModal();
      onClose(false);
    } catch (error) {
      console.error("Failed to update profile: ", error);
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
      setResetProfileImage(false); // 초기화 상태 해제
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
      dispatch(triggerRefresh());
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
              isValidNickname === false ? "text-undred" : "text-undtextgray"
            }`}
          >
            {validText}
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
          confirmText="사진 추가"
          onConfirm={() => {
            fileInputRef.current.click();
            handleCloseOptionModal();
          }}
          onClose={handleCloseOptionModal}
        >
          <p className="text-und16 text-undclickbrown font-bold">
            변경할 프로필 이미지를 선택하세요
          </p>
        </TwoButtonModal>
      )}
    </SlrModalLayout>
  );
};

export default ProfileModifyingModal;

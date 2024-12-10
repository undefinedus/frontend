import React, { useEffect, useRef, useState } from "react";
import Calendar from "../../commons/Calendar";
import CheckBox from "../../commons/CheckBox";
import Button from "../../commons/Button";
import DatePickerSlider from "../../commons/DatePickerSlider";
import { debounce } from "lodash";
import { modifyUserInfo } from "../../../api/settings/myPageApi";
import { useNavigate } from "react-router-dom";

const UserInfo = ({ data, setRefresh }) => {
  const navigate = useNavigate();
  const [birth, setBirth] = useState();
  const [gender, setGender] = useState();
  const [buttonDisableCondition, setButtonDisableCondition] = useState(true);
  const [maxDate, setMaxDate] = useState();

  useEffect(() => {
    setBirth(data?.birth);
    setGender(data?.gender);
    setMaxDate(generateMaxDate());
  }, [data]);

  const generateMaxDate = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 14);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`; // "yyyy-mm-dd" 형식으로 반환
  };

  const handleChangeBirth = (date) => {
    setBirth(date);
    setButtonDisableCondition(false);
  };

  const handleGenderCheck = (selectedGender) => {
    setGender(selectedGender);
    setButtonDisableCondition(false);
  };

  const handleSubmit = async () => {
    try {
      const res = await modifyUserInfo(birth, gender);
      console.log("res: ", res);
      if (res === "success") {
        setRefresh();
        navigate({ pathname: "/settings/myPage" }, { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-5">
        <div>
          <span className="flex justify-start mt-2 text-undtextdark text-und16">
            생년월일
          </span>
          <DatePickerSlider
            date={birth}
            setDate={handleChangeBirth}
            minDate={"1900-01-01"}
            maxDate={maxDate}
          >
            <div className="w-full ps-5 py-3.5 border text-start border-undtextgray rounded-full bg-white text-und16 text-undtextdark">
              {birth?.replaceAll("-", "")}
            </div>
          </DatePickerSlider>
        </div>

        <div>
          <div className="flex flex-col text-base">
            <span className="flex justify-start text-undtextdark text-und16 mt-2">
              성별
            </span>
            <div className="w-full flex">
              <div className="w-1/2">
                <CheckBox
                  checked={gender === "MALE"}
                  onChange={() => handleGenderCheck("MALE")}
                  value="남성"
                />
              </div>
              <div className="w-1/2">
                <CheckBox
                  checked={gender === "FEMALE"}
                  onChange={() => handleGenderCheck("FEMALE")}
                  value="여성"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-7 left-0 right-0 px-6">
        <Button
          className="py-2.5 rounded-full w-full"
          color={buttonDisableCondition ? "unddisabled" : "undpoint"}
          buttonDisabled={buttonDisableCondition}
          onClick={handleSubmit}
        >
          수정하기
        </Button>
      </div>
    </div>
  );
};

export default UserInfo;

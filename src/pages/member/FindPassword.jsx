import React from "react";
import Button from "../../components/commons/Button";
import Input from "../../components/commons/Input";

function FindPassword(props) {
  return (
    <div className="flex flex-col items-center p-8 h-screen">
      <p className="mb-14 mt-5 font-bold text-undpoint text-xl">
        비밀번호 찾기
      </p>
      <div className="w-full flex flex-col gap-4">
        <div>
          <Input
            label="아이디"
            type="email"
            name="id"
            placeholder="이메일을 입력해 주세요."
          />
        </div>

        <div className="flex justify-center">
          <Button className=" py-2.5 rounded-full w-full" color="unddisabled">
            인증번호 전송
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FindPassword;

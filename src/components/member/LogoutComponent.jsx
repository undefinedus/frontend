import React from "react";
import { logout } from "../../slices/loginSlice";
import { useDispatch } from "react-redux";
import Button from "../commons/Button";
import useCustomLogin from "../../hooks/useCustomLogin";

function LogoutComponent(props) {
  const { doLogout, moveToPath } = useCustomLogin();

  const handleClickLogout = () => {
    doLogout();
    alert("로그아웃되었습니다.");
    moveToPath("/");
  };

  return (
    <div className="p-3 relative ">
      <Button color="undpoint" onClick={handleClickLogout}>
        로그아웃
      </Button>
    </div>
  );
}

export default LogoutComponent;

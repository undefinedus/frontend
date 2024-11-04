import { useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

// 이건 안쓸지도 모름
const useCustomMove = () => {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [queryParams] = useSearchParams();

  const anchorId = queryParams.get("anchorId") || null;

  const createQueryStr = (anchorParam) => {
    return createSearchParams({
      anchorId: anchorParam || anchorId,
    }).toString();
  };

  const moveToList = (anchorParam) => {
    const queryStr = createQueryStr(anchorParam);
    setRefresh((prev) => !prev);
    navigate({ pathname: "../list", search: queryStr });
  };

  const moveToModify = (bno) => {
    const queryStr = createQueryStr();
    navigate({ pathname: `../modify/${bno}`, search: queryStr });
  };

  const moveToRead = (bno) => {
    const queryStr = createQueryStr();
    navigate({ pathname: `../read/${bno}`, search: queryStr });
  };

  return { refresh, anchorId, moveToList, moveToModify, moveToRead };
};

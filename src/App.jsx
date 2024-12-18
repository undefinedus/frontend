// 원래 console.error를 저장
const originalConsoleError = console.error;

console.error = (...args) => {
  // 메시지가 문자열인지 확인하고 특정 문자열 포함 여부 확인
  if (
    typeof args[0] === "string" &&
    args[0].includes("ReactDOM.unstable_renderSubtreeIntoContainer")
  ) {
    return; // 특정 경고 무시
  }

  // 원래의 console.error 호출 (무한 루프 방지)
  originalConsoleError(...args);
};

import "./App.css";
import AppRouter from "./router/AppRouter";

const App = () => <AppRouter />;

export default App;

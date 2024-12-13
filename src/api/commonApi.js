export const API_SERVER_HOST =
  import.meta.env.MODE === "development" // 실행 환경이
    ? import.meta.env.VITE_API_SERVER_HOST // development 일 경우 : 자신의 ip 작성 -> .env 파일에서 import
    : import.meta.env.VITE_API_SERVER_HOST_DEPLOY; // production 일 경우 : 백엔드 배포 주소

export const API_SERVER_HOST =
  import.meta.env.MODE === "development"
    ? "http://localhost:8080"
    : "http://52.78.190.92:8080";

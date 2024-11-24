import React from "react";

const LoginSpinner = ({ size = "sm", className = "" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className={`inline-block ${sizeClasses[size]} ${className}`}>
      <div className="w-full h-full border-2 border-b-transparent border-undtextgray rounded-full animate-spin" />
    </div>
  );
};

export default LoginSpinner;

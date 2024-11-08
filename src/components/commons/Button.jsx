const Button = ({ className, color, children, ...props }) => {
  const colorClasses = {
    undpoint: "bg-undpoint text-white border ",
    unddisabled: "bg-unddisabled text-undtextgray",

    // 필요한 색상 추가
  };

  return (
    <button {...props} className={`${colorClasses[color]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;

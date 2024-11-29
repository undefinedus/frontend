const ToggleButton = ({ onChange, checked = false, id = "toggle" }) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <ul className="list-none m-0 p-0">
      <li className="list-none m-0 p-0">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={handleChange}
          className="sr-only peer"
        />
        <label
          htmlFor={id}
          className={`
            block relative w-11 h-6 cursor-pointer
            bg-unddisabled border border-unddisabled rounded-full
            transition-all duration-200 ease-[cubic-bezier(0.4,0.0,0.2,1)]
            peer-checked:bg-undpoint
            
            before:content-['']
            before:block
            before:absolute
            before:top-0.5
            before:left-0.5
            before:bg-white
            before:w-[calc(50%-2px)]
            before:h-[calc(100%-4px)]
            before:rounded-full
            before:transition-transform before:duration-200 before:ease-[cubic-bezier(0.4,0.0,0.2,1)]
            before:shadow-[0_0_0_1px_rgba(0,0,0,0.1),0_4px_0_rgba(0,0,0,0.08)]
            peer-checked:before:translate-x-[100%]
            
            hover:before:scale-95
            active:before:scale-90
            
            after:content-['']
            after:absolute
            after:top-0
            after:left-0
            after:w-full
            after:h-full
            after:rounded-full
            after:transition-all
            after:duration-300
            hover:after:bg-black/5
            active:after:bg-black/10
          `}
        />
      </li>
    </ul>
  );
};

export default ToggleButton;

import { useState } from "react";

const ReusableDropdown = ({
  selectedValue,
  dropdownList,
  onDropdownSelect,
}) => {
  const [dropdownFlag, setDropdownFlag] = useState(false);
  const [dropDownValue, setDropDownValue] = useState("");

  const handleSelect = (option) => {
    setDropDownValue(option);
    setDropdownFlag(false);
    onDropdownSelect?.(option); // Pass value to parent
  };
  return (
    <>
      <div
        className={`dropdown dropdown-bottom block
           ${dropdownFlag ? "dropdown-open" : "dropdown-close"}`}
      >
        <button
          tabIndex={0}
          role="button"
          className="input text-md w-full max-w-xl h-10 text-lg"
          onClick={() => {
            setDropdownFlag(true);
          }}
        >
          {selectedValue || dropDownValue || "Select"}
        </button>
        {dropdownFlag && (
          <ul
            tabIndex="-1"
            className="dropdown-content menu bg-base-100 rounded-box 
              z-1 p-2 shadow-sm w-full"
          >
            {dropdownList.map((option, index) => (
              <li key={index} className="w-full my-1">
                <button
                  className=" text-lg"
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ReusableDropdown;

import React from "react";
import Popper from "popper.js";
import ClearButton from "../ClearButton"



const Dropdown = ({ color, label, options, value, onSelect }) => {
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const [term, setTerm] = React.useState('')
  const [dropdownIcon, setDropdownIcon] = React.useState("chevron-down-outline");
  const btnDropdownRef = React.createRef();
  const inputDropdownRef = React.createRef()
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    new Popper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    inputDropdownRef.current.focus();
  };

  const closeDropdownPopover = () => {
    inputDropdownRef.current.blur();
  };

  const optionClickHandler = (e, option) => {
    e.preventDefault();
    setTerm(option.label)
    onSelect(option)
    closeDropdownPopover()
  }

  const blurHandler = (e) => {
    e.preventDefault()
    setDropdownPopoverShow(false);
    setDropdownIcon("chevron-down-outline");
  }

  const focusHandler = (e) => {
    console.log('focusing', e)
    e.stopPropagation()
    setDropdownPopoverShow(true);
    setDropdownIcon("chevron-up-outline");
  }

  const inputChangeHandler = (e) => {
    setTerm(e.target.value);
  };

  const clearHandler = (e) => {
    e.preventDefault()
    setTerm('')
    onSelect({ label: 'All', value: ''})
  }

  const dropdownClickHandler = () => {
    (dropdownPopoverShow) ? closeDropdownPopover() : openDropdownPopover()
  }

  const filteredOptions = (options.length > 0) ? options.filter(option => option.label.toLowerCase().includes(term.toLowerCase())) : options

  return (
    <>
      <div className="flex flex-wrap" onClick={dropdownClickHandler}>
        <div className="w-full">
          <div
            className="relative inline-flex align-middle w-full"
            ref={btnDropdownRef}
          >
            <div className="flex w-full py-2 px-2 bg-white shadow-sm rounded-lg text-lg border border-solid border-gray-200 bg-transparent focus-within:border-primary focus-within:border-solid focus-within:border hover:border-gray-500">
              <input
                onBlurCapture={blurHandler}
                onFocusCapture={focusHandler}
                onChange={inputChangeHandler}
                onMouseDown={(e) => e.preventDefault()}
                value={term}
                ref={inputDropdownRef}
                className="flex-1 w-full mx-2 border-0 outline-none bg-transparent text-sm"
                placeholder={label}
              />
              <ClearButton clearable={!!term} onClear={clearHandler}/>
              <div className="text-gray-600 border-l border-gray-300 border-solid my-auto pl-1 cursor-pointer">
                <ion-icon class="block"  name={dropdownIcon}></ion-icon>
              </div>
            </div>

            <div
              ref={popoverDropdownRef}
              className={
                (dropdownPopoverShow ? "block " : "hidden ") +
                "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 max-h-64 overflow-auto"
              }
              style={{ minWidth: "12rem" }}
            >
              {filteredOptions.map((option) => (
                <div
                  className="hover:bg-secondary-1  text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap cursor-pointer"
                  onMouseDown={(e) => optionClickHandler(e, option)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dropdown


import { useState } from "react";
import ClearButton from "./ClearButton"

const SearchInput = (props) => {
  let { onSearch, term, setTerm } = props

  function inputHandler(event) {
    setTerm(event.target.value);
  }

  const clearHandler = () => {
    setTerm('')
  } 
  
  return (
    <div className="flex w-full py-2 px-2 bg-white shadow-sm rounded-lg text-lg border border-solid border-gray-200 bg-transparent focus-within:border-primary focus-within:border-solid focus-within:border hover:border-gray-500">
      {/* <ion-icon name="search-outline" className="gray-600"></ion-icon> */}
      <input
        onKeyPress={onSearch}
        onChange={inputHandler}
        value={term}
        className="flex-1 w-full mx-2 border-0 outline-none bg-transparent text-sm"
        placeholder="Name, City, or Phone"
      />
      <ClearButton clearable={!!term} onClear={clearHandler} />
      <div className="text-gray-600 border-l border-gray-300 border-solid my-auto pl-1">
        <ion-icon class="block" name="search-outline"></ion-icon>
      </div>
    </div>
  );
}

export default SearchInput;
import { useState } from "react";


const SearchInput = (props) => {
  let { onSearch } = props
  let [term, setTerm] = useState('')

  function inputHandler(event) {
    setTerm(event.target.value);
  }

  
  return (
    <div className="flex lg:w-3/4  md:w-full py-2 px-2 bg-white shadow-sm rounded-lg text-lg border border-solid border-gray-200 bg-transparent focus-within:border-primary focus-within:border-solid focus-within:border hover:border-gray-500">
      <ion-icon name="search-outline" className="gray-600"></ion-icon>
      <input
        onKeyPress={onSearch}
        onChange={inputHandler}
        value={term}
        className="flex-1 w-full mx-2 border-0 outline-none bg-transparent text-sm"
        placeholder="Search by Name, City, or State"
      />
    </div>
  );
}

export default SearchInput;
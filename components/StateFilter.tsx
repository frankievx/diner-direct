import { useState } from "react";
import Dropdown from "./global/Dropdown";
import Select from "./global/Select"

const StateFilter = ({ states, selected, onFilter }) => {
  const [term, setTerm] = useState(selected);
  const options = states.map((state) => ({ label: state, value: state }));
  // options.unshift({ label: 'All', value: ''})


 const selectHandler = (selected) => {
    onFilter(selected.value)
 }

  return (
    <>
      <Dropdown label="All States" options={options} onSelect={selectHandler} />
    </>
  );
};

export default StateFilter;

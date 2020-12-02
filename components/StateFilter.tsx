import { useState } from "react";
import Dropdown from "./global/Dropdown";
import Select from "./global/Select"

const StateFilter = ({ states, selected, onFilter }) => {
  const options = states.map((state) => ({ label: state, value: state }));

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

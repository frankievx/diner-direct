import { useState } from "react";
import useSWR from "swr";
import fetcher from '../utils/fetcher'
import Dropdown from './global/Dropdown'

const GenreFilter = ({ genres, genre, onFilter }) => {
  const [term, setTerm] = useState('');
  const options = genres.map(genre => ({ label: genre, value: genre}))
  // options.unshift({ label: "All", value: "" });

  const selectHandler = (selected) => {
    onFilter(selected.value);
  };

  


  return (
    <>
      <Dropdown label="All Genres" options={options} onSelect={selectHandler} />
    </>
  );
}

export default GenreFilter
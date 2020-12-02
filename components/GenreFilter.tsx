import Dropdown from './global/Dropdown'

const GenreFilter = ({ genres, genre, onFilter }) => {
  const options = genres.map(genre => ({ label: genre, value: genre}))

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
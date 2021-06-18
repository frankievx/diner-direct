import IconButton from "./global/IconButton"
const ClearButton = ({ clearable, onClear, size }) => {
  if (clearable)
    return (
      <IconButton icon="close-outline" onClick={onClear} size={size} />
    );
  else return null;
};

export default ClearButton
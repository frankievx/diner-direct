const ClearButton = ({ clearable, onClear }) => {
  if (clearable)
    return (
      <div
        className="text-gray-600 my-auto mr-1 h-auto cursor-pointer rounded-full hover:bg-gray-200"
        style={{ height: "18px" }}
        onMouseDown={onClear}
      >
        <ion-icon class="block" name="close-outline"></ion-icon>
      </div>
    );
  else return <></>;
};

export default ClearButton
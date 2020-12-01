const TablePagination = ({ limit, offset, count, paginate }) => {
  let min, max;
  if (count === 0) {
    min = 0;
    max = 0;
  } else {
    min = count <= offset ? 0 : offset;
    max = min + limit < count ? min + limit : count - offset;
  }
  const paginateBack = () => {
    if (offset > limit) paginate(offset - limit);
    else paginate(0);
  };
  const paginateForward = () => {
    if (offset + limit < count) paginate(offset + limit);
  };
  return (
    <div className="flex text-gray-800">
      <div
        className="my-auto p-1 text-xl mr-1 h-auto cursor-pointer rounded hover:bg-primary-1 hover:text-primary"
        onClick={paginateBack}
      >
        <ion-icon class="block mx-auto" name="chevron-back-outline"></ion-icon>
      </div>
      <div
        className="my-auto p-1 text-xl mr-1 h-auto cursor-pointer rounded hover:bg-primary-1 hover:text-primary"
        onClick={paginateForward}
      >
        <ion-icon
          class="block mx-auto"
          name="chevron-forward-outline"
        ></ion-icon>
      </div>
      <div className="ml-2 my-auto text-gray-700">
        {min} - {max} of {count}
      </div>
    </div>
  );
};

export default TablePagination;

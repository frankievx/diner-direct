const TablePagination = (props) => {
  let { limit, offset, count, paginate } = props;
  let min = offset;
  let max = offset + limit < count ? offset + limit : count - offset;
  const paginateBack = () => {
    if (offset > limit) paginate(offset - limit)
    else paginate(0)
  }
  const paginateForward = () => {
    if ((offset + limit) < count) paginate(offset + limit);
  };
  return (
    <div className="flex">
      <div
        onClick={paginateBack}
        className="cursor-pointer px-1 h-6 rounded-lg border border-solid border-gray-500 mr-1"
      >
        <ion-icon name="chevron-back-outline"></ion-icon>
      </div>
      <div
        onClick={paginateForward}
        className="cursor-pointer px-1 h-6 rounded-lg border border-solid border-gray-500"
      >
        <ion-icon name="chevron-forward-outline"></ion-icon>
      </div>
      <div className="ml-2">
        {min} - {max} of {count}
      </div>
    </div>
  );
};

export default TablePagination;

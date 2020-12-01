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
    <div className="flex text-gray-800">
      <div
        className="my-auto p-1 text-xl mr-1 h-auto cursor-pointer rounded hover:bg-primary-1 hover:text-primary"
        // style={{ height: "24px" }}
        onClick={paginateBack}
      >
        <ion-icon class="block mx-auto" name="chevron-back-outline"></ion-icon>
      </div>
      <div
        className="my-auto p-1 text-xl mr-1 h-auto cursor-pointer rounded hover:bg-primary-1 hover:text-primary"
        // style={{ height: "24px" }}
        onClick={paginateForward}
      >
        <ion-icon
          class="block mx-auto"
          name="chevron-forward-outline"
        ></ion-icon>
      </div>
      {/* <div
        onClick={paginateForward}
        className="cursor-pointer px-1 my-auto rounded-lg border border-solid border-gray-500"
      >
        <ion-icon className="block" name="chevron-forward-outline"></ion-icon>
      </div> */}
      <div className="ml-2 my-auto text-gray-700">
        {min} - {max} of {count}
      </div>
    </div>
  );
};

export default TablePagination;

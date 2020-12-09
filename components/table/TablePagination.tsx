const BackButton = ({ onBack, disable }) => {
  if (!disable)
    return (
      <div
        className="my-auto p-1 text-xl mr-1 h-auto cursor-pointer rounded hover:bg-primary-1 hover:text-primary"
        onClick={onBack}
      >
        <ion-icon class="block mx-auto" name="chevron-back-outline"></ion-icon>
      </div>
    );
  return (
    <div className="my-auto p-1 text-xl mr-1 h-auto rounded text-gray-400 cursor-not-allowed">
      <ion-icon class="block mx-auto" name="chevron-back-outline"></ion-icon>
    </div>
  );
};

const ForwardButton = ({ onForward, disable }) => {
  if (!disable)
    return (
      <div
        className="my-auto p-1 text-xl mr-1 h-auto cursor-pointer rounded hover:bg-primary-1 hover:text-primary"
        onClick={onForward}
      >
        <ion-icon
          class="block mx-auto"
          name="chevron-forward-outline"
        ></ion-icon>
      </div>
    );
  return (
    <div className="my-auto p-1 text-xl mr-1 h-auto rounded text-gray-400 cursor-not-allowed">
      <ion-icon class="block mx-auto" name="chevron-forward-outline"></ion-icon>
    </div>
  );
};

const TablePagination = ({ limit, offset, count, paginate }) => {
  let min,
    max,
    disableBack = true,
    disableForward = false;
  if (count === 0) {
    min = 0;
    max = 0;
  } else {
    min = count <= offset ? 0 : offset;
    max = (min + limit) <= count ? min + limit : count;
  }
  if (offset > 0) disableBack = false;
  if (offset + limit >= count) disableForward = true;

  const paginateBack = () => {
    if (offset > limit) paginate(offset - limit);
    else paginate(0);
  };
  const paginateForward = () => {
    if (offset + limit < count) paginate(offset + limit);
  };
  return (
    <div className="flex text-gray-800">
      <BackButton onBack={paginateBack} disable={disableBack} />
      <ForwardButton onForward={paginateForward} disable={disableForward} />
      <div className="ml-2 my-auto text-gray-700">
        {min} - {max} of {count}
      </div>
    </div>
  );
};

export default TablePagination;

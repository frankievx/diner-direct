import Icon from "../global/Icon";
import TableColumnLabel from "./TableColumnLabel";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
const TableFilterIcon = (props) => {
  let { label, showFilter, setShowFilter } = props;

  return (
    <div
      className="my-auto inline p-1 hover:text-primary align-middle rounded cursor-pointer"
      style={{ height: "26px", width: "26px" }}
      onClick={() => setShowFilter(!showFilter)}
    >
      <ion-icon
        className="hover:bg-gray-300 cursor-pointer inline my-auto"
        name="filter-outline"
      ></ion-icon>
    </div>
  );
};

const TableSortIcon = ({ sortable = false, order = '', index = '' }) => {
  if (sortable) {
    if (order === 'asc') return (
      <div className="text-xs my-auto flex">
        <div className="mr-1 w-6 h-6 flex items-center text-center justify-center text-white rounded bg-primary border border-primary border-solid">
          {index}
        </div>
        <ion-icon name="arrow-up-outline" class="my-auto"></ion-icon>
      </div>
    );
    else if (order === 'desc') return (
      <div className="text-xs my-auto flex items-center">
        <div className="mr-1 w-6 h-6 flex items-center text-center justify-center text-white rounded bg-primary border border-primary border-solid">
          {index}
        </div>
        <ion-icon name="arrow-down-outline" ></ion-icon>
      </div>
    );
    else return (
      <div className="text-xs my-auto flex items-center">
        <ion-icon name="arrow-up-outline" ></ion-icon>
        <ion-icon name="arrow-down-outline"></ion-icon>
      </div>
    );
  }
  return <></>
}

const TableFilterInput = (props) => {
  let { label, showFilter, setShowFilter } = props;
  const [content, setContent] = useState("");

  const changeHandler = (evt) => {
    setContent(evt.target.value);
  };

  return (
    <div className="mx-3 p-1 border border-solid border-gray-200 rounded-lg flex">
      <input
        className="w-full px-2 py-1 outline-none text-sm"
        value={content}
        onChange={changeHandler}
      />
    </div>
  );
};

const TableHeader = ({ column, sort, onSort }) => {
  const headerClassNames = classNames(
    "font-semibold",
    "flex",
    "justify-between",
    "px-2",
    "py-1",
    "mt-3",
    "mb-4",
    "h-8",
    "hover:bg-primary-1",
    "hover:text-primary",
    "text-gray-800",
    "cursor-pointer",
    "rounded",
    { "ml-4": column.index === 0 },
    { "mr-4": column.last }
  );
  const filterClassNames = classNames("m-1", "flex");
  const sortIndex = sort.findIndex(item => item.field === column.field)
  if (column.sortable)
    return (
      <div>
        <div className={headerClassNames} onClick={() => onSort(column.field)}>
          <div className="flex-initial float-left">{column.label}</div>

          <TableSortIcon
            sortable={column.sortable}
            order={sortIndex > -1 ? sort[sortIndex].order : ""}
            index={sortIndex > -1 ? sortIndex + 1 : ""}
          />
        </div>
      </div>
    );
  else
    return (
      <div>
        <div className={headerClassNames}>
          <div className="flex-initial float-left">{column.label}</div>
        </div>
      </div>
    );
};

export default TableHeader;

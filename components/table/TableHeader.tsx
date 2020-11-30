import Icon from "../Icon";
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

const TableHeader = (props) => {
  let { column } = props;
  let [showFilter, setShowFilter] = useState(false);
  let headerClassNames = classNames(
    "font-semibold",
    "flex",
    "justify-between",
    "px-2",
    "py-1",
    "h-8",
    "hover:bg-gray-200",
    "text-gray-800",
    "rounded",
    { "ml-4": column.index === 0},
    {"mr-4": column.last}
  );
  let filterClassNames = classNames("m-1", "flex", { hidden: !showFilter });

  function toggleFilter() {
    setShowFilter(!showFilter);
  }
  if (column.filter)
    return (
      <div>
        <div className={headerClassNames}>
          <div className="flex-initial float-left">{column.label}</div>
          <div className="flex-initial float-right">
            <TableFilterIcon
              showFilter={showFilter}
              setShowFilter={setShowFilter}
            />
          </div>
        </div>
        <div className={filterClassNames}>
          <div className="flex-1 mx-auto">
            <TableFilterInput />
          </div>
        </div>
      </div>
    );
  else
    return (
      <div>
        <div className={headerClassNames}>
          <div className="flex-initial float-left">{column.label}</div>
          {/* <div className="flex-initial float-right">
          <TableFilterIcon />
        </div> */}
        </div>
      </div>
    );
};

export default TableHeader;

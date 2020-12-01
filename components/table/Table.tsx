import { useState } from "react";
import TableFilters from "./TableFilters";
import TablePagination from "./TablePagination";
import TableColumns from "./TableColumns";

const Table = (props) => {
  let { columns, data, filters, offset, limit, count, paginate } = props.config;

  return (
    <div className="w-full border border-solid rounded-lg shadow-sm bg-white hover:border-gray-500">

      <div className="mt-2">
        <div className="my-1">
          <div className="border-solid border-gray-300 ">
            <TableColumns columns={columns} rows={data} />
          </div>
        </div>
        <div className="">
        </div>
      </div>
      <div className="relative border-b border-solid border-gray-300 w-full"></div>
      <div className="">
        <div className="mx-4 my-3">
          <TablePagination
            offset={offset}
            limit={limit}
            count={count}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
};

export default Table;

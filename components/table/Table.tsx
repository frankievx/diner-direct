import { useState } from "react";
import TableFilters from "./TableFilters";
import TablePagination from "./TablePagination";
import TableColumns from "./TableColumns";
import TableImport from "./TableImport";
import Link from "next/link";

const Table = ({ config }) => {
  let {
    columns,
    data,
    filters,
    offset,
    limit,
    count,
    paginate,
    loading,
    sort,
    sortHandler,
  } = config;
  console.log("table sort", sort);

  const downloadJSON = () => {};

  return (
    <div className="w-full border border-solid rounded-lg shadow-sm bg-white min-h-3/4">
      <div className="mt-2">
        <div className="my-1">
          <div className="border-solid border-gray-300 ">
            <TableColumns
              columns={columns}
              rows={data}
              loading={loading}
              sort={sort}
              onSort={sortHandler}
            />
          </div>
        </div>
        <div className=""></div>
      </div>
      <div className="relative border-solid border-gray-300 w-full"></div>
      <div className="">
        <div className="mx-4 my-3 flex justify-between">
          <TablePagination
            offset={offset}
            limit={limit}
            count={count}
            paginate={paginate}
          />
          <div className="flex items-center">
            <a href="/data/restaurants.json" target="_blank" download>
              <div className="text-xs mr-2 py-1 px-2 text-gray-800 rounded-full cursor-pointer hover:bg-gray-200 my-auto flex items-center">
                <ion-icon name="cloud-download-outline" class="mr-1" />
                Sample JSON
              </div>
            </a>
            <TableImport />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;

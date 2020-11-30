import { useState } from "react";
import TableFilters from "./TableFilters";
import TablePagination from "./TablePagination";
import TableColumns from "./TableColumns";

const Table = (props) => {
  let { columns, data, filters, offset, limit, count, paginate } = props.config;

  return (
    <div className="w-full border border-solid rounded-lg shadow-sm bg-white hover:border-gray-500">
      <div className="w-full ">
        <div className="m-4">
          <div className="flex mx-2">
            {/* <div className="font-semibold mr-2 text-gray-800">Filters</div> */}
            <TableFilters filters={filters} />
          </div>
        </div>
      </div>
      <div className="">
        <div className="my-1">
          {/* <TableHeader1 columns={columns} /> */}
          <div className="border-solid border-gray-300 ">
            <TableColumns columns={columns} rows={data} />
            
            {/* <div className="grid grid-flow-col auto-cols-auto">
              {columns.map((column, colIndex) => (
                <div key={"column" + colIndex}>
                  <div
                    className="font-semibold flex justify-between px-2 py-1 mx-1 hover:bg-gray-300  text-gray-800 rounded"
                    key={"header" + colIndex}
                  >
                    <div className="">{column.label}</div>
                    <div className="">
                      <ion-icon name="filter-outline"></ion-icon>
                    </div>
                  </div>
                  {data.map((item, i) => (
                    <div className="text-black text-left" key={"row" + i}>
                      {item[column.field]}
                    </div>
                  ))}
                </div>
              ))}
            </div> */}
            {/* <div className="grid grid-flow-row auto-rows-auto">
              {data.map((item, i) => (
                <div className="text-black" key={"row" + 1}>
                  {item.value}
                </div>
              ))}
            </div> */}
          </div>
        </div>
        <div className="">
          {/* <TableBody1 columns={columns} data={data} /> */}
        </div>

        {/* <TableHeader columns={columns} />
        <TableHeaderBorder columns={columns} />
        <TableBody columns={columns} data={data} /> */}
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

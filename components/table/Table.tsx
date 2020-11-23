import { useState } from "react";
import TableFilters from "./TableFilters";
import TableHeader from "./TableHeader"
import TableHeaderBorder from "./TableHeaderBorder";
import TableBody from "./TableBody";
import TablePagination from "./TablePagination";


const Table = (props) => {
  let { columns, data } = props
  let [ filters, setFilters ] = useState([])
  
  return (
    <div className="w-full border border-solid border-gray-500 rounded-lg shadow-md">
      <div className="w-full ">
        <div className="m-2">
          <div className="flex">
            <div className="font-semibold mr-2">Filters</div>
            <TableFilters filters={filters}/>
          </div>
        </div>
      </div>
      <div className="relative table w-full mt-2">
        <TableHeader columns={columns} />
        <TableHeaderBorder columns={columns}/>
        <TableBody columns={columns} data={data} />
      </div>
      <div className="relative border-b border-solid border-gray-500 w-full"></div>
      <div className="">
        <div className="m-2">
          <TablePagination />
        </div>
      </div>
    </div>
  )
};

export default Table;
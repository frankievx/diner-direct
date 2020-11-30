import TableHeader from './TableHeader'
import TableRows from './TableRows'
import { useState } from 'react'
const TableColumns = (props) => {
  const { columns, rows } = props
  let [hoverIndex, setHoverIndex] = useState(null)
  const unhighlightRow = () => {
    setTimeout(() => setHoverIndex(null), 1);
  };
  return (
    <div
      className="grid grid-flow-col-dense auto-cols-auto "
      onMouseLeave={unhighlightRow}
    >
      {columns.map((column, i) => (
        <div key={"column" + i}>
          <TableHeader
            column={{ ...column, index: i, last: columns.length - 1 === i }}
          />
          <TableRows
            rows={rows}
            columns={columns}
            column={{ ...column, index: i, last: columns.length - 1 === i }}
            hoverIndex={hoverIndex}
            setHoverIndex={setHoverIndex}
          />
          {/* <div
            className="font-semibold flex justify-between px-2 py-1 mx-1 hover:bg-gray-300  text-gray-800 rounded"
          >
            <div className="">{column.label}</div>
            <div className="">
              <ion-icon name="filter-outline"></ion-icon>
            </div>
          </div> */}
          {/* {data.map((item, i) => (
            <div className="text-black text-left" key={"row" + i}>
              {item[column.field]}
            </div>
          ))} */}
        </div>
      ))}
    </div>
  );
}

export default TableColumns;
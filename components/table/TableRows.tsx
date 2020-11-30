import TableCell from './TableCell'
import { useState } from 'react'
const TableRows = (props) => {
  let { rows, column, hoverIndex, setHoverIndex } = props
  let [ maxHeight, setMaxHeight ] = useState(0)

  return (
    <div className="h-full">
      {rows.map((row, i) => (
        <TableCell
          row={{ ...row, index: i, last: rows.length - 1 === i }}
          column={column}
          hoverIndex={hoverIndex}
          setHoverIndex={setHoverIndex}
          key={"row" + i}
        />
        // <div
        //   className="text-black text-left my-1"
        //   key={"row" + i}
        // >
        //   {item[column.field]}
        // </div>
      ))}
    </div>
  );
}

export default TableRows
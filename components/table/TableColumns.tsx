import TableHeader from './TableHeader'
import TableRows from './TableRows'
import { useState } from 'react'
const TableColumns = ({ columns, rows, loading }) => {
  let [hoverIndex, setHoverIndex] = useState(null);
  const unhighlightRow = () => {
    setTimeout(() => setHoverIndex(null), 1);
  };
  if (loading) return (
    <div>
      <div
        className="grid grid-flow-col-dense auto-cols-auto"
        onMouseLeave={unhighlightRow}
      >
        {columns.map((column, i) => (
          <div key={"column" + i}>
            <TableHeader
              column={{ ...column, index: i, last: columns.length - 1 === i }}
            />
          </div>
        ))}
      </div>
      <div className="flex h-96">
        <div className="mx-auto my-auto">Loading...</div>
      </div>
    </div>
  )
  else return (
    <div
      className="grid grid-flow-col-dense auto-cols-auto"
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
            loading={loading}
            setHoverIndex={setHoverIndex}
          />
        </div>
      ))}
    </div>
  );
};

export default TableColumns;
import TableHeader from './TableHeader'
import TableRows from './TableRows'
import { useState } from 'react'
const TableColumns = ({ sort, columns, rows, loading, onSort }) => {
  console.log('sort columns', sort);
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
              sort={sort}
              onSort={onSort}
            />
          </div>
        ))}
      </div>
      <div className="flex h-96">
        <div className="mx-auto my-auto">Loading...</div>
      </div>
    </div>
  );
  else if(rows.length > 0) return (
    <div
      className="grid grid-flow-col-dense auto-cols-auto"
      onMouseLeave={unhighlightRow}
    >
      {columns.map((column, i) => (
        <div key={"column" + i}>
          <TableHeader
            column={{ ...column, index: i, last: columns.length - 1 === i }}
            onSort={onSort}
            sort={sort}
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
  else return (
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
        <div className="mx-auto my-auto">No Records Found.</div>
      </div>
    </div>
  );
};

export default TableColumns;
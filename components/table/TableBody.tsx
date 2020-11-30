const TableBody = (props) => {
  let { columns, data } = props
  return (
    <div className="table-row-group">
      {data.map((item,i) => {
        return (
          <div
            className="table-row hover:bg-accent  py-1"
            key={"row" + i}
          >
            {columns.map((column, i) => {
              return (
                <div
                  className="table-cell px-2 py-1 my-2"
                  key={"cell" + i}
                >
                  {item[column.field]}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  )
}

export default TableBody
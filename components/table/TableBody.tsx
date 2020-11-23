const TableBody = (props) => {
  let { columns, data } = props
  return (
    <div className="table-row-group">
      {data.map(item => {
        return (<div className="table-row hover:bg-gray-300">
          {columns.map(column => {
            return <div className="table-cell px-2 py-1 border-b border-solid">{item[column.field]}</div>
          })}
        </div>
        )
      })}
    </div>
  )
}

export default TableBody
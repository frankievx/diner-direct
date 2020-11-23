const TableHeaderBorder = (props) => {
  let { columns } = props
  return (
    <div className="table-row-group ">
      <div className="table-row">
        {columns.map(column => (<div className="table-cell my-2 border-t border-solid border-gray-500"></div>))}
      </div>
    </div>
  )
}

export default TableHeaderBorder
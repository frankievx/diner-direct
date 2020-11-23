const TableHeader = (props) => {
  let { columns } = props
  return (
    <div className="table-row-group border-b-2 border-solid border-gray-500 ">
      <div className="table-row border-b-2 border-solid border-gray-500">
        {columns.map(column => (
          <div className="table-cell font-semibold px-2 py-1 hover:bg-gray-300">
            <div className="float-left">{column.label}</div>
            <div className="float-right">
              <ion-icon name="filter-outline"></ion-icon>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TableHeader
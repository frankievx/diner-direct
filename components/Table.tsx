const Table = (props) => {
  let { columns, data } = props
  console.log('data', data);
  
  return (
    <div className="relative table w-full border border-solid border-primary rounded-lg shadow-md">
      <div className="table-row-group p-x-2  border-b-2 border-solid border-primary">
        <div className="table-row border-b-2 border-solid border-primary">
          {columns.map(column => {
            return <div className="table-cell font-semibold ">
              {column.label}
              {/* <icon ></icon> */}
            </div>
          })}
        </div>
      </div>
      <div className="table-row-group">
        {data.map(item => {
          return (<div className="table-row">
            {columns.map(column => {
              return <div className="table-cell">{item[column.field]}</div>
            })}
          </div>
          )
        })}
      </div>
      <div>

      </div>
    </div>
  )
};

export default Table;
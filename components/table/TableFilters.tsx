const TableFilters = (props) => {
  const { filters } = props
  if (filters.length > 0) {
    return (
      <div>
        {filters.map(filter => (<div className="w-8 rounded-full bg-primary1 text-lg" ></div>))}
      </div>
    )
  }
  else return <div className="text-base "> No filters </div>
}

export default TableFilters
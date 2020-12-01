import _ from 'lodash'

const StateFilter = (props) => {

}
const TableFilters = (props) => {
  const { filters } = props
  if (filters.length > 0) {
    return (
      <div>
        
        {/* {filters.map((filter,i) => (<div key={'filter'+i} className="py-1 px-2 flex rounded bg-secondary text-sm" >
          {_.capitalize(filter.field)}
          <div className="bg-primary rounded px-1 ml-1 text-white">{filter.value}</div>
        </div>))} */}
      </div>
    )
  }
  else return <div className="text-base "> No filters </div>
}

export default TableFilters
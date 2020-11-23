const TablePagination = (props) => {
  return (
    <div className="flex">
      <div className="px-1 h-6 rounded-lg border border-solid border-gray-500 mr-1"><ion-icon name="chevron-back-outline"></ion-icon></div>
      <div className="px-1 h-6 rounded-lg border border-solid border-gray-500"><ion-icon name="chevron-forward-outline"></ion-icon></div>
      <div className="ml-2">1 - 10 of 100</div>
    </div>
  )
}

export default TablePagination
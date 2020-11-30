const TableColumnLabel = () => {
  return (
    <div className="font-semibold flex justify-between px-2 py-1 mx-1 hover:bg-gray-200  text-gray-800 rounded first:ml-4 last:mr-4">
      <div className="flex-initial float-left">{label}</div>
      <div className="flex-initial float-right">
        <div
          className="my-auto inline p-1 hover:text-primary align-middle rounded cursor-pointer"
          style={{ height: "26px", width: "26px" }}
        >
          <ion-icon
            className="hover:bg-gray-300 cursor-pointer inline my-auto"
            name="filter-outline"
          ></ion-icon>
        </div>
      </div>
    </div>
  );
}

export default TableColumnLabel
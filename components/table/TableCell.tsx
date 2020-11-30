import classNames from 'classnames'
import { useRef } from 'react'
const TableCell = (props) => {
  const { rows, row, column, hoverIndex, setHoverIndex } = props
  const cellRef = useRef()
  
  let borderClasses = classNames({"border-b": !row.last}, "border-solid", "border-gray-200", "last:border-b-0");
  let classes = classNames(
    "text-black",
    "text-left",
    "my-2",
    "py-1",
    'px-1',
    'h-8',
    {
      "rounded-l-lg": column.index === 0,
      "rounded-r-lg": column.last,
      "pl-2": column.index === 0,
      "pr-2": column.last,
      "ml-4": column.index === 0,
      "mr-4": column.last,
      "bg-gray-200": row.index === hoverIndex,
    }
  );
  const highlightRow = () => {
    setHoverIndex(row.index);
  }
  
  return (
    <div className={borderClasses} >
      <div ref={cellRef} className={classes} onMouseEnter={highlightRow}>
        {row[column.field]}
      </div>
    </div>
  );
}

export default TableCell;
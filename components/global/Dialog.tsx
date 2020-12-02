import IconButton from './IconButton'
const Dialog = ({open, title, onClose, children}) => {
  if (!open) {
    return <></>;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
      <div className="relative p-4 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
        <div className="flex justify-between">
          <div className="uppercase text-lg font-semibold my-auto tracking-wide"> {title}</div>
          <IconButton icon="close-outline" onClick={onClose} size="3xl"/>
        </div>
        <div className="mt-4">{children}</div>
        <span className="absolute top-0 right-0 p-4">
        </span>
      </div>
    </div>
  )
}

export default Dialog
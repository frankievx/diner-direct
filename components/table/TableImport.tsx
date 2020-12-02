import { createRef, useState } from "react";
import Button from "../global/Button"
import ImportDialog from "../import/ImportDialog";

const TableImport = () => {
  let [file, setFile] = useState(null)
  let [ open, setOpen] = useState(false)
  let fileInputRef = createRef()
  let onFileChange = (e) => {
    console.log('e', e);
    setFile(e.target.files[0])
  }

  let uploadFileHandler = () => {
    fileInputRef.current.click()
  }


  return (
    <div className="w-32">
      <input ref={fileInputRef} className="hidden" type="file" onChange={onFileChange} />
      <Button icon="cloud-upload-outline" label="Import" onClick={() => setOpen(true)}/>
      <ImportDialog open={(open)} onClose={() => setOpen(false)}/>
    </div>
  );
}

export default TableImport
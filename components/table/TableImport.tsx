import { createRef, useState } from "react";
import Button from "../global/Button"

const TableImport = () => {
  let [file, setFile] = useState(null)
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
      <Button icon="cloud-upload-outline" label="Import" onClick={uploadFileHandler}/>
    </div>
  );
}

export default TableImport
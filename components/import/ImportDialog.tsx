import Dialog from '../global/Dialog'
import Button from '../global/Button'
import { useState, createRef } from 'react'
import OutlineButton from '../global/OutlineButton';
import IconButton from '../global/IconButton';
import { request, gql } from 'graphql-request'
import { GraphQLList } from 'graphql'

const CREATE_RESTAURANTS = gql`
  mutation createRestaurants($input: CreateRestaurantsInput!) {
    createRestaurants(input: $input) {
      items {
        restaurant_id
        name
        city
        state
        phone
        genre
      }
    }
  }
`;

const createRestaurants = async (variables) => {
  return request("/api/graphql", CREATE_RESTAURANTS, variables);
};


const ImportButton = ({ file, onClick }) => {
  if (file) return (
    <div className="w-32">
      <Button
        icon="cloud-upload-outline"
        label="Import"
        onClick={onClick}
      />
    </div>
  )
  return <></>
  
}

const SelectFileButton = ({ file, onClick, onRemove}) => {
  if (file) return (
    <div className="flex justify-between py-2 px-4 shadow-md text-positive border-2 border-solid border-positive w-2/3 mx-auto rounded-lg">
      <div className="flex">
        <ion-icon class="block my-auto text-lg" name="document-outline"/>
        <div className="ml-2">{file.name}</div>
      </div>
      <div className="text-gray-800 my-auto hover:text-primary"><IconButton icon="trash-bin-outline" onClick={() => onRemove()} size="lg"/></div>
    </div>
  );

  return (
    <div className="mx-auto w-1/2">
      <OutlineButton
        icon="document-outline"
        label="Select JSON File"
        onClick={onClick}
      />
    </div>
  );
}
const ImportDialog = ({ open, onClose }) => {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('')
  const fileInputRef = createRef();
  const onFileChange = (e) => {
    try {
      let newFile = e.target.files[0];
      if (!newFile) throw { message: '' }
      if (newFile.size > 100000) throw { message: "File must be less than 100 KB." }
      if (newFile.type !== 'application/json') throw { message: "File must be JSON." };
      setFile(newFile);
      setErrorMessage('');
    } catch (err) {
      setErrorMessage(err.message)
    }
  };
  const uploadFileHandler = () => fileInputRef.current.click();
  const importFileHandler = () => {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(file);
  };

  const onReaderLoad = async (e) => {
    var data = JSON.parse(e.target.result);
    let response = await createRestaurants({ input: data });
    onClose()
  };
  const removeHandler = () => {
    fileInputRef.current.value = ''
    setFile(null);
  }


  return (
    <Dialog open={open} title="Import JSON" onClose={onClose}>
      <div className="mx-auto">
        <input
          ref={fileInputRef}
          className="hidden"
          type="file"
          onChange={onFileChange}
        />
        <SelectFileButton file={file} onClick={uploadFileHandler}  onRemove={removeHandler}/>
      </div>
      <div className="mt-8 flex justify-end">
        <div className="mx-auto my-auto text-secondary">{errorMessage}</div>
        <ImportButton file={file} onClick={importFileHandler}/>
        {/* <div className="w-32">
          <Button icon="cloud-upload-outline" label="Import" onClick={importFileHandler}/>
        </div> */}
      </div>
    </Dialog>
  );
}

export default ImportDialog;
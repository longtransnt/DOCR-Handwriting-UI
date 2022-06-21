import React, { useState, useEffect } from 'react';
import Dropzone from "react-dropzone-uploader";
import 'react-dropzone-uploader/dist/styles.css'
import {DEPLOYED_UPLOAD_URL, DEPLOYED_ORIGINALS_URL} from "../constant"

function Upload({ fetchUploads }) {
  const [originalUpload, setOriginalUpload] = useState(false)
  
  const getUploadParams = ({ file }) => {

    var path = ''
    if (originalUpload === true) 
      path = DEPLOYED_ORIGINALS_URL
    else
      path = DEPLOYED_UPLOAD_URL

    const body = new FormData()
    body.append('image', file)
      return {
        url: path,
        body
      };
    
  }

  const handleSubmit = (files, allFiles) => {
    allFiles.forEach(f => f.remove())
    fetchUploads();
  }

  return (
    <div>
      <Dropzone
        getUploadParams={getUploadParams}
        onSubmit={handleSubmit}
        accept="image/*"
        maxFiles={10}
        multiple={true}
        styles={{
          dropzone: { minHeight: 200, maxHeight: 250 }
        }}
      />
      <label>
        <input type="checkbox"
          defaultChecked={originalUpload}
          onChange={() => setOriginalUpload(!originalUpload)}
        />Upload Original Image
      </label>
    </div>
  );
}

export default Upload;
import React, { useState, useEffect } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

function OriginalView(props) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedImage = props.selectedImage
  const [preview, setPreview] = useState()

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedImage) {
            setPreview(undefined)
            return
        }
        const objectUrl = URL.createObjectURL(selectedImage)
        setPreview(objectUrl)
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedImage])

  return (
    <div>
        {/* <input type='file' onChange={onSelectFile} /> */}
        <button className='view-image-btn' onClick={() => setIsOpen(true)}>View the original image</button>
        {isOpen && (
        <Lightbox
            mainSrc={preview}
            onCloseRequest={() => setIsOpen(false)}
        />
        )}
    </div>
  );
}

export default OriginalView

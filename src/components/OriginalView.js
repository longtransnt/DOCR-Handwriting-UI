import React, { useRef, useState, useEffect } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Popup from './Popup';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineClose } from "react-icons/ai";
import ImageMapping from './ImageMapping';
import InnerImageZoom from 'react-inner-image-zoom'
import data from "../data.json"
import { Resizable, ResizableBox } from 'react-resizable';
import OriginalService from '../services/OriginalService';
function OriginalView(props) {
  const [isOpen, setIsOpen] = useState(false);
  // const [selectedImage, setSelectedImage] = props.selectedImage
  const imageId = props.image_id
  const originalImageId = props.original_image_id
  const [preview, setPreview] = useState();
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [originalUrl, setOriginalUrl] = useState('');
  const [coordinate, setCoordinate] = useState([]);
  const [updateLimit, setUpdateLimit] = useState(false);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  //const forceUpdate = React.useReducer(() => ({}))[1]
  //const forceUpdate = React.useState()[1].bind(null, {})  // see NOTE above

  const fetchOriginal = async (imageId, originalImageId) => {
   await OriginalService.getOriginalImageById(originalImageId).then(data => {
      setOriginalUrl(data[0].imageUrl)
    })
    .catch(console.error)

   await OriginalService.getCoordinatesById(imageId).then(data => {
      setCoordinate([data.max_x, data.max_y, data.min_x, data.min_y])
    })
    .catch(console.error)
  };

  useEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight
      });
    }
  }, []);

  console.log(dimensions.width)
  
  // create a preview as a side effect, whenever selected file is changed
  // useEffect(() => {
  //     console.log("original_url: " + originalUrl);
  //     if (originalUrl == '') {
  //         setPreview(undefined)
  //         return
  //     }
  //     const objectUrl = URL.createObjectURL(originalUrl)
  //     setPreview(objectUrl)
  //     // free memory when ever this component is unmounted
  //     return () => URL.revokeObjectURL(objectUrl)
  // }, [originalUrl])
 

  useEffect(() => {
    if (imageId !== '' && originalImageId !== '') {
      console.log("here")
      fetchOriginal(imageId, originalImageId)
    }
  }, [isOpen])
  
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const onImgLoad = () => {
    if (updateLimit === false) {
      console.log("Update Limit " + updateLimit)
      forceUpdate()
      setUpdateLimit(true);
    }
  }

  return (
    <div> 
          <button className='view-image-btn' onClick={() => {
            setIsOpen(true)
            setUpdateLimit(false)
          }}>View the original image</button>
          {isOpen && <Popup
            content={<>
              <ResizableBox width={800} height={1000}>
                <div>
                  <ImageMapping
                    active={true} 
                    onLoad={onImgLoad}
                    imgWidth={700} // imgWidth: original image width
                    src={originalUrl}
                    map={{
                        name: 'my-map',
                        areas: [
                          { shape: 'rect', coords: coordinate },
                        ]
                    }}
                  />
                </div>
              </ResizableBox>
            </>}
            handleClose={togglePopup}
            />
          }
      </div>
    
  );
}

export default OriginalView

import React, { useRef, useState, useEffect } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Popup from './Popup';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineClose } from "react-icons/ai";
import ImageMapping from './ImageMapping';
import image from "./2q.000382 (1)pd.jpg"
import image2 from "./21.000211 (24)pd.jpg"
import InnerImageZoom from 'react-inner-image-zoom'
import data from "../data.json"
import { Resizable, ResizableBox } from 'react-resizable';

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


  const fetchOriginal = (imageId, originalImageId) => {
    OriginalService.getCoordinatesById(imageId).then(data => {
      setCoordinate([data.max_x, data.max_y, data.min_x, data.min_y])
    })
    .catch(console.error)
    OriginalService.getOriginalImageById(originalImageId).then(data => {
      setOriginalUrl(data[0].imageUrl)
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
  useEffect(() => {
      if (!OriginalUrl) {
          setPreview(undefined)
          return
      }
      const objectUrl = URL.createObjectURL(OriginalUrl)
      setPreview(objectUrl)
      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl)
  }, [OriginalUrl])

 

  useEffect(() => {
    fetchOriginal(imageId, originalImageId)
  }, [isOpen])


  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const onImgLoad = ({ target: img }) => {
    const { offsetHeight, offsetWidth } = img;
    // console.log(offsetHeight, offsetWidth);
  };

  return (
    <div> 
          <button className='view-image-btn' onClick={() => setIsOpen(true)}>View the original image</button>
          {isOpen && <Popup
            content={<>
              <ResizableBox width={600} height={900}>
                <div>
                  <ImageMapping
                    active={true}
                    imgWidth={700} // imgWidth: original image width
                    src={props.url}
                    map={{
                        name: 'my-map',
                        areas: [
                          { shape: 'rect', coords: props.coord },
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

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


function OriginalView(props) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedImage = props.selectedImage
  const [preview, setPreview] = useState();
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
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
      if (!selectedImage) {
          setPreview(undefined)
          return
      }
      const objectUrl = URL.createObjectURL(selectedImage)
      setPreview(objectUrl)
      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl)
  }, [selectedImage])

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const onImgLoad = ({ target: img }) => {
    const { offsetHeight, offsetWidth } = img;
    console.log(offsetHeight, offsetWidth);
  };

  return (
    <div>
        {/* <input type='file' onChange={onSelectFile} /> */}
        {/* <button className='view-image-btn' onClick={() => setIsOpen(true)}>View the original image</button>
        {isOpen && (
        <Lightbox
            mainSrc={preview}
            onCloseRequest={() => setIsOpen(false)}
        />
        )} */}
        <button className='view-image-btn' onClick={() => setIsOpen(true)}>View the original image</button>
        {isOpen && <Popup
          content={<>
            <div>
              <ImageMapping
                active={true}
                width={500} imgWidth={572} // imgWidth: original image width
                src={image2}
                map={{
                    name: 'my-map',
                    areas: [
                      { shape: 'rect', coords: [68, 1468, 462, 1401] },
                      // { shape: 'rect', coords: [78, 1220, 192, 1290] },
                      // { shape: 'rect', coords: [856, 1258, 1026, 1368] },
                      // { shape: 'rect', coords: [868, 1594, 1152, 1512] }, // [top-left-X,top-left-Y,bottom-right-X,bottom-right-Y] Top left x,y(x_min, y_max); Bottom right x,y (x_max, y_min)
                    ]
                }}
              />
            </div>
          </>}
          handleClose={togglePopup}
          />
        }
    </div>
  );
}

export default OriginalView

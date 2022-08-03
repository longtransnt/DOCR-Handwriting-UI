import React, { useRef, useState, useEffect } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Popup from "./Popup";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineClose } from "react-icons/ai";
import ImageMapping from "./ImageMapping";
import InnerImageZoom from "react-inner-image-zoom";
import data from "../data.json";
import { Resizable, ResizableBox } from "react-resizable";
import OriginalService from "../services/OriginalService";
function OriginalView(props) {
  const [isOpen, setIsOpen] = useState(false);
  // const [selectedImage, setSelectedImage] = props.selectedImage
  const imageId = props.image_id;
  const originalImageId = props.original_image_id;
  const chosenImageCords = props.chosen_image_cords;
  const [preview, setPreview] = useState();
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [originalUrl, setOriginalUrl] = useState("");
  const [coordinate, setCoordinate] = useState([]);
  const [updateLimit, setUpdateLimit] = useState(false);
  const [originalWidth, setOriginalWidth] = useState(0);

  const fetchOriginal = async (imageId, originalImageId) => {
    await OriginalService.getOriginalImageById(originalImageId)
      .then((data) => {
        setOriginalUrl(data[0].imageUrl);
        setCoordinate(chosenImageCords);
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight,
      });
    }
  }, []);

  console.log(dimensions.width);

  useEffect(() => {
    if (imageId !== "" && originalImageId !== "") {
      fetchOriginal(imageId, originalImageId);
    }
  }, [isOpen]);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  function getMeta(url, callback) {
    const img = new Image();
    img.src = url;
    img.onload = function () {
      callback(this.width, this.height);
    };
  }
  getMeta(originalUrl, (width, height) => {
    console.log(width);
    setOriginalWidth(width);
  });

  return (
    <div>
      <button
        className="view-image-btn"
        onClick={() => {
          setIsOpen(true);
          setUpdateLimit(false);
        }}
      >
        View the original image
      </button>
      {isOpen && (
        <Popup
          content={
            <>
              <ResizableBox width={800} height={1000}>
                <div>
                  <ImageMapping
                    active={true}
                    imgWidth={originalWidth}
                    width={1000} // imgWidth: original image width
                    src={originalUrl}
                    map={{
                      name: "my-map",
                      areas: [{ shape: "rect", coords: coordinate }],
                    }}
                  />
                </div>
              </ResizableBox>
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  );
}

export default OriginalView;

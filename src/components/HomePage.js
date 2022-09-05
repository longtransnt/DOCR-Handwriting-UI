import "../styles/Gallery.css";
import "../styles/Buttons.css";
import React, { useState, useEffect } from "react";
import { Masonry } from "masonic";
import OriginalService from "../services/OriginalService";
import { Link, useNavigate } from "react-router-dom";
import Upload from "../components/Upload";
import Popup from "../components/Popup";

function HomePage() {
  const navigate = useNavigate();
  const [originalList, setOriginalList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const RealImageCard = ({ data: { file_name, imageUrl, image_id } }) => (
    <div className="original-image">
      <span children={file_name} />
      <img
        className="image-show"
        src={imageUrl}
        onClick={(event) => onMasonryClick(event, image_id)}
      />
    </div>
  );

  const onMasonryClick = (event, id) => navigate("/annotation/" + id);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    OriginalService.getAllOriginals().then((originalList) => {
      setOriginalList(originalList);
    });
  }, []);

  return (
    <div className="home-gallery">
      <div className="title">Original Image Gallery</div>
      <input
        className="upload-btn"
        type="button"
        value="Upload"
        onClick={togglePopup}
      />
      {isOpen && (
        <Popup
          content={
            <>
              <div className="upload-container">
                {/* <Upload fetchUploads={fetchInitialUploads} /> */}
              </div>
            </>
          }
          handleClose={togglePopup}
        />
      )}
      <Masonry
        className="gallery-show"
        columnGutter={20}
        columnWidth={400} // Sets the minimum column width
        items={originalList.rows ? originalList.rows : originalList}
        render={RealImageCard}
        click
      />
    </div>
  );
}

export default HomePage;

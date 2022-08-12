import "../styles/Gallery.css";
import React, {
  useState,
  useEffect,
} from "react";
import { Masonry } from "masonic";
import OriginalService from "../services/OriginalService";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const [originalList, setOriginalList] = useState([]);

  const RealImageCard = ({ data: { file_name, imageUrl, image_id } }) => (
    <div
      className="original-image"
      onClick={(event) => onMasonryClick(event, image_id)}
    >
      <span children={file_name} />
      <img className="image-show" src={imageUrl} />
    </div>
  );

  const onMasonryClick = (event, id) => navigate("/annotation/" + id);

  useEffect(() => {
    OriginalService.getAllOriginals().then((originalList) => {
      setOriginalList(originalList);
    });
  }, []);

  return (
    <div className="home-gallery">
      <div className="title">Original Image Gallery</div>
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

import "../styles/Gallery.css";
import React, {
  useState,
  useEffect,
} from "react";
import { Masonry } from "masonic";
import OriginalService from "../services/OriginalService";
import { Link } from "react-router-dom";

const RealImageCard = ({  data: {file_name, imageUrl } }) => (
  <Link className="navigation" 
    to={{pathname: `/recognition`}} 
    state={{file_name, imageUrl }}
  >
    <div className="original-image">
      <span children={file_name} />
      <img className="image-show" src={imageUrl} />
    </div>
  </Link>
);

function HomePage() {
  const [originalList, setOriginalList] = useState([]);

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
          items={(originalList.rows ? originalList.rows : originalList)}
          render={RealImageCard}
        />
    </div>
  );
}

export default HomePage;

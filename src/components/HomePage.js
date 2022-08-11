import "../styles/Gallery.css";
import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useContext,
} from "react";
import { Masonry } from "masonic";
import image1 from "../test_image/21,000927 (9).jpg";
import image2 from "../test_image/2021_12_30 09_55 Office Lens (23).jpg";
import image3 from "../test_image/2021_11_19 11_51 Office Lens (1).jpg";
import image4 from "../test_image/21.000948 (20).jpg";
import image5 from "../test_image/2021_11_19 11_51 Office Lens (5).jpg";
import OriginalService from "../services/OriginalService";
import { useNavigate } from "react-router-dom";

const photos = [
  { id: 1, src: image1, name: "21,000927 (9).jpg" },
  { id: 2, src: image2, name: "2021_12_30 09_55 Office Lens (23).jpg" },
  { id: 3, src: image3, name: "2021_11_19 11_51 Office Lens (1).jpg" },
  { id: 4, src: image4, name: "21.000948 (20).jpg" },
  { id: 5, src: image5, name: "2021_11_19 11_51 Office Lens (5).jpg" },
  { id: 1, src: image1, name: "21,000927 (9).jpg" },
  { id: 2, src: image2, name: "2021_12_30 09_55 Office Lens (23).jpg" },
  { id: 3, src: image3, name: "2021_11_19 11_51 Office Lens (1).jpg" },
  { id: 4, src: image4, name: "21.000948 (20).jpg" },
  { id: 5, src: image5, name: "2021_11_19 11_51 Office Lens (5).jpg" },
  { id: 1, src: image1, name: "21,000927 (9).jpg" },
  { id: 2, src: image2, name: "2021_12_30 09_55 Office Lens (23).jpg" },
  { id: 3, src: image3, name: "2021_11_19 11_51 Office Lens (1).jpg" },
  { id: 4, src: image4, name: "21.000948 (20).jpg" },
  { id: 5, src: image5, name: "2021_11_19 11_51 Office Lens (5).jpg" },
];

const ImageCard = ({ data: { name, src } }) => (
  <div className="original-image">
    <span children={name} />
    <img className="image-show" src={src} />
  </div>
);

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

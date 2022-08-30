import "../styles/Gallery.css";
import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useContext,
} from "react";
import { Masonry } from "masonic";
import OriginalService from "../services/OriginalService";
import { useNavigate } from "react-router-dom";
import PipelineService from "../services/PipelineService";
import { v4 as uuidv4 } from "uuid";

const ImageCard = ({ data: { name, src } }) => (
  <div className="original-image">
    <span children={name} />
    <img className="image-show" src={src} />
  </div>
);

function InputPage() {
  const navigate = useNavigate();
  const [originalList, setOriginalList] = useState([]);

  const RealImageCard = ({ data: { file_name, imageUrl, image_id } }) => (
    <div
      className="original-image"
      onClick={(event) => onMasonryClick(event, file_name)}
    >
      <span children={file_name} />
      <img className="image-show" src={imageUrl} />
    </div>
  );

  const onMasonryClick = (event, id) => {
    // PipelineService.callPipelinePrediction(id);
    navigate("/display/exist/" + id);
  };

  useEffect(() => {
    PipelineService.getInputImageList().then((data) => {
      let imgName = data.data;
      console.log(imgName);

      let imageList = [];
      imgName.forEach((img) => {
        let url = PipelineService.getInputImage(img);
        console.log(url);
        imageList.push({
          id: uuidv4(),
          file_name: img,
          imageUrl: url,
          isManual: true,
        });
      });

      setOriginalList(imageList);
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

export default InputPage;

import "../styles/Gallery.css";
import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useContext,
} from "react";
import { PIPELINE_LOCALHOST } from "../constant"
import { Masonry } from "masonic";
import OriginalService from "../services/OriginalService";
import { useNavigate } from "react-router-dom";
import PipelineService from "../services/PipelineService";
import { v4 as uuidv4 } from "uuid";
import { useLocation, useParams } from "react-router-dom";

const ImageCard = ({ data: { name, src } }) => (
  <div className="original-image">
    <span children={name} />
    <img className="image-show" src={src} />
  </div>
);

function InputPage() {
  const params = useParams();
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

      let imageList = [];
      imgName.forEach((img) => {
        let url = PipelineService.getInputImage(img);
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
      <div className="title">Input Gallery</div>
      <form method="post" action="http://44.237.77.251:5000/input" enctype="multipart/form-data">
        <dl>
          <p>
            <input type="file" name="file" autocomplete="off" required />
          </p>
        </dl>
        <p>
          <input type="submit" value="Submit" />
        </p>
      </form>
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

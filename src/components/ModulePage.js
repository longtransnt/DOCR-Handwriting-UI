import { Masonry } from "masonic";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PipelineService from "../services/PipelineService";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";

function ModulePage() {
  const navigate = useNavigate();
  const [moduleFolderList, setModuleFolderList] = useState([]);
  const params = useParams();

  useEffect(() => {
    let imageList = [];
    if (params.module === "TextDetection" || params.module === "adaptive") {
      PipelineService.getFoldersFromPath(params.module).then((data) => {
        let folderName = data.data;

        folderName.forEach((folder) => {
          let url = "";
          if (params.module === "adaptive") {
            if (folder !== "Adaptive-Preview") {
              url = PipelineService.getImageUrl(params.module, "folder");

              imageList.push({
                image_id: uuidv4(),
                file_name: folder,
                imageUrl: url,
              });
            }
          } else {
            url = PipelineService.getImageUrl(
              params.module,
              "visualize",
              folder
            );
            imageList.push({
              image_id: uuidv4(),
              file_name: folder + "/visualize.jpg",
              imageUrl: url,
            });
          }
        });
        setModuleFolderList(imageList);
      }); //
    } else {
      PipelineService.getListOfImageNames(params.module).then((data) => {
        let imgName = data.data;
        console.log(imgName);
        imgName.forEach((img) => {
          const url = PipelineService.getImageUrl(params.module, img);

          console.log(url);
          imageList.push({
            image_id: uuidv4(),
            file_name: img,
            imageUrl: url,
          });
        });
        setModuleFolderList(imageList);
      });
    }
  }, []);

  const onMasonryClick = (event, id) => {
    navigate("/annotation/" + id);
  };

  const ModuleImageCard = ({ data: { file_name, imageUrl, image_id } }) => (
    <div
      className="original-image"
      onClick={(event) => onMasonryClick(event, image_id)}
    >
      <span children={file_name} />
      <img className="image-show" src={imageUrl} />
    </div>
  );

  return (
    <div className="home-gallery">
      <Masonry
        className="gallery-show"
        columnGutter={20}
        columnWidth={600} // Sets the minimum column width
        items={moduleFolderList.rows ? moduleFolderList.rows : moduleFolderList}
        render={ModuleImageCard}
        click
      />
    </div>
  );
}
export default ModulePage;

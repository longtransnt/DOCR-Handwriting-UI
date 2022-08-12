import React, {
    useState,
    useEffect,
} from "react";
import "../styles/Recognition.css";
import OriginalService from "../services/OriginalService";
import ImageMapping from "./ImageMapping";
import Scrollbars from "react-custom-scrollbars";
import { useLocation } from "react-router-dom";

function RecognitionPage(props) {
    const location = useLocation();
    const data = location.state;
  
    return (
        <div>
            <div className="title-page">Text Recognition</div>
            <div className="image-area">
                <div className="image-title">{data.file_name}</div>
                <img className="image-show" src={data.imageUrl}/>
                {/* <Scrollbars> */}
                    <div className="recognition-text-list">
                    {/* {image.map((im, id) => (
                    <ListGroup.Item
                        id={"image_" + id}
                        key={id}
                        value={id}
                        style={{ cursor: "pointer" }}
                    >
                    </ListGroup.Item>
                    ))} */}
                    </div>
                {/* </Scrollbars> */}
            </div>
        </div>
    )
}

export default RecognitionPage;
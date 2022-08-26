import React, { useState, useCallback, useEffect, useRef } from "react";
import "../styles/Recognition.css";
import "../App.css";
import { useLocation } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import ListGroup from "react-bootstrap/ListGroup";
import UploadService from "../services/UploadService";
import ReactPaginate from "react-paginate";
import { Col, Container, Row, Stack } from "react-bootstrap";
import ImageMapping from "./ImageMapping";
import OriginalView from "./OriginalView";
import myData from "../testFile.json";
import myEvalData from "../testEvalFile.json";
import testImage from "../21.000440 (33)pdpd.jpg";
import PipelineService from "../services/PipelineService";
import { BsArrowReturnRight } from "react-icons/bs";

export default function RecognitionPage() {
  const location = useLocation();
  const dataState = location.state;
  const [currId, setCurrId] = useState(0);
  const [cer, setCER] = useState(1);
  const [wer, setWER] = useState(1);
  const [currImagePath, setCurrImagePath] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setToTalPage] = useState(0);
  const [chosenImageCords, setChosenImageCords] = useState([0, 0, 0, 0]);
  const [originalUrl, setOriginalUrl] = useState("");
  const [originalWidth, setOriginalWidth] = useState(0);

  const calculateMetrics = useCallback(() => {
    console.log("stuff");
    const predict = myData.map((im, id) => {
      return im.ground_truth;
    });

    const expect = myEvalData.map((im, id) => {
      return im.ground_truth;
    });

    console.log(predict);
    console.log(expect);

    const query = {
      ground_truths: expect,
      predicts: predict,
    };
    PipelineService.fetchWERandCER(query).then((results) => {
      console.log(results);
    });
  }, []);

  useEffect(() => {
    calculateMetrics();
  }, [calculateMetrics]);

  const changePage = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  /******************************************************************************/
  /*---------------- Handle when user click image on list ----------------------*/
  /******************************************************************************/
  const handleListClick = (id) => {
    var data = require("../testFile.json");
    // console.log(image.length)
    if (id <= data.length - 1) {
      // // Testing only
      // Move to this image
      setCurrId(id);
      var cords = [
        data[id].max_x,
        data[id].max_y,
        data[id].min_x,
        data[id].min_y,
      ];
      setChosenImageCords(cords);
      console.log(cords);
    } else {
      setCurrId(null);
      // setCurrImagePath(null);
    }
  };

  /******************************************************************************/
  /*--------------------------------- Get width --------------------------------*/
  /******************************************************************************/
  function getMeta(url, callback) {
    const img = new Image();
    img.src = url;
    img.onload = function () {
      callback(this.width, this.height);
    };
  }
  getMeta(testImage, (width, height) => {
    setOriginalWidth(width);
  });

  /******************************************************************************/
  /*----------------------------------- Render ---------------------------------*/
  /******************************************************************************/
  return (
    <div className="recognition-body">
      <Row className="main-area">
        <Col>
          <p className="title1">
            Original Image
          </p>
          <div className="image-display">
            <ImageMapping
              active={true}
              imgWidth={originalWidth}
              width={250} // imgWidth: original image width
              src={testImage}
              map={{
                name: "my-map",
                areas: [{ shape: "rect", coords: chosenImageCords }],
              }}
            />
          </div>
        </Col>
        <Col>
          {/* Image List */}
          <p className="title2">
            Text Recognition
          </p>
          <div className="text-list">
            <Scrollbars style={{width: 400, height: 600 }}>
              <div id="recognition-list">
                {myData.map((im, id) => (
                  <ListGroup.Item
                    id={"image_" + id}
                    key={id}
                    value={id}
                    style={{ color: "#005477", cursor: "pointer" }}
                    onClick={(e) => {
                      handleListClick(id);
                    }}
                  >
                    Ground truth: {im.ground_truth}
                    <div style={{display: "flex", margin: ".25rem 0 0 1.5rem"}}>
                      <BsArrowReturnRight />
                      <p className="prediction-box">Prediction: 
                        <span className="predict-text"> Here is predicted text</span>
                      </p>
                    </div>
                  </ListGroup.Item>
                ))}
              </div>
            </Scrollbars>
          </div>
          <Row>
            <p className="error-rate">
              Error Rate:
              <span> Put value here</span>
            </p>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

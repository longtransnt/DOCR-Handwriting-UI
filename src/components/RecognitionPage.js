import React, { useState, useCallback, useEffect, useRef } from "react";
import "../styles/Recognition.css";
import "../App.css";
import { useLocation, useParams } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import ListGroup from "react-bootstrap/ListGroup";
import UploadService from "../services/UploadService";
import ReactPaginate from "react-paginate";
import { Col, Container, Row, Stack } from "react-bootstrap";
import ImageMapping from "./ImageMapping";
import testImage from "../21.000440 (33)pdpd.jpg";
import PipelineService from "../services/PipelineService";
import { BsArrowReturnRight } from "react-icons/bs";
import Spinner from "react-bootstrap/Spinner";

export default function RecognitionPage() {
  const location = useLocation();
  const dataState = location.state;
  const [currId, setCurrId] = useState(0);
  const [cer, setCER] = useState(null);
  const [wer, setWER] = useState(null);
  const [predictData, setPredictData] = useState([]);
  const [evalData, setEvalData] = useState([]);
  const [currImagePath, setCurrImagePath] = useState("");
  const [chosenImageCords, setChosenImageCords] = useState([0, 0, 0, 0]);
  const [originalWidth, setOriginalWidth] = useState(0);
  const [combineFile, setCombineFile] = useState([]);
  const [isEval, setIsEval] = useState(false);
  const [clicked, setClicked] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const fetchImage = useCallback(() => {
    let image_name = params.id + "pdpd";
    let url = PipelineService.getImageUrl("PaperDetection", image_name);
    setCurrImagePath(url);
  }, []);

  const fetchTextRecognitionResults = useCallback((e) => {
    PipelineService.callTextRecognitionModule(params.id).then((results) => {
      e.preventDefault();
      console.log(results);
      setIsEval(results.eval_exist);

      setCombineFile(results.predict_info);
      if (results.eval_exist) {
        combineEvalAndPredict(results.eval_info, results.predict_info);
        calculateMetrics(results.predict_info, results.eval_info);
      }
      setIsLoading(true);
    });
  }, []);

  const calculateMetrics = useCallback((predictData, evalData) => {
    const predict = predictData.map((im, id) => {
      return im.ground_truth;
    });

    const expect = evalData.map((im, id) => {
      return im.ground_truth;
    });

    const query = {
      ground_truths: expect,
      predicts: predict,
    };
    PipelineService.fetchWERandCER(query).then((results) => {
      setCER(results.cer.toFixed(3));
      setWER(results.wer.toFixed(3));
    });
  }, []);

  const combineEvalAndPredict = useCallback((evalFile, predictFile) => {
    const arrayList = [];
    for (var i in evalFile) {
      var obj = {
        image_name: evalFile[i].image_name,
        min_x: evalFile[i].min_x,
        min_y: evalFile[i].min_y,
        max_x: evalFile[i].max_x,
        max_y: evalFile[i].max_y,
        original_image_name: evalFile[i].original_image_name,
        ground_truth: evalFile[i].ground_truth,
        prediction: "",
      };

      for (var j in predictFile) {
        if (evalFile[i].image_name === predictFile[j].image_name) {
          obj.prediction = predictFile[j].ground_truth;
        }
      }

      arrayList.push(obj);
    }

    console.log("combine", arrayList);
    setCombineFile(arrayList);
  }, []);

  useEffect(() => {
    fetchTextRecognitionResults();
  }, [fetchTextRecognitionResults]);

  useEffect(() => {
    fetchImage();
  }, [fetchImage]);

  const renderResult = () => {
    if (!isLoading) {
      return <Spinner animation="border" variant="info" />;
    } else {
      return (
        <div>
          <div className="text-list">
            <Scrollbars style={{ width: 400, height: 600 }}>
              {renderTextRecognitionBox()}
            </Scrollbars>
          </div>
          {renderMetricsBox()}
        </div>
      );
    }
  };
  const renderTextRecognitionBox = () => {
    if (isEval) {
      return (
        <div id="recognition-list">
          {combineFile.map((im, id) => (
            <ListGroup.Item
              id={"image_" + id}
              key={id}
              value={id}
              style={{
                color: "#005477",
                cursor: "pointer",
                backgroundColor: clicked === id ? "#cce6ff" : "",
              }}
              onClick={(e) => {
                handleListClick(id);
              }}
            >
              Ground truth: {im.ground_truth}
              <div style={{ display: "flex", margin: ".25rem 0 0 1.5rem" }}>
                <BsArrowReturnRight />
                <p className="prediction-box">
                  Prediction:
                  <span className="prediction-text"> {im.prediction}</span>
                </p>
              </div>
            </ListGroup.Item>
          ))}
        </div>
      );
    } else {
      return (
        <div id="recognition-list">
          {combineFile.map((im, id) => (
            <ListGroup.Item
              id={"image_" + id}
              key={id}
              value={id}
              style={{
                color: "#005477",
                cursor: "pointer",
                backgroundColor: clicked === id ? "#cce6ff" : "",
              }}
              onClick={(e) => {
                handleListClick(id);
              }}
            >
              <div style={{ display: "flex", margin: ".25rem 0 0 1.5rem" }}>
                <p className="prediction-box">
                  <span className="prediction-text"> {im.ground_truth}</span>
                </p>
              </div>
            </ListGroup.Item>
          ))}
        </div>
      );
    }
  };

  const renderMetricsBox = () => {
    if (isEval) {
      return (
        <div className="error-display-outbound">
          <div className="error-display-inbound">
            <div
              style={{
                fontWeight: "bold",
                color: "#005477",
                display: "flex",
                alignItem: "center",
                justifyContent: "center",
              }}
            >
              Error Rate
            </div>
            <div className="error-rate">CER: {cer}</div>
            <div className="error-rate">WER: {wer}</div>
          </div>
        </div>
      );
    } else {
      return;
    }
  };
  /******************************************************************************/
  /*---------------- Handle when user click image on list ----------------------*/
  /******************************************************************************/
  const handleListClick = (id) => {
    var data = require("../testFile.json");
    setClicked(id);
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
  getMeta(currImagePath, (width, height) => {
    setOriginalWidth(width);
  });

  /******************************************************************************/
  /*----------------------------------- Render ---------------------------------*/
  /******************************************************************************/
  return (
    <div className="recognition-body">
      <Row className="main-area">
        <Col>
          <p className="title1">Original Image</p>
          <div className="image-display">
            <ImageMapping
              active={true}
              imgWidth={originalWidth}
              width={250} // imgWidth: original image width
              src={currImagePath}
              map={{
                name: "my-map",
                areas: [{ shape: "rect", coords: chosenImageCords }],
              }}
            />
          </div>
        </Col>
        <Col>
          {/* Image List */}
          <p className="title2">Text Recognition</p>
          {renderResult()}
        </Col>
      </Row>
    </div>
  );
}

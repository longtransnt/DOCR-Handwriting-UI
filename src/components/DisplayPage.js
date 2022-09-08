import { Dropdown } from "react-bootstrap";
import { IoChevronDown } from "react-icons/io5";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import { Scrollbars } from "react-custom-scrollbars";
import ListGroup from "react-bootstrap/ListGroup";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import React, { useState, useCallback, useEffect } from "react";
import PipelineService from "../services/PipelineService";
import Spinner from "react-bootstrap/Spinner";
import "../styles/Display.css";

export default function DisplayPage() {
  const navigate = useNavigate();
  const [paperDetectionImagePath, setPaperDetectionImagePath] = useState("");
  const [originalImagePath, setOriginalImagePath] = useState("");
  const [preProcesscingImagePath, setPreProcesscingImagePath] = useState("");
  const [textDetectionImagePath, setTextDetectionImagePath] = useState("");
  const [visualize, setVisualize] = useState("");
  const [visualizeNormal, setVisualizeNormal] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [currId, setCurrId] = useState(0);

  const toAdaptive = (event, id) => {
    let name = params.id.slice(0, -2);
    navigate("/adaptive/" + name);
  };

  const handleRerunPipeline = (event, id) => {
    setIsLoading(false);
    PipelineService.callPipelinePrediction(params.id, true).then(() => {
      setIsLoading(true);
    });
  };

  const toggleTextDetectionImageMode = (event) => {
    if (textDetectionImagePath.includes("normal")) {
      console.log("hasNormal");
      setTextDetectionImagePath(visualize);
    } else {
      console.log("None");
      setTextDetectionImagePath(visualizeNormal);
    }
  };

  const params = useParams();

  const fetchPPImages = useCallback(() => {
    // getByOriginal(params.id, 0);
    getImageList();
  }, []);

  function getImageList() {
    let pd_name = params.id + "pd";
    let url = PipelineService.getImageUrl("PaperDetection", pd_name);
    console.log(url);
    setPaperDetectionImagePath(url);
    let org_url = PipelineService.getInputImage(params.id);
    setOriginalImagePath(org_url);

    let pp_name = pd_name + "_pp";
    let pp_url = PipelineService.getImageUrl("Preprocessing", pp_name);
    console.log(url);
    setPreProcesscingImagePath(pp_url);

    let visualize_url = PipelineService.getImageUrl(
      "TextDetection",
      "visualize",
      pd_name
    );
    let visualize_normal_url = PipelineService.getImageUrl(
      "TextDetection",
      "visualize-normal",
      pd_name
    );
    setVisualizeNormal(visualize_normal_url);
    setVisualize(visualize_url);
    setTextDetectionImagePath(visualize_url);

    if (
      visualizeNormal === "" ||
      visualize === "" ||
      textDetectionImagePath == ""
    ) {
      PipelineService.callPipelinePrediction(params.id).then(() => {
        setIsLoading(true);
      });
    }
  }

  useEffect(() => {
    fetchPPImages();
  }, [fetchPPImages]);

  const renderResults = () => {
    if (!isLoading) {
      return <Spinner animation="border" variant="info" />;
    } else {
      return (
        <Row>
          {/* Input Image */}
          <Col md={2}>
            <p className="col-title">Input Image</p>
            <Stack gap={2} className="col-md-11 mx-auto">
              <div className="image-area">
                <img
                  className="img-display"
                  id={currId}
                  src={originalImagePath}
                  height={480}
                  // key={currImagePath}
                />
              </div>
              <p className="col-content">Raw medical record</p>
            </Stack>
          </Col>
          {/* Paper Detection */}
          <Col md={3}>
            <p className="col-title">Paper Detection</p>
            <Stack gap={2} className="col-md-11 mx-auto">
              <div className="image-area">
                <img
                  className="img-display"
                  id={currId}
                  height={480}
                  src={paperDetectionImagePath}
                  // key={currImagePath}
                />
              </div>
              <p className="col-content">
                Result detected and cropped by Mask-RCNN model
              </p>
            </Stack>
          </Col>
          {/* PreProcessing */}
          <Col md={4}>
            <p className="col-title">PreProcessing</p>
            <Stack gap={2} className="col-md-11 mx-auto">
              <div className="image-area">
                <img
                  className="img-display"
                  id={currId}
                  src={preProcesscingImagePath}
                  height={480}
                  // key={currImagePath}
                />
              </div>
              <p className="col-content">
                1. Improve image contrast with CLAHE
                <br />
                2. Enhance handwriting stroke with Sauvola
                <br />
                3. Remove small objects with OpenCV's Denoised
              </p>
            </Stack>
          </Col>
          {/* TextDetection */}
          <Col md={3}>
            <p className="col-title">TextDetection</p>
            <Stack gap={2} className="col-md-11 mx-auto">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  whiteSpace: "pre-wrap",
                }}
              >
                <img
                  className="img-display"
                  id={currId}
                  src={textDetectionImagePath}
                  height={480}
                  onClick={() => toggleTextDetectionImageMode()}
                  // key={currImagePath}
                />
              </div>
              <p className="col-content">
                Result detected and cropped by Fast-RCNN model
              </p>
            </Stack>
          </Col>
        </Row>
      );
    }
  };
  return (
    <div className="App-header">
      <Container fluid={true}>{renderResults()}</Container>
      <Row style={{ marginTop: "7rem" }}>
        <Col style={{ position: "fixed", bottom: 0, marginBottom: "1rem" }}>
          <div style={{ float: "left" }}></div>
          <div style={{ float: "right", marginRight: "46px" }}>
            <button className="save-btn" onClick={handleRerunPipeline}>
              Rerun
            </button>
            <button
              className="save-btn"
              id="dropdown-basic-button"
              onClick={toAdaptive}
            >
              Next
            </button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

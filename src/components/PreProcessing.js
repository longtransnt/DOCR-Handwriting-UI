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

export default function PreProcessing() {
  const navigate = useNavigate();

  const [currImagePath, setCurrImagePath] = useState("");
  const [originalImagePath, setOriginalImagePath] = useState("");
  const [ppImagePath, setPPImagePath] = useState("");
  const [currId, setCurrId] = useState(0);
  const toTextDectection = (event, id) =>
    navigate("/textdetection/" + params.id);
  const params = useParams();

  const fetchPPImages = useCallback(() => {
    // getByOriginal(params.id, 0);
    getImageList();
  }, []);

  function getImageList() {
    let pd_name = params.id + "pd";
    let url = PipelineService.getImageUrl("PaperDetection", pd_name);
    console.log(url);
    setCurrImagePath(url);
    let org_url = PipelineService.getInputImage(params.id);
    setOriginalImagePath(org_url);

    let pp_name = pd_name + "_pp";
    let pp_url = PipelineService.getImageUrl("Preprocessing", pp_name);
    console.log(url);
    setPPImagePath(pp_url);
  }

  useEffect(() => {
    fetchPPImages();
  }, [fetchPPImages]);

  return (
    <div className="App-header">
      <Container>
        <Row xs={1} md={4}>
          <Col>
            {/* Displaying Image */}
            <p style={{ textAlign: "center", fontWeight: "bold" }}>
              Input Image
            </p>
            <Stack gap={2} className="col-md-11 mx-auto">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  className="img-display"
                  id={currId}
                  src={originalImagePath}
                  height={480}
                  // key={currImagePath}
                />
              </div>
            </Stack>
          </Col>
          <Col>
            {/* Displaying Image */}
            <p style={{ textAlign: "center", fontWeight: "bold" }}>
              After Paper Detection
            </p>
            <Stack gap={2} className="col-md-11 mx-auto">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  className="img-display"
                  id={currId}
                  height={480}
                  src={currImagePath}
                  // key={currImagePath}
                />
              </div>
            </Stack>
          </Col>
          <Col>
            {/* Displaying Image */}
            <p style={{ textAlign: "center", fontWeight: "bold" }}>
              PreProcessing
            </p>
            <Stack gap={2} className="col-md-11 mx-auto">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  className="img-display"
                  id={currId}
                  src={ppImagePath}
                  height={480}
                  // key={currImagePath}
                />
              </div>
            </Stack>
          </Col>
        </Row>
      </Container>

      <Row style={{ marginTop: "7rem" }}>
        <Col style={{ position: "fixed", bottom: 0, marginBottom: "1rem" }}>
          <div style={{ float: "left" }}></div>
          <div style={{ float: "right", marginRight: "46px" }}>
            <button className="save-btn" id="dropdown-basic-button" onClick={toTextDectection}>
              Next
            </button>{" "}
            {/* <div style={{ float: "right" }}>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic-button">
                  NEXT
                  <IoChevronDown
                    style={{
                      width: "1.5rem",
                      height: "1.5rem",
                      marginLeft: "5px",
                    }}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu
                  style={{
                    position: "absolute",
                    minWidth: "100%",
                    textAlign: "center",
                  }}
                >
                  <Dropdown.Item className="dropdown-item" eventKey="all">
                    Continue
                  </Dropdown.Item>
                  <Dropdown.Item className="dropdown-item" eventKey="rest">
                    Continue with all Automatic
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div> */}
          </div>
        </Col>
      </Row>
    </div>
  );
}

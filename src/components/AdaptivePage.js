import { Dropdown } from "react-bootstrap";
import { IoChevronDown } from "react-icons/io5";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import { Scrollbars } from "react-custom-scrollbars";
import ListGroup from "react-bootstrap/ListGroup";

import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useContext,
} from "react";

export default function AdaptivePage() {
  const [adaptiveImageList, setAdaptiveImageList] = useState([]);
  const [currImagePath, setCurrImagePath] = useState("");
  const [currId, setCurrId] = useState(0);
  const [image, setImage] = useState([]);
  const [controlDisable, setControlDisable] = useState(1);

  const handleListClick = (id) => {
    // console.log(image.length)
    if (id <= image.length - 1) {
      // // Testing only
      // Move to this image
    } else {
    }
  };

  const handleConfigCheck = (event) => {
    if (event.target.checked === true) {
      setControlDisable(1)
    }
    else {
      setControlDisable(0)
    }
  };

  return (
    <div className="App-header">
      <Container>
        <Row xs={1} md={3}>
          <Col>
            {/* Image List */}
            <p style={{ textAlign: "center", fontWeight: "bold" }}>
              Image List
            </p>
            <Scrollbars>
              <div id="image-list">
                {image.map((im, id) => (
                  <ListGroup.Item
                    id={"image_" + id}
                    key={id}
                    value={id}
                    variant={
                      image[id].ground_truth === null
                        ? "danger"
                        : image[id].is_verified === false
                        ? "warning"
                        : "success"
                    }
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      handleListClick(id);
                    }}
                  >
                    {im.file_name && im.file_name.length ? (
                      <img src={im.thumbnailUrl} />
                    ) : null}
                    {im.file_name}
                  </ListGroup.Item>
                ))}
              </div>
            </Scrollbars>
          </Col>
          <Col>
            {/* Displaying Image */}
            <p style={{ textAlign: "center", fontWeight: "bold" }}>
              Current Image
            </p>
            <Stack gap={4} className="col-md-11 mx-auto">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img className="img-display" id={currId} src={currImagePath} />
              </div>
            </Stack>
          </Col>
          <Col>
            <p style={{ textAlign: "center", fontWeight: "bold" }}>
              Adaptive Processing Control
            </p>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="flexSwitch" onChange={handleConfigCheck}></input>
              <label class="form-check-label" for="flexSwitch">Manual Configuration</label>
            </div>
            <form>
              {controlDisable === 0 ? (
                // Disabled form
                <div>
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckClahe" disabled/>
                  <label class="form-check-label" for="flexCheckClahe">
                    Apply Clahe Equalization
                  </label>
                  <br/>
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckSauvola" disabled/>
                  <label class="form-check-label" for="flexCheckSauvola" disabled>
                    Apply Sauvola Thresholding
                  </label>
                  <br/>
                  <label class="form-check-label" for="flexInput">
                    Blur Metric Value
                  </label>
                  <input class="form-control" type="float" placeholder="i.e. 30.0 (Value from 1-40)" id="flexInput" aria-label="i.e. 30.0 (1-40)" disabled></input>
                </div>
              ) : (
                // Enabled form
                <div>
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckClahe"/>
                  <label class="form-check-label" for="flexCheckClahe">
                    Apply Clahe Equalization
                  </label>
                  <br/>
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckSauvola"/>
                  <label class="form-check-label" for="flexCheckSauvola">
                    Apply Sauvola Thresholding
                  </label>
                  <br/>
                  <label class="form-check-label" for="flexInput">
                    Blur Metric Value
                  </label>
                  <input class="form-control" type="float" placeholder="i.e. 30.0 (Value from 1-40)" id="flexInput" aria-label="i.e. 30.0 (1-40)"></input>
                </div>
              )}
            </form>
          </Col>
        </Row>
      </Container>

      {/* <Dropdown>
        <Dropdown.Toggle id="dropdown-basic-button">
          ADAPTIVE PREPROCESSING MODE
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
            Automatic
          </Dropdown.Item>
          <Dropdown.Item className="dropdown-item" eventKey="rest">
            Manual
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown> */}
      <Row style={{ marginTop: "7rem" }}>
        <Col style={{ position: "fixed", bottom: 0, marginBottom: "1rem" }}>
          <div style={{ float: "left" }}></div>
          <div style={{ float: "right", marginRight: "46px" }}>
            <button className="save-btn">Preview</button>{" "}
            <div style={{ float: "right" }}>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic-button">
                  CONFIRM
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
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

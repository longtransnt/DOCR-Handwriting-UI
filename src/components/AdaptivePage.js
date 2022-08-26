import { Dropdown } from "react-bootstrap";
import { IoChevronDown } from "react-icons/io5";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import { Scrollbars } from "react-custom-scrollbars";
import ListGroup from "react-bootstrap/ListGroup";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import React, { useState, useCallback, useEffect } from "react";
import PipelineService from "../services/PipelineService";

export default function AdaptivePage() {
  const [currImagePath, setCurrImagePath] = useState("");
  const [currFileName, setCurrFileName] = useState("");
  const [currId, setCurrId] = useState(0);
  const [image, setImage] = useState([]);

  const [applyCLAHE, setApplyCLAHE] = useState(false);
  const [denoisedSize, setDenoisedSize] = useState(null);
  const [windowSize, setWindowize] = useState(null);
  const [clipLimitValue, setclipLimitValue] = useState(null);
  const [controlDisable, setControlDisable] = useState(0);

  const [currentBlur, setCurrentBlur] = useState("");
  const [currentBlurList, setCurrentBlurList] = useState([]);
  const params = useParams();

  // const fetchAdaptiveImages = useCallback(() => {
  //   getImageAndBlur();
  // }, []);

  function getImageAndBlur() {
    getBlurFile();
    getImageList();
  }

  function getImageList() {
    PipelineService.getListOfImageNames("Adaptive", params.id).then((data) => {
      let imgName = data.data;

      let imageList = [];
      imgName.forEach((img) => {
        let url = PipelineService.getImageUrl("Adaptive", img, params.id);
        imageList.push({
          id: uuidv4(),
          file_name: img,
          imageUrl: url,
          isManual: true,
        });
      });

      setImage(imageList);
    });
  }

  function getBlurFile() {
    PipelineService.getBlur(params.id).then((data) => {
      console.log(data);
      setCurrentBlurList(data);
    });
  }
  useEffect(() => {
    getImageAndBlur();
  }, []);

  useEffect(() => {
    if (image.length > 0) {
      handleListClick(0);
    } else {
      setCurrId(null);
      setCurrImagePath(null);
    }
  }, [image]);

  const handleListClick = (id) => {
    // console.log(image.length)
    if (id <= image.length - 1) {
      setCurrId(id);
      setCurrImagePath(image[id].imageUrl);
      setCurrFileName(image[id].file_name); //
      // setCurrentBlur(blurList[]);
      console.log(image[id].file_name);
    } else {
      setCurrId(null);
      setCurrImagePath(null);
      setCurrFileName(null);
    }
  };

  const handleConfigCheck = (event) => {
    if (event.target.checked === true) {
      setControlDisable(1);
      // image[currId].isManual = true;
    } else {
      setControlDisable(0);
      // image[currId].isManual = false;
    }
  };

  const handlePreview = () => {
    const query = {
      file_name: currFileName + ".jpg",
      apply_CLAHE: applyCLAHE,
      window_size: parseInt(windowSize),
      denoise_size: parseInt(denoisedSize),
      clip_limit: parseInt(clipLimitValue),
    };
    console.log(query);
    PipelineService.applyManualAdaptivePreprocesscing(query).then(
      (preprocess_result) => {
        let url = PipelineService.getImageUrl(
          "Adaptive",
          preprocess_result.file_name,
          "Adaptive-Preview"
        );

        console.log(preprocess_result);
        console.log(url);
        setCurrImagePath(null);
        setCurrImagePath(url);
        setCurrId(currId);
        console.log("DONE");
      }
    );
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
                      <img src={im.imageUrl} />
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
            <Stack gap={2} className="col-md-11 mx-auto">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  className="img-display"
                  id={currId}
                  src={currImagePath}
                  // key={currImagePath}
                />
              </div>
            </Stack>
            <div>{currentBlur}</div>
          </Col>
          <Col>
            <p style={{ textAlign: "center", fontWeight: "bold" }}>
              Adaptive Processing Control
            </p>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexSwitch"
                onChange={handleConfigCheck}
              ></input>
              <label class="form-check-label" for="flexSwitch">
                Manual Configuration
              </label>
            </div>
            <form>
              {controlDisable === 0 ? (
                // Disabled form
                <div>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckClahe"
                    disabled
                  />
                  <label class="form-check-label" for="flexCheckClahe">
                    Apply Clahe Equalization
                  </label>
                  <br />
                  <label class="form-check-label" for="flexInput">
                    CLAHE ClipLimit Rate
                  </label>
                  <input
                    class="form-control"
                    type="float"
                    placeholder="i.e. 5 (Odd Value from 5-7)"
                    id="flexInput"
                    aria-label="i.e. 5 (5-7)"
                    disabled
                  ></input>
                  <br />
                  <label class="form-check-label" for="flexInput">
                    Sauvola Window Value
                  </label>
                  <input
                    class="form-control"
                    type="float"
                    placeholder="i.e. 51 (Odd Value from 51-71)"
                    id="flexInput"
                    aria-label="i.e. 51 (51-71)"
                    disabled
                  ></input>
                  <br />
                  <label class="form-check-label" for="flexInput">
                    Denoised Rate
                  </label>
                  <input
                    class="form-control"
                    type="float"
                    placeholder="i.e. 30.0 (Value from 20-40)"
                    id="flexInput"
                    aria-label="i.e. 30.0 (20-40)"
                    disabled
                  ></input>
                </div>
              ) : (
                // Enabled form
                <div>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexCheckClahe"
                    defaultChecked={applyCLAHE}
                    onChange={() => setApplyCLAHE(!applyCLAHE)}
                  />
                  <label class="form-check-label" for="flexCheckClahe">
                    Apply Clahe Equalization
                  </label>
                  <br />
                  <label class="form-check-label" for="flexInput">
                    CLAHE ClipLimit Rate
                  </label>
                  <input
                    class="form-control"
                    type="float"
                    placeholder="i.e. 5 (Odd Value from 5-7)"
                    id="flexInput"
                    aria-label="i.e. 5 (5-7)"
                    value={clipLimitValue}
                    onInput={(e) => setclipLimitValue(e.target.value)}
                  ></input>
                  <br />
                  <label class="form-check-label" for="flexInput">
                    Sauvola Window Value
                  </label>
                  <input
                    class="form-control"
                    type="float"
                    placeholder="i.e. 51 (Odd Value from 51-71)"
                    id="flexInput"
                    aria-label="i.e. 51 (51-71)"
                    value={windowSize}
                    onInput={(e) => setWindowize(e.target.value)}
                  ></input>
                  <br />
                  <label class="form-check-label" for="flexInput">
                    Denoised Rate
                  </label>
                  <input
                    class="form-control"
                    type="float"
                    placeholder="i.e. 30.0 (Value from 20-40)"
                    id="flexInput"
                    aria-label="i.e. 30.0 (20-40)"
                    value={denoisedSize}
                    onInput={(e) => setDenoisedSize(e.target.value)}
                  ></input>
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
            <button className="save-btn" onClick={handlePreview}>
              Preview
            </button>{" "}
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

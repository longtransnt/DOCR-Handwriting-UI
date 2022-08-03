import "../App.css";
import "../styles/Popup.css";
import "../styles/Pagination.css";
import "../styles/Buttons.css";
import "../styles/Checkbox.css";
import "react-dropdown/style.css";
import "react-toastify/dist/ReactToastify.css";
import "react-dropzone-uploader/dist/styles.css";
import Form from "react-bootstrap/Form";
import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useContext,
} from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import OriginalView from "../components/OriginalView";
import { ToastContainer, toast } from "react-toastify";
import { Scrollbars } from "react-custom-scrollbars";
import { Dropdown } from "react-bootstrap";
import { IoChevronDown } from "react-icons/io5";
import UploadService from "../services/UploadService";
import OriginalService from "../services/OriginalService";
import Popup from "../components/Popup";
import Upload from "../components/Upload";
import Coordinate from "../components/Coordinate";
import ReactPaginate from "react-paginate";

let notiFormat = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

// Notifications
const notiSaving = () =>
  toast.warn("Please input annotation before saving!", notiFormat);
const notiDownload = () =>
  toast.warn("Required at least 1 annotation to download!", notiFormat);
const notiSuccess = () => toast.success("Annotation saved.", notiFormat);

export default function AnnotationPage() {
  const [currId, setCurrId] = useState(0);
  const [currImagePath, setCurrImagePath] = useState("");
  const [annotation, setAnnotation] = useState("");
  const [annotationList, setAnnotationList] = useState([]);
  const [updateState, setUpdateState] = useState(0);
  const [checked, setChecked] = useState(false);
  const [image, setImage] = useState([]);
  const [confidenceState, setConfidenceState] = useState(100);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setToTalPage] = useState(0);
  const [originalImageId, setOriginalImageId] = useState("");
  const [chosenImageId, setChosenImageId] = useState("");
  const [chosenImageCords, setChosenImageCords] = useState([0, 0, 0, 0]);
  const prevPage = useRef();
  var mapData = [];

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  // Fetch image list related functions
  const fetchInitialUploads = useCallback(() => {
    getPage(0);
  }, []);

  useEffect(() => {
    fetchInitialUploads();
  }, [fetchInitialUploads]);

  useEffect(() => {
    if (image.length > 0) {
      if (prevPage.current !== currentPage) {
        handleListClick(0);
      } else {
        handleListClick(currId);
      }
      prevPage.current = currentPage;
    } else {
      // if (totalPage > 0 ){
      //   setCurrentPage(totalPage -1)
      // }
      setCurrId(null);
      setCurrImagePath(null);
      setChecked(null);
      setAnnotation(null);
    }
  }, [image]);

  function loadImageList(rows) {
    mapData = rows;
    // .filter(function (up) {
    //   return up.ground_truth === null;
    // });

    setImage(mapData);
  }

  function getPage(page) {
    console.log("get page: " + page);
    console.log("current page: " + currentPage);
    UploadService.getPage(page, 135)
      .then((data) => {
        loadImageList(data.rows);
        setToTalPage(data.totalPages);
      })
      .catch(console.error);
  }

  const changePage = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  useEffect(() => {
    if (totalPage > 0) {
      getPage(currentPage);
    }
  }, [currentPage]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleClickSave();
    }
  };

  // Handle when user click "Save Annotations"
  const handleClickSave = () => {
    // console.log(updateState);
    if (annotation !== "") {
      if (updateState === 1) {
        //New Put to API
        var updatedUpload = {
          id: image[currId].id,
          ground_truth: annotation,
          confidence: confidenceState,
          is_verified: checked,
        };
        // console.log(updatedUpload);
        UploadService.updateUploadById(updatedUpload.id, updatedUpload).then(
          (res) => {
            console.log(res);
            image[currId].ground_truth = res.ground_truth;
            loadImageList(image);
            // getPage(currentPage)
          }
        );
        setUpdateState(0);
      }
      notiSuccess();
    } else {
      setUpdateState(0);
      notiSaving(); // not allow to save if no annotation
    }
  };

  // Handle when user click image on list
  const handleListClick = (id) => {
    // console.log(image.length)
    if (id <= image.length - 1) {
      // // Testing only
      // Move to this image
      setCurrId(id);
      setCurrImagePath(image[id].imageUrl);
      setOriginalImageId(image[id].original_image_id);
      setChosenImageId(image[id].image_id);
      var cords = [
        image[id].max_x,
        image[id].max_y,
        image[id].min_x,
        image[id].min_y,
      ];
      setChosenImageCords(cords);

      if (image[id].ground_truth === null) setAnnotation("");
      else setAnnotation(image[id].ground_truth);
      setUpdateState(1);
      setChecked(image[id].is_verified);

      //Setting confidence
      if (image[id].confidence != null) {
        setConfidenceState(image[id].confidence);
      } else {
        setConfidenceState(100); // Default confidence
      }
    } else {
      setCurrId(null);
      setCurrImagePath(null);
      setChecked(null);
      setAnnotation(null);
    }
  };

  function writeToFile(document, element, equivalenceValue, temp, j) {
    console.log("length: ", image.length);
    for (let i = 0; i < image.length; i++) {
      if (
        image[i].ground_truth !== undefined &&
        image[i].confidence === equivalenceValue
      ) {
        temp[j] = image[i].file_name + "\t" + image[i].ground_truth + "\n";
        j++;
      }
    }
    var data = temp;
    // console.log(data);
    const file = new Blob(data, {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "annotation" + equivalenceValue + ".txt";
    document.body.appendChild(element);
    element.click();
  }

  function handleDownload(eventKey) {
    const element = document.createElement("a");
    // console.log(image);
    let temp = [];
    let j = 0;
    // setDownloadOption(eventKey);
    // console.log(eventKey)
    if (image.length === 0) {
      notiDownload();
    } else {
      switch (eventKey) {
        case "25":
          writeToFile(document, element, "25", temp, j);
          break;
        case "50":
          writeToFile(document, element, "50", temp, j);
          break;
        case "75":
          writeToFile(document, element, "75", temp, j);
          break;
        case "100":
          writeToFile(document, element, "100", temp, j);
          break;
        default:
          for (let i = 0; i < image.length; i++) {
            if (
              image[i].ground_truth !== undefined &&
              image[i].is_verified === true
            ) {
              temp[j] =
                image[i].file_name + "\t" + image[i].ground_truth + "\n";
              j++;
            }
          }
          var data = temp;
          // console.log(data);
          const fileAll = new Blob(data, {
            type: "text/plain",
          });
          element.href = URL.createObjectURL(fileAll);
          element.download = "annotation-all.txt";
          document.body.appendChild(element);
          element.click();
      }
    }
  }

  //Handle click OUCRU verified
  const handleChecked = () => {
    setChecked(!checked);
  };

  //Handle elect confidence
  const handleConfidenceSelect = (value) => {
    setConfidenceState(value);
  };

  return (
    <div className="App-header">
      <input
        className="upload-btn"
        type="button"
        value="Upload"
        onClick={togglePopup}
      />
      {isOpen && (
        <Popup
          content={
            <>
              <div className="upload-container">
                <Upload fetchUploads={fetchInitialUploads} />
              </div>
            </>
          }
          handleClose={togglePopup}
        />
      )}
      <Container>
        <Row xs={1} md={2}>
          <Col>
            {/* Displaying Image */}
            <p style={{ textAlign: "center", fontWeight: "bold" }}>
              Current Image
            </p>
            <Stack gap={4} className="col-md-11 mx-auto">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img className="img-display" id={currId} src={currImagePath} />
              </div>
              <p style={{ fontSize: "22px", fontWeight: "bold" }}>
                Annotation Preview:
                <span
                  style={{
                    fontSize: "22px",
                    fontWeight: "100",
                    paddingLeft: "5px",
                  }}
                >
                  {/* Preview annotation */}
                  {annotationList[currId] !== undefined
                    ? annotationList[currId].split(
                        image[currId].file_name + "\t"
                      )
                    : annotation === ""
                    ? "None"
                    : annotation !== null
                    ? annotation
                    : "None"}
                </span>
              </p>
              <Form onSubmit={handleClickSave}>
                <div
                  class="btn-toolbar"
                  role="toolbar"
                  aria-label="Toolbar with button groups"
                >
                  <div
                    class="btn-group mr-2"
                    role="group"
                    aria-label="First group"
                  >
                    <button
                      type="button"
                      class="btn btn-light"
                      onClick={() => setAnnotation(annotation + "°")}
                    >
                      Degree °
                    </button>
                    <button
                      type="button"
                      class="btn btn-light"
                      onClick={() => setAnnotation(annotation + "Δ")}
                    >
                      Diagnose Δ
                    </button>
                    <button
                      type="button"
                      class="btn btn-light"
                      onClick={() => setAnnotation(annotation + "ʘ")}
                    >
                      Include ʘ
                    </button>
                  </div>
                </div>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Enter your annotation here."
                    style={{ border: "none", height: "20vh" }}
                    value={annotation}
                    onChange={(e) => {
                      setAnnotation(e.target.value);
                    }}
                    onKeyDown={handleKeyDown}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div>
                        <label
                          style={{
                            fontSize: "1rem",
                            color: "#005477",
                            float: "left",
                            marginRight: "5px",
                          }}
                        >
                          % Confidence
                        </label>
                      </div>
                      <div>
                        <Dropdown onSelect={handleConfidenceSelect}>
                          <Dropdown.Toggle
                            style={{
                              minWidth: "100% !important",
                              textAlign: "right",
                            }}
                            id="dropdown-split-basic"
                          >
                            {confidenceState}
                            <IoChevronDown
                              style={{
                                width: "1rem",
                                height: "1rem",
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
                            <Dropdown.Item
                              className="dropdown-item"
                              eventKey="100"
                            >
                              100
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="dropdown-item"
                              eventKey="75"
                            >
                              75
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="dropdown-item"
                              eventKey="50"
                            >
                              50
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="dropdown-item"
                              eventKey="25"
                            >
                              25
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "1rem",
                        color: "#005477",
                      }}
                    >
                      <div>
                        <input
                          id="checkbox3"
                          style={{
                            margin: "5px 5px 0 0",
                            color: "#005477",
                            fontWeight: "500",
                            cursor: "pointer",
                          }}
                          type="checkbox"
                          checked={checked}
                          onChange={handleChecked}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="verified"
                          onClick={handleChecked}
                          style={{ cursor: "pointer" }}
                        >
                          Verified by OUCRU
                        </label>
                      </div>
                    </div>
                  </div>
                </Form.Group>
              </Form>
            </Stack>
          </Col>
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
            <ReactPaginate
              className="pagination"
              pageRangeDisplayed={15}
              previousLabel={"←"}
              nextLabel={"→"}
              pageCount={totalPage}
              onPageChange={changePage}
              disabledClassName={"pagination__link--disabled"}
              activeClassName={"pagination__link--active"}
            />
          </Col>
        </Row>
      </Container>

      <Row style={{ marginTop: "7rem" }}>
        <Col style={{ position: "fixed", bottom: 0, marginBottom: "1rem" }}>
          <div style={{ float: "left" }}>
            <OriginalView
              image_id={chosenImageId}
              original_image_id={originalImageId}
              chosen_image_cords={chosenImageCords}
              // url={originalUrl} coord={coordinate}
            />
          </div>
          <div style={{ float: "right", marginRight: "46px" }}>
            <button className="save-btn" onClick={handleClickSave}>
              Save the annotation
            </button>{" "}
            <div style={{ float: "right" }}>
              <Dropdown onSelect={handleDownload}>
                <Dropdown.Toggle id="dropdown-basic-button">
                  DOWNLOAD
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
                  <Dropdown.Item className="dropdown-item" eventKey="25">
                    25% Confidence
                  </Dropdown.Item>
                  <Dropdown.Item className="dropdown-item" eventKey="50">
                    50% Confidence
                  </Dropdown.Item>
                  <Dropdown.Item className="dropdown-item" eventKey="75">
                    75% Confidence
                  </Dropdown.Item>
                  <Dropdown.Item className="dropdown-item" eventKey="100">
                    100% Confidence
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item className="dropdown-item" eventKey="all">
                    Download All
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Coordinate />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

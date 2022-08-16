import React, {
    useState,
    useCallback,
    useEffect,
    useRef,
  } from "react";
import "../styles/Recognition.css";
import "../App.css"
import { useLocation } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import ListGroup from "react-bootstrap/ListGroup";
import UploadService from "../services/UploadService";
import ReactPaginate from "react-paginate";

export default function RecognitionPage() {
    const location = useLocation();
    const data = location.state;
    const [currId, setCurrId] = useState(0);
    const [currImagePath, setCurrImagePath] = useState("");
    const [image, setImage] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setToTalPage] = useState(0);
    const [originalImageId, setOriginalImageId] = useState("");
    const [chosenImageId, setChosenImageId] = useState("");
    const [chosenImageCords, setChosenImageCords] = useState([0, 0, 0, 0]);
    const prevPage = useRef();
    var mapData = [];

    // Fetch image list related functions
    const fetchInitialUploads = useCallback(() => {
        // getPage(0);
        // getByOriginal(params.id, 0);
        getAppropriateData(data.image_id, 0);
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
        setCurrId(null);
        setCurrImagePath(null);
        }
    }, [image]);

    function loadImageList(rows) {
        mapData = rows;
        setImage(mapData);
    }

    function getAppropriateData(id, page) {
        console.log(id);
        if (id === "all") {
        getAllByPage(page);
        } else {
        getByOriginal(id, page);
        }
    }

    function getAllByPage(page) {
        console.log("get page: " + page);
        console.log("current page: " + currentPage);
        UploadService.getPage(page, 135)
        .then((data) => {
            loadImageList(data.rows);
            setToTalPage(data.totalPages);
        })
        .catch(console.error);
    }

    function getByOriginal(id, page) {
        UploadService.getByOriginalId(id, page).then((data) => {
        console.log(data.rows);
        loadImageList(data.rows);
        setToTalPage(data.totalPages);
        });
    }
    const changePage = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    };

    useEffect(() => {
        if (totalPage > 0) {
        // getPage(currentPage);
        // getByOriginal(params.id, currentPage);
        getAppropriateData(data.image_id, currentPage);
        }
    }, [currentPage]);

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
        }
    };

    return (
        <div className="recognition-page-body">
            <div className="title-page">Text Recognition</div>
            <div className="main-area">
                <div className="image-area">
                    <div className="image-title">{data.file_name}</div>
                    <img className="image-display" src={data.imageUrl}/>
                </div>
                <Scrollbars>
                    {image.map((im, id) => (
                    <ListGroup.Item
                        id={"image_" + id}
                        key={id}
                        value={id}
                        style={{ cursor: "pointer" }}
                    >
                        {/* {im.file_name && im.file_name.length ? (
                        <img src={im.thumbnailUrl} />
                        ) : null} */}
                        {im.ground_truth}
                    </ListGroup.Item>
                    ))}
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
            </div>
        </div>
    )
}
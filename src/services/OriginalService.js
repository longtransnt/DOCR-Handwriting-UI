import axios from "axios";
import { COORDINATE_URL, ORIGINALS_URL } from "../constant";

let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
};

async function getCoordinatesById(id) {
  const coordinates = await axios.get(COORDINATE_URL + "/" + id, axiosConfig);
  console.log("Coordinates: ", coordinates.data);
  return coordinates.data;
}

async function getOriginalImageById(id) {
  const image_original = await axios.get(ORIGINALS_URL + "/" + id, axiosConfig);
  console.log("Original Image: ", image_original.data);
  return image_original.data;
}

async function getAllOriginals(pageNum = 0, size = 10) {
  const originalList = await axios.get(
    ORIGINALS_URL + `?page=${pageNum}&size=${size}`,
    axiosConfig
  );
  console.log("All original: ", originalList.data);
  return originalList.data;
}

export default { getOriginalImageById, getCoordinatesById, getAllOriginals };

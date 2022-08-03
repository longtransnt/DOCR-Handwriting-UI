import axios from "axios";
import { UPLOAD_URL, UPLOAD_UNANNOTATED_URL } from "../constant";

let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
};

async function getUnannotatedImageList() {
  const image = await axios.get(UPLOAD_UNANNOTATED_URL, axiosConfig);
  console.log("Image List: ", image.data.rows);
  return image.data.rows;
}

async function getImageList() {
  const image = await axios.get(UPLOAD_URL, axiosConfig);
  console.log("Image List: ", image.data);
  return image.data;
}

const updateUploadById = (id, data) => {
  const put_request = axios.put(UPLOAD_URL + "/" + id, data, axiosConfig);
  return put_request.then((response) => response.data);
};

async function getPage(pageNum, size) {
  const image = await axios.get(
    UPLOAD_URL + `?page=${pageNum}&size=${size}`,
    axiosConfig
  );
  console.log("Image List By Page: ", image.data);
  return image.data;
}

export default {
  getImageList: getUnannotatedImageList,
  updateUploadById,
  getPage,
};

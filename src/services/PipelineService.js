import axios from "axios";
import { PIPELINE_CHECK_DIR_URL } from "../constant";

let STATIC_LIST_ENDPOINT = "http://localhost:5000/get-static-list/";
let STATIC_DISPLAY = "http://localhost:5000/display/";

let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
};

async function checkIfdirectoryExist(path) {
  const isExist = await axios.get(
    PIPELINE_CHECK_DIR_URL + "?path=" + path,
    axiosConfig
  );
  return isExist;
}

async function getInputImageList() {
  const url = `http://localhost:5000/get-input-list`;
  const imagelist = await axios.get(url, axiosConfig);
  return imagelist;
}

async function getListOfImageNames(path, category) {
  if (category === undefined) {
    const url = `http://localhost:5000/get-static-list/${path}`;
    const imagelist = await axios.get(url, axiosConfig);
    return imagelist;
  } else {
    const url = `http://localhost:5000/get-static-list/${path}/${category}`;
    const imagelist = await axios.get(url, axiosConfig);
    return imagelist;
  }
}

async function getFoldersFromPath(path) {
  const url = `http://localhost:5000/get-static-folder/${path}`;
  const folderList = await axios.get(url, axiosConfig);
  return folderList;
}

function getInputImage(name) {
  const url = `http://localhost:5000/display-input/${name}.jpg`;
  return url;
}

function getImageUrl(path, name, category) {
  if (category === undefined) {
    const url = `http://localhost:5000/display-output/${path}/${name}.jpg`;
    return url;
  } else {
    const url = `http://localhost:5000/display-sub-output/${path}/${category}/${name}.jpg`;
    return url;
  }
}

async function applyManualAdaptivePreprocesscing(query) {
  const url = `http://localhost:5000/manual_adaptive`;
  const preprocess_result = await axios.post(url, query, axiosConfig);
  return preprocess_result.data;
}

async function fetchWERandCER(query) {
  const url = `http://localhost:5000/text_recognition_eval`;
  const result = await axios.post(url, query, axiosConfig);
  return result.data;
}

export default {
  checkIfdirectoryExist,
  getInputImageList,
  getImageUrl,
  getListOfImageNames,
  applyManualAdaptivePreprocesscing,
  getFoldersFromPath,
  getInputImage,
  fetchWERandCER,
};

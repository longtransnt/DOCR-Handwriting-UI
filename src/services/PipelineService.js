import axios from "axios";
import { PIPELINE_CHECK_DIR_URL, PIPELINE_LOCALHOST } from "../constant";

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
  const url = `${PIPELINE_LOCALHOST}get-input-list`;
  const imagelist = await axios.get(url, axiosConfig);
  return imagelist;
}

async function getListOfImageNames(path, category, denoised) {
  if (category === undefined) {
    const url = `${PIPELINE_LOCALHOST}get-static-list/${path}`;
    const imagelist = await axios.get(url, axiosConfig);
    return imagelist;
  } else if (denoised !== undefined) {
    const url = `${PIPELINE_LOCALHOST}get-static-denoised-list/${path}/${category}`;
    const imagelist = await axios.get(url, axiosConfig);
    return imagelist;
  } else {
    const url = `${PIPELINE_LOCALHOST}get-static-list/${path}/${category}`;
    const imagelist = await axios.get(url, axiosConfig);
    return imagelist;
  }
}

async function getFoldersFromPath(path) {
  const url = `${PIPELINE_LOCALHOST}get-static-folder/${path}`;
  const folderList = await axios.get(url, axiosConfig);
  return folderList;
}

function getInputImage(name) {
  const url = `${PIPELINE_LOCALHOST}display-input/${name}.jpg`;
  return url;
}

function getImageUrl(path, name, category, denoise) {
  if (category === undefined) {
    const url = `${PIPELINE_LOCALHOST}display-output/${path}/${name}.jpg`;
    return url;
  } else if (denoise !== undefined) {
    const url = `${PIPELINE_LOCALHOST}display-adpt-denoised-output/${path}/${category}/${name}.jpg`;
    return url;
  } else {
    const url = `${PIPELINE_LOCALHOST}display-sub-output/${path}/${category}/${name}.jpg`;
    return url;
  }
}

async function applyManualAdaptivePreprocesscing(query) {
  const url = `${PIPELINE_LOCALHOST}manual_adaptive`;
  const preprocess_result = await axios.post(url, query, axiosConfig);
  return preprocess_result.data;
}

async function fetchWERandCER(query) {
  const url = `${PIPELINE_LOCALHOST}text_recognition_eval`;
  const result = await axios.post(url, query, axiosConfig);
  return result.data;
}

async function getBlur(file_name) {
  const url = `${PIPELINE_LOCALHOST}get_blur/${file_name}`;
  const result = await axios.get(url, axiosConfig);
  return result.data;
}

async function callPipelinePrediction(filename) {
  const url = `${PIPELINE_LOCALHOST}input_to_adaptive/${filename}`;
  const response = await axios.get(url, axiosConfig);
  return response;
}

async function callTextRecognitionModule(filename) {
  const url = `${PIPELINE_LOCALHOST}run_text_recognition/${filename}`;
  const response = await axios.get(url, axiosConfig);
  return response.data;
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
  callPipelinePrediction,
  getBlur,
  callTextRecognitionModule,
};

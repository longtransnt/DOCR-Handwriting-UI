import axios from "axios";
import { PIPELINE_CHECK_DIR_URL } from "../constant";
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

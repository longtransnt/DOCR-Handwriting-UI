import axios from "axios";
import {DEPLOYED_UPLOAD_URL, DEPLOYED_UPLOAD_UNANNOTATED_URL, LOCAL_UNANNOTATE, LOCAL_UPLOAD} from "../constant"

let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
  };

async function getUnannotatedImageList() {
    const image = await axios.get(LOCAL_UNANNOTATE, axiosConfig);
    console.log('Image List: ', image.data.rows);
    return image.data.rows;
}

async function getImageList() {
    const image = await axios.get(LOCAL_UPLOAD, axiosConfig);
    console.log('Image List: ', image.data);
    return image.data;
}


const updateUploadById = (id, data) => {
    const put_request =  axios.put(LOCAL_UPLOAD + '/' + id, data, axiosConfig)
    return put_request.then(response => response.data)
}

async function getPage(pageNum, size) {
    const image = await axios.get(LOCAL_UNANNOTATE + `?page=${pageNum}&size=${size}`, axiosConfig);
    console.log('Image List By Page: ', image.data.rows);
    return image.data.rows;
}

export default {getImageList: getUnannotatedImageList, updateUploadById, getPage}


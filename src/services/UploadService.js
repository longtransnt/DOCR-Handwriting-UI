import axios from "axios";
import DEPLOYED_UPLOAD_URL from "../constant"

let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
  };

async function getImageList() {
    const image = await axios.get(DEPLOYED_UPLOAD_URL, axiosConfig);
    console.log('Image List: ', image.data);
    return image.data;
}

const updateUploadById = (id, data) => {
    const put_request =  axios.put(DEPLOYED_UPLOAD_URL + '/' + id, data, axiosConfig)
    return put_request.then(response => response.data)
}

export default {getImageList, updateUploadById}


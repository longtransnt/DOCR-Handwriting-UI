import axios from "axios";
import {DEPLOYED_COORDINATE_URL, DEPLOYED_ORIGINALS_URL, LOCAL_COORDINATE, LOCAL_ORIGINAL} from "../constant"

let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
  };

async function getCoordinatesById(id) {
    const coordinates = await axios.get(DEPLOYED_COORDINATE_URL +"/" + id, axiosConfig);
    console.log('Coordinates: ', coordinates.data);
    return coordinates.data;
}

async function getOriginalImageById(id) {
    const image_original = await axios.get(DEPLOYED_ORIGINALS_URL +"/" + id, axiosConfig);
    console.log('Original Image: ', image_original.data);
    return image_original.data;
}


export default {getOriginalImageById, getCoordinatesById}


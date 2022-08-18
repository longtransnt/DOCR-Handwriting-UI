const PRIVATE_BEANSTALK_URL =
  "http://annotationnode-env.eba-iv5i9cmp.us-west-2.elasticbeanstalk.com/";
const RMIT_BEANSTALK_URL =
  "http://annotationnode-env.eba-fpskjd3h.us-west-2.elasticbeanstalk.com/";
const LOCALHOST = "http://localhost:8080/";
const PIPELINE_LOCALHOST = "http://localhost:5000/";
const CURRENT_HOST_URL = PRIVATE_BEANSTALK_URL;
export const UPLOAD_URL = CURRENT_HOST_URL + "api/uploads";
export const UPLOAD_UNANNOTATED_URL =
  CURRENT_HOST_URL + "api/uploads/unannotated";
export const COORDINATE_URL = CURRENT_HOST_URL + "api/coordinate";
export const ORIGINALS_URL = CURRENT_HOST_URL + "api/originals";
export const UPLOAD_BY_ORIGINAL_ID_URL =
  CURRENT_HOST_URL + "api/uploads/originals";
export const PIPELINE_CHECK_DIR_URL = PIPELINE_LOCALHOST + "/directory_exist";

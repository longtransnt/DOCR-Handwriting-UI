const PRIVATE_BEANSTALK_URL = "http://annotationnode-env.eba-iv5i9cmp.us-west-2.elasticbeanstalk.com/"
const RMIT_BEANSTALK_URL = "http://annotationnode-env.eba-fpskjd3h.us-west-2.elasticbeanstalk.com/"
const CURRENT_BEANSTALK_URL = RMIT_BEANSTALK_URL
export const DEPLOYED_UPLOAD_URL = CURRENT_BEANSTALK_URL + 'api/uploads'
export const DEPLOYED_UPLOAD_UNANNOTATED_URL = CURRENT_BEANSTALK_URL + 'api/uploads/unannotated'
export const DEPLOYED_COORDINATE_URL = CURRENT_BEANSTALK_URL + 'api/coordinate'
export const LOCAL_UNANNOTATE = "http://localhost:8080/api/uploads/unannotated"
export const LOCAL_UPLOAD = "http://localhost:8080/api/uploads"
export const DEPLOYED_ORIGINALS_URL = CURRENT_BEANSTALK_URL + 'api/originals'
export const LOCAL_COORDINATE = "http://localhost:8080/api/coordinate/"
export const LOCAL_ORIGINAL = "http://localhost:8080/api/originals/"


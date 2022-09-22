
#    DOCR-Handwriting-UI

  Front End User Interface for HANDWRITING RECOGNITION APPLICATION FOR TETANUS TREATMENT

## Acknowledgements
This project module has been developed and belongs to:
 - [RMIT University Vietnam SGS](https://www.rmit.edu.vn/)
 - [Oxford University Clinical Research Unit](https://www.oucru.org/)


## Authors

- [@longtransnt](https://github.com/longtransnt)
- [@chrisidenbui](https://github.com/chrisidenbui)
- [@julliannah](https://github.com/julliannah)
- [@s3681447](https://github.com/s3681447)


## Built With

This project has been built with:

[![Node JS](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)]()

[![JavaScript](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)]()

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)]()

[![Amazon](https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)]()



##  Prerequisites

To run this app you need to set up the following applications:

- DOCR-Handwriting-Pipeline
- DOCR-Handwriting-Backend 


##  Installations

To install all the packages for this FrontEnd website application:
```
  npm install --legacy-peer-deps
```

## Environment Variables

To run this project, you will need to add the following environment variables to your ./config/config.json file:

`PIPELINE_LOCALHOST = [PIPELINE HOST ADDRESS]`

`CURRENT_HOST_URL = [CURRENT ANNOTATION BACKEND ENDPOINT]`

## Localhost

To run this project as localhost, set up environment variables and AWS Credentials Key (if needed):
```
  npm start
```

Access the following endpoint to use the API:
```http
  localhost:3000
```
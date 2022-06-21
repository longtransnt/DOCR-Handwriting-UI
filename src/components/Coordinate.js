import React, { useState, useEffect } from 'react';
import myJson from './../data.json';

import 'react-dropzone-uploader/dist/styles.css'
import { Button } from 'react-bootstrap';
function Coordinate() {
    const getData=()=>{
        for (let i = 0; i < myJson.length; i++) {
            let obj = myJson[i];
            console.log(obj);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    image_name: obj.image_name,
                    original_image_name:obj.original_image_name,
                    max_x:obj.max_x,
                    max_y:obj.max_y,
                    min_x:obj.min_x,
                    min_y:obj.min_y
                })
            };
            fetch('http://localhost:8080/api/coordinate', requestOptions)
                .then(response => response.json())
                .then(data => console.log(data));
        }
      }
      
  return (
    <div>
        <Button onClick={getData}>

        </Button>
    </div>
  );
}

export default Coordinate;


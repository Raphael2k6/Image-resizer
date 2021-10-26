import React, { useState, Fragment } from "react";
import { handleResize } from "./Resizer"

function App() {
  const [image, setImage] = useState();

  const handleId = (event) => {
    const uploadFilesArray = Array.prototype.slice.call(event.target.files);
    uploadFilesArray.forEach((file) => {
      const fileUrl = window.URL.createObjectURL(file);
      const reader = new FileReader();
      const fileData = {
        fileUrl,
        name: file.name,
      };
      reader.readAsDataURL(file);
      handleResize(file, (resizedImage) => {
        console.log("original image", uploadFilesArray);
        console.log("resized image", resizedImage);
        setImage(URL.createObjectURL(resizedImage));
      });
    });
  };

  return (
    <Fragment>
      <h3>Images greater than 2mb will be resized</h3>
      <input
        accept="image/*"
        id="img"
        name="myImage"
        onChange={(e) => handleId(e)}
        type="file"
      />
      <p>Preview image</p>  
      <img src={image} alt="image preview" />
    </Fragment>
  );
}

export default App;

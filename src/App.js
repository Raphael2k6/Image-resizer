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
      <input 
        type="file"

      />  
    </Fragment>
  );
}

export default App;

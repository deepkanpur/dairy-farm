import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { useState } from "react";
import ImagePreview from "./ImagePreview";

export default function ImageCapture() {

  const [dataUri, setDataUri] = useState('');
  
  return (
    <>
      {dataUri ? (
        <ImagePreview dataUri={dataUri} setDataUri={setDataUri}/>
      ) : (
        <Camera
          onTakePhoto={(dataUri) => {
            setDataUri(dataUri);
          }}
        />
      )}
    </>
  );
}

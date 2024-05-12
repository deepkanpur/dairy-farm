import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { useStore } from "../../stores/store";

interface Props {
  uploadPhoto: (file: Blob) => void;
}

export default function ImageCapture({ uploadPhoto }: Props) {
  const { modalStore } = useStore();

  function handleTakePhoto(dataUri: string) {
    // Do stuff with the photo...

    uploadPhoto(dataURItoBlob(dataUri));
    modalStore.closeModal();
  }

  function dataURItoBlob(dataURI: string) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

  return (
    <>
      <Camera
        onTakePhoto={(dataUri) => {
          handleTakePhoto(dataUri);
        }}
      />
    </>
  );
}

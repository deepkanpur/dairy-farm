import { Button, Image, Input } from "semantic-ui-react";
import { useStore } from "../../../../app/stores/store";
import { useParams } from "react-router-dom";
import { IAddDairyPhoto } from "../../../../app/models/dairy";
import { useState } from "react";

interface Props {
  dataUri: string;
  setDataUri: (dataUri: string) => void;
}
export default function ImagePreview({dataUri, setDataUri }: Props) {
  const { modalStore, dairyStore } = useStore();
  const { uploadPhoto } = dairyStore;
  const { id } = useParams<{ id: string }>();
  const [description, SetDescription] = useState<string>('');

  function handlePhotoUpload(dataUri: string) {
    modalStore.closeModal();
    const file = dataURItoBlob(dataUri)

    const addPhoto: IAddDairyPhoto = {
      file : file,
      dairyId : id!,
      description: description,
      latitude: 26.4097694,
      longitude: 80.2554600,
    };
    console.log('addPhoto: ', addPhoto);
    uploadPhoto(addPhoto);
}

  function dataURItoBlob(dataURI: string) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(",")[0].indexOf("base64") >= 0)
      byteString = atob(dataURI.split(",")[1]);
    else byteString = unescape(dataURI.split(",")[1]);

    // separate out the mime component
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

  return (
    <>
      <Image src={dataUri} size="medium" />
      <Input placeholder='Description' style={{marginRight: 5}} onChange={e => SetDescription(e.target.value)}  />
      <Button.Group floated='right'>
        <Button
            positive icon='check'
            onClick={() => handlePhotoUpload(dataUri)}
        />
        <Button icon="close" onClick={() => setDataUri("")}/>
      </Button.Group>
    </>
  );
}

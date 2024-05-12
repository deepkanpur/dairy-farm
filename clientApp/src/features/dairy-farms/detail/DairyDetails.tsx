import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import DairyDetailedChat from "./DairyDetailedChat";
import DairyPhotos from "./DairyPhotos";
import DairyDetailedHeader from "./DairyDetailedHeader";
import LoadingComponent from "../../../app/layout/loadingComponent";
import { IAddDairyPhoto } from "../../../app/models/dairy";

export default observer(function DairyDetails() {
  const { dairyStore } = useStore();
  const { selectedDairy: dairy, loadDairy, loadingInitial, uploadPhoto, loading } = dairyStore;
  const { id } = useParams<{ id: string }>();

  function handlePhotoUpload(file: Blob) {
    const addPhoto: IAddDairyPhoto = {
      file : file,
      dairyId : id!,
      description: "test",
      latitude: 26.4097694,
      longitude: 80.2554600,
    };
    uploadPhoto(addPhoto);
}

  useEffect(() => {
    if (id) loadDairy(id);
  }, [id, loadDairy]);

  if (loadingInitial || !dairy) return <LoadingComponent content="Loading Dairy Detail..." />;

  return (
    <>
      <DairyDetailedHeader dairy={dairy} uploadPhoto={handlePhotoUpload} loading={loading} />      
      <DairyPhotos diaryPhotos={dairy.photos}/>
      <DairyDetailedChat />
    </>
  );
});

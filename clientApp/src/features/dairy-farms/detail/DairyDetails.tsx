import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import DairyDetailedChat from "./DairyDetailedChat";
import DairyPhotos from "./DairyPhotos";
import DairyDetailedHeader from "./DairyDetailedHeader";
import LoadingComponent from "../../../app/layout/loadingComponent";

export default observer(function DairyDetails() {
  const { dairyStore } = useStore();
  const { selectedDairy: dairy, loadDairy, loadingInitial } = dairyStore;
  const { id } = useParams<{ id: string }>();
  
  useEffect(() => {
    if (id) loadDairy(id);
  }, [id, loadDairy]);

  if (loadingInitial || !dairy) return <LoadingComponent content="Loading Dairy Detail..." />;

  return (
    <>
      <DairyDetailedHeader/>      
      <DairyPhotos />
      <DairyDetailedChat />
    </>
  );
});

import { observer } from "mobx-react-lite";
import { Item, Segment } from "semantic-ui-react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useStore } from "../../../app/stores/store";

export default observer(function DairyPhotos() {
  const { dairyStore: {selectedDairy}  } = useStore();  

  if (!selectedDairy || !selectedDairy.photos || selectedDairy.photos.length <= 0) return null;
  return (
    <Segment>
      <Item.Group>
        <Item.Content>
          <ImageGallery 
            showThumbnails={false}
            showFullscreenButton={true}
            showPlayButton={true}
            showBullets={true}
            items={selectedDairy.photos} />          
        </Item.Content>
      </Item.Group>
    </Segment>
  );
});

import { observer } from "mobx-react-lite";
import { Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function DairyPhotos() {
  const { dairyStore: {selectedDairy}  } = useStore();  
  if (!selectedDairy || !selectedDairy.photos || selectedDairy.photos.length <= 0) return null;
  return (
    <Segment>
      <Item.Group>
        <Item.Content>
          {selectedDairy.photos.map((photo) => (
            <Item key={photo.id}>
              <Item.Image
                size="medium"
                rounded
                centered
                src={photo.url || "/assets/user.png"}
              />
            </Item>
          ))}
        </Item.Content>
      </Item.Group>
    </Segment>
  );
});

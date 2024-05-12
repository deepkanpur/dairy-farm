import { observer } from "mobx-react-lite";
import { DairyPhoto } from "../../../app/models/dairy";
import { Item, Segment } from "semantic-ui-react";
interface Props {
  diaryPhotos: DairyPhoto[] | undefined;
}
export default observer(function DairyPhotos({ diaryPhotos }: Props) {
  if (diaryPhotos && diaryPhotos.length <= 0) return null;
  return (
    <Segment>
      <Item.Group>
        <Item.Content>
          {diaryPhotos!.map((photo) => (
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

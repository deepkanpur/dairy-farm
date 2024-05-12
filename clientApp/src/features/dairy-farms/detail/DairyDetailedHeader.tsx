import { observer } from "mobx-react-lite";
import { Dairy } from "../../../app/models/dairy";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import ImageCapture from "../../../app/common/imageCapture/ImageCapture";
interface Props {
  dairy: Dairy;
  uploadPhoto: (file: Blob) => void;
  loading: boolean;
}
export default observer(function DairyDetailedHeader({ dairy, uploadPhoto, loading }: Props) {
  const {modalStore} = useStore();
  return (
    <Segment>
      <Item.Group>
        <Item>
          <Item.Content>
            <Item.Header>{dairy.businessName}</Item.Header>
            <Item.Description>{dairy.contactName}</Item.Description>
            <Item.Description>
              {dairy.address} - {dairy.area}
            </Item.Description>
            {dairy.landmark && <Item.Meta>{dairy.landmark}</Item.Meta>}
            <Item.Description>
              {dairy.city} - {dairy.pincode}
              {dairy.photos && dairy.photos.length <= 4 && (
                <Button
                  onClick={() => modalStore.openModal(<ImageCapture uploadPhoto={uploadPhoto}/>)} 
                  icon="photo"
                  color="blue"
                  floated="right"
                  content="Add"
                  loading={loading}
                />
              )}
            </Item.Description>
            <Item.Meta>
              <Icon name="phone" /> {dairy.contactNumber}
              {dairy.locationUrl && (
                <>
                  <Icon
                    name="map marker"
                    color="blue"
                    style={{ marginLeft: 5 }}
                  />
                  <Link to={dairy.locationUrl} target="_blank">
                    {dairy.area}
                  </Link>
                </>
              )}
            </Item.Meta>
            <Item.Extra>
              <Icon name="motorcycle" /> {dairy.buffaloCount} Buffaloes
              <Icon name="battery half" style={{ marginLeft: 5 }} />{" "}
              {dairy.cowCount} Cows
              <Icon name="users" style={{ marginLeft: 5 }} />{" "}
              {dairy.workerCount} Workers
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
  );
});

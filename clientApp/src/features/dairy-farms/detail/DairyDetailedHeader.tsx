import { observer } from "mobx-react-lite";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import ImageCapture from "./photos/ImageCapture";
import LoadingComponent from "../../../app/layout/loadingComponent";
import DairyStaff from "../DairyStaff";

export default observer(function DairyDetailedHeader() {
  const {modalStore, dairyStore, userStore:{user, isLoggedIn}} = useStore();
  const {loading, selectedDairy: dairy} = dairyStore;
  if (!dairy) return <LoadingComponent content="Loading Dairy Header..." />;
  
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
              {isLoggedIn  && dairy.photos && dairy.photos.length <= 4 && (
                <Button
                  onClick={() => modalStore.openModal(<ImageCapture />)} 
                  icon="photo"
                  color="blue"
                  floated="right"
                  content="Add"
                  loading={loading}
                />
              )}
            </Item.Description>
            <Item.Meta>
              {isLoggedIn && <><Icon name="phone" /> {dairy.contactNumber}</>}
              {!isLoggedIn && <><Icon name="phone" /> {dairy.maskedContactNumber}</>}
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
              <DairyStaff dairy={dairy} />
            </Item.Extra>
            {isLoggedIn && (user?.isDataEntryUser || user?.isAdmin || user?.isSalesUser) &&  
              <Item.Extra>
                 <p>{dairy.fodderManagement} - <i>{dairy.addedByUserName}</i></p>
              </Item.Extra>
            }
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
  );
});

import { observer } from "mobx-react-lite";
import { Dairy } from "../../../app/models/dairy";
import { Icon, Item, Segment} from "semantic-ui-react";
import { Link } from "react-router-dom";
import DairyStaff from "../DairyStaff";
import { useStore } from "../../../app/stores/store";
import DairySurveyQuestionnaire from "../DairySurveyQuestionnaire";

interface Props {
  dairy: Dairy;
}

export default observer(function DairyListItem({ dairy }: Props) {
    const { userStore: {user, isLoggedIn} } = useStore();
  return (
    <Segment.Group>
        <Segment>
            <Item.Group>                
                <Item>
                    <Item.Image size='medium' rounded centered
                        src={dairy.image || '/assets/user.png'}
                        as={Link} to={`/dairies/${dairy.id}`}
                        />
                    <Item.Content>
                        <Item.Header>
                            <Link to={`/dairies/${dairy.id}`}>{dairy.businessName}</Link>
                        </Item.Header>
                        <Item.Description>{dairy.contactName}</Item.Description>
                        <Item.Meta>
                            {isLoggedIn && <><Icon name="phone" /> {dairy.contactNumber}</>}
                            {!isLoggedIn && <><Icon name="phone" /> {dairy.maskedContactNumber}</>}
                            {dairy.locationUrl &&
                                <>
                                    <Icon name='map marker' color='blue' style={{marginLeft:5}} />
                                    <Link to={dairy.locationUrl} target="_blank">{dairy.area}</Link>                            
                                </>
                            }
                        </Item.Meta>
                        <Item.Extra>
                            <DairyStaff dairy={dairy} />
                        </Item.Extra>
                        {isLoggedIn && (user?.isDataEntryUser || user?.isAdmin || user?.isSalesUser) && 
                        <Item.Content>
                            <DairySurveyQuestionnaire dairy={dairy} />
                        </Item.Content>
                        }
                    </Item.Content>
                </Item>
            </Item.Group>
        </Segment>
    </Segment.Group>
  );
});

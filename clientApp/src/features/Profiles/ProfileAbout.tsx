import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { Button, Grid, Header, TabPane } from "semantic-ui-react";
import { useState } from "react";
import Edit from "./form/Edit";

export default observer(function ProfileAbout() {
  const { profileStore: {isCurrentUser, profile} } = useStore();
  const [editMode, setEditMode] = useState(false);
  
  return( 
    <TabPane>
        <Grid>
            <Grid.Column width='16'>
                <Header floated='left' icon='user' content={`About ${profile?.displayName}`} />
                {isCurrentUser && 
                    <Button floated='right' basic content={editMode ? 'Cancel' : 'Edit'} onClick={() => setEditMode(!editMode)} />
                }
            </Grid.Column>
            <Grid.Column width='16'>
                {editMode ? (
                    <Edit setEditMode={setEditMode} />
                ) : (
                    <span style={{whiteSpace:'pre-wrap'}}>{profile?.bio}</span>
                )}
            </Grid.Column>
        </Grid>
    </TabPane>
)
})

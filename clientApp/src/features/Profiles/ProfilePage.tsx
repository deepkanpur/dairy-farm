import { Grid } from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/loadingComponent";

export default observer(function ProfilePage() {
  const {userName} = useParams<{userName: string}>(); 
  const {profileStore} = useStore();
  const {loadingProfile, loadProfile, profile} = profileStore;

  useEffect(() => {
    if(userName) loadProfile(userName);
  }, [userName, loadProfile]);

  if(loadingProfile) return <LoadingComponent content='Loading profile...' />

  return (
    <Grid>
      <Grid.Column width={16}>
        {profile && 
        <>
          <ProfileHeader profile={profile}/>
          <ProfileContent profile={profile}/>
        </>
        }
      </Grid.Column>
    </Grid>
  );
});
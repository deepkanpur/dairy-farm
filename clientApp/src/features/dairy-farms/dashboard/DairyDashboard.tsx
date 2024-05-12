import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import DairyList from "./DairyList";
import LoadingComponent from "../../../app/layout/loadingComponent";

export default observer(function DairyDashboard() {
    const {dairyStore} = useStore();
    const {loadDairies, dairyRegistry} = dairyStore;

    useEffect(() => {    
        if(dairyRegistry.size <= 1 ) loadDairies();
    }, [loadDairies, dairyRegistry.size]);

    if(dairyStore.loadingInitial) return <LoadingComponent content="Loading Dairies..."/>

    return (
        <Grid>
        <Grid.Column width="16">
          <DairyList />
        </Grid.Column>
      </Grid>
    );
});
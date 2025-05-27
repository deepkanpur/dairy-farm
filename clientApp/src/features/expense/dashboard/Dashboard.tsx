import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Grid, Icon } from "semantic-ui-react";

export default observer(function Dashboard() {
  
  return (
    <Grid>
      <Grid.Column width="8" textAlign='left'>
        <Button >
          <Icon name='play' />
        </Button>        
      </Grid.Column>
      <Grid.Column width={8} textAlign="right">
        <Button width="8" text>
          <Link to={`add`}><Icon name='plus' /></Link>
        </Button>
      </Grid.Column>
      <Grid.Column width="16">
        Hello welcome to Expense Dashboard        
        <Link to={`/expense/${18}`}>{1800}</Link>
      </Grid.Column>
      <Grid.Column width="16" textAlign='center'>
        Loader
      </Grid.Column>
    </Grid>
  );
});

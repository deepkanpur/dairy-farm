import { observer } from 'mobx-react-lite';
import {Segment, Grid, Icon} from 'semantic-ui-react'
import {Activity} from "../../../app/models/activity";
import { format } from 'date-fns';

interface Props {
    activity: Activity
}

export default observer(function ActivityDetailedInfo({activity}: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={16}>                        
                        <p><Icon size='large' color='teal' name='info'/> {activity.description}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>                
                    <Grid.Column width={16}>
                    <Icon name='calendar' size='large' color='teal'/>
                    <span>{format(activity.date!, 'dd MMM yyyy')}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={16}>
                        <Icon name='marker' size='large' color='teal'/>
                        <span>{activity.venue}, {activity.city}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})


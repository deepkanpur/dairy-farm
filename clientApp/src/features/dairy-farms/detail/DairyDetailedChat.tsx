import { observer } from "mobx-react-lite";
import { Segment, Header, Comment, Button } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import MyTextArea from "../../../app/common/form/MyTextArea";
import * as Yup from 'yup';
import { formatDistanceToNow } from "date-fns";

interface Props {
  dairyFarmId: string;
}
export default observer(function DairyDetailedChat({ dairyFarmId }: Props) {
  const { commentStore } = useStore();

  useEffect(() => {
    if (dairyFarmId) commentStore.createHubConnection(dairyFarmId);
    return () => {
      commentStore.clearComments();
    };
  }, [commentStore, dairyFarmId]);

  return (
    <>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>Feedback about this Dairy</Header>
      </Segment>
      <Segment attached clearing>
        <Comment.Group>
        <Formik 
            onSubmit={(values, {resetForm}) => commentStore.addComments(values).then(() => resetForm())}
            initialValues={{body: ''}}
            validationSchema={Yup.object({
              body: Yup.string().required('Comment is required')
            })}
          >
            {({isSubmitting, isValid, dirty}) => (
              <Form className="ui form">
                <MyTextArea placeholder="Enter your comment..." name='body' rows={2} />
                <Button
                  disabled={isSubmitting || !isValid || !dirty}
                  loading={isSubmitting}
                  content="Add"
                  labelPosition="left"
                  icon="edit"
                  primary
                  type="submit"
                  floated="right"
                />
              </Form>
            )}
          </Formik>

          {commentStore.comments.map((comment) => (
            <Comment key={comment.id}>
              <Comment.Avatar src={comment.image || "/assets/user.png"} />
              <Comment.Content>
                <Comment.Author as={Link} to={`/profiles/${comment.userName}`}>{comment.displayName}</Comment.Author>
                <Comment.Metadata>
                  <div>{formatDistanceToNow(comment.createdAt.toISOString())} ago</div>
                </Comment.Metadata>
                <Comment.Text style={{whiteSpace: 'pre-wrap'}}>{comment.body}</Comment.Text>                
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
      </Segment>
    </>
  );
});

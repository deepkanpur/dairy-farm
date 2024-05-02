import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import { Button } from "semantic-ui-react";

interface Props {
    setEditMode: (editMode: boolean) => void;
}

export default observer(function Edit({setEditMode}: Props) {

const {profileStore: {profile, updateProfile}} = useStore();
return(
    <Formik 
        initialValues={{displayName: profile?.displayName, bio: profile?.bio}}
        onSubmit={values => {
            updateProfile(values).then(() => setEditMode(false));
        }}
        validationSchema={Yup.object({
            displayName: Yup.string().required()
        })}        
        >
        {({isSubmitting, isValid, dirty}) => (
            <Form className='ui form'>
                <MyTextInput name='displayName' placeholder='Display Name'/>
                <MyTextArea placeholder='Add your bio' name='bio' rows={3}/>
                <Button 
                    loading={isSubmitting} floated='right' positive 
                    disabled={isSubmitting || !isValid || !dirty}
                    type='submit' content='Update profile'/>
            </Form>
        )}
    </Formik>
)

})
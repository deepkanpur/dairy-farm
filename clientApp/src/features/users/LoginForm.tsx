import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button, Header, Label } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function LoginForm() {
    const {userStore} = useStore();
    let email = '';
    let pwd = '';
    if (import.meta.env.DEV) {
        email = 'deep@test.com';
        pwd = 'Span@1234';
    }
    
    return (
        <Formik
            initialValues={{ email: email, password: pwd, error: null }}
            onSubmit={(values, {setErrors}) => {userStore.login(values).catch(() => 
                setErrors({error: 'Invalid email or password'}));}}
        >
            {({ handleSubmit, isSubmitting, errors }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Login to Dairy' color='teal' textAlign='center' />
                    <MyTextInput placeholder='Email' name='email' />
                    <MyTextInput placeholder='Password' name='password' type='password' />    
                    <ErrorMessage 
                        name='error' render={() => 
                        <Label style={{marginBottom: 10}} basic color='red' content={errors.error}/>}
                    />       
                    <Button loading={isSubmitting} positive type="submit" content='Login' fluid />
                </Form>
            )}
        </Formik>
)})
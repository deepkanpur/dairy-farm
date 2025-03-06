import { observer } from "mobx-react-lite";
import { Button, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DairyFormValues } from "../../../app/models/dairy";
import { useEffect, useState } from "react";
import LoadingComponent from "../../../app/layout/loadingComponent";
import {v4 as uuid} from 'uuid';
import * as Yup from 'yup';
import { Form, Formik } from "formik";
import MyTextInput from "../../../app/common/form/MyTextInput";
import GeoLocation from "../../../app/common/GeoLocation";
import MyTextArea from "../../../app/common/form/MyTextArea";

export default observer(function DairyForm() {
  const {dairyStore} = useStore();
  const {createDairy, updateDairy, loadDairy, loadingInitial} = dairyStore;
  const geo = new GeoLocation().getCoords();
  
  const {id} = useParams();
  const navigate = useNavigate();
  
  const [dairy, setDairy] = useState<DairyFormValues>(new DairyFormValues());

  const validationSchema = Yup.object({
    businessName: Yup.string().required('Business Name is required').max(100),
    contactName: Yup.string().required('Contact Name is required').max(100),
    contactNumber: Yup.number().typeError('Enter valid phone number').required('Contact Number is required').max(9999999999, 'Enter valid phone number').min(1111111111, 'Enter valid phone number'),
    pincode: Yup.number().typeError('Pincode must be a number').required('Pincode is required').min(111111, 'enter valid pincode').max(999999, 'enter valid pincode'),
    address: Yup.string().required().max(200),
    area: Yup.string().required().max(100),    
    city: Yup.string().required().max(100),    
    buffaloCount: Yup.number().min(1, 'Can not be less than 1').required('Number of Buffaloes'),
    cowCount: Yup.number().min(0, 'Can not be less than 0').required('Number of Cows'),
    milkProduction: Yup.number().min(1, 'Can not be less than 1').required('Daily Milk Production'),
    fodderManagement: Yup.string().max(500, 'Max 500 characters'),
    surveyNutrition: Yup.string().max(500, 'Max 100 characters'),
    surveyBetterMilkProduction: Yup.string().max(500, 'Max 100 characters'),
    surveyBetterFodderManagement: Yup.string().max(500, 'Max 100 characters'),
    surveyFodderRequirement: Yup.string().max(500, 'Max 100 characters')
  });

  useEffect(()=>{
    if(id) loadDairy(id).then(dairy => setDairy(new DairyFormValues(dairy)))
  },[id, loadDairy])

  function handleFormSubmit(dairy: DairyFormValues){
    dairy.latitude = geo.latitude;
    dairy.longitude = geo.longitude;

    if(!dairy.id) {
      dairy.id = uuid();
      createDairy(dairy).then(() => navigate(`/dairies/${dairy.id}`))
    }else{
      updateDairy(dairy).then(() => navigate(`/dairies/${dairy.id}`))
    }
  }

  if(loadingInitial) return <LoadingComponent content="Loading Dairy Form..."/>
  
  return (
  <Segment clearing>
    <Header content='Dairy Details' sub color='teal'/>
    <Formik enableReinitialize validationSchema={validationSchema}
      initialValues={dairy}
      onSubmit={values => handleFormSubmit(values)}>
      {({handleSubmit, isValid, isSubmitting, dirty}) => (
        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
          <MyTextInput placeholder="Business Name" name={'businessName'} />
          <MyTextInput placeholder="Contact Name" name={'contactName'} />
          <MyTextInput placeholder="Contact Number" name={'contactNumber'} />
          <MyTextInput placeholder="Address" name={'address'} />
          <MyTextInput placeholder="Landmark" name={'landmark'} />
          <MyTextInput placeholder="Area" name={'area'} />
          <MyTextInput placeholder="City" name={'city'} />
          <MyTextInput placeholder="Pincode" name={'pincode'} />
          <MyTextInput placeholder="Buffalo Count" name={'buffaloCount'} />
          <MyTextInput placeholder="Cow Count" name={'cowCount'} />
          <MyTextInput placeholder="Daily Milk Production" name={'milkProduction'} />
          <MyTextArea placeholder="Fodder Management" name={'fodderManagement'} rows={3} />
          <MyTextArea placeholder="क्या आपको ऐसा लगता है कि हरे चारे से भूसे की तुलना में अधिक पोषण मिलता है" name={'surveyNutrition'} rows={2}/>
          <MyTextArea placeholder="क्या आपको ऐसा लगता है कि हरे चारे से पशु के दूध में वृद्धि होती है" name={'surveyBetterMilkProduction'} rows={2}/>
          <MyTextArea placeholder="क्या आपको ऐसा लगता है कि हरे चारे के प्रयोग से चूनी चोकर आदि की खपत कम होती है" name={'surveyBetterFodderManagement'} rows={2}/>
          <MyTextArea placeholder="अगर हम आपको प्रतिदिन हरा चारा उपलब्ध कराये तो क्या आप हरा चारा ख़रीदेंगे? यदि हाँ तोप् रतिदिन लगभग कितने किलो" name={'surveyFodderRequirement'} rows={2}/>
          <Button
            disabled={isSubmitting || !dirty || !isValid}
            loading={isSubmitting}
            floated='right'
            positive
            type='submit'
            content='Submit'
          />
          <Button as={Link} to='/dairies' floated='right' type='button' content='Cancel'/>
        </Form>
      )}
    </Formik>
  </Segment>);
});

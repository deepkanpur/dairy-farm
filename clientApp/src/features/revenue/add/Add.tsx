import { observer } from "mobx-react-lite";
import { Button, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RevenueAddValues } from "../../../app/models/revenue";
import { useEffect, useState } from "react";
import LoadingComponent from "../../../app/layout/loadingComponent";
import {v4 as uuid} from 'uuid';
import * as Yup from 'yup';
import { Form, Formik } from "formik";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MyDateInput from "../../../app/common/form/MyDateInput";

export default observer(function Add() {
  const {revenueStore, } = useStore();
  const {addRevenue, updateRevenue, loadRevenue, loadingInitial} = revenueStore;
  
  const {id} = useParams();
  const navigate = useNavigate();
  
  const [revenue, setRevenue] = useState<RevenueAddValues>(new RevenueAddValues());

  const validationSchema = Yup.object({
    saleDate: Yup.date().default(()=> new Date()).required('Sale Date is required'),
    soldWeight: Yup.number().typeError('Enter valid Sale Weight in KG').required('Sale Volume is required').max(18000, 'Enter valid Sale Weight in KG').min(100, 'Enter valid Sale Weight in KG'),
    //salePrice: Yup.number().default(5).typeError('Price be a number').required('Per KG Sale Price is required').min(4, 'enter valid sale price').max(20, 'enter valid sale price'),
    //sampleWeight: Yup.number().default(0).typeError('Enter valid sample weight in KG').max(200, 'Enter valid sample weight in KG').min(0, 'Enter valid sample weight in KG'),
    donateWeight: Yup.number().default(0).typeError('Enter valid donate weight in KG').max(200, 'Enter valid donate weight in KG').min(0, 'Enter valid donate weight in KG'),
    //wastage: Yup.number().default(0).typeError('Enter valid wastage weight in KG').max(300, 'Enter valid wastage weight in KG').min(0, 'Enter valid wastage weight in KG'), 
    remark: Yup.string().max(500, 'Max 500 characters'),
    //cultivatedWeight: Yup.number().required('Cultivated Weight is required').max(18000).min(200, 'Enter valid Sale Weight in KG'),
    cultivatedWeight: Yup.number()
      .required('Cultivated Weight is required').max(18000).min(200, 'Enter valid Cultivated Weight in KG')
      .test({
        name: 'validation',
        exclusive: false,
        message: 'All weight must be checked',
        test: function(value) {
          const weightCheck = Number(this.parent.soldWeight) + this.parent.sampleWeight + this.parent.donateWeight;// + this.parent.wastage;
          return value === weightCheck;
        }
      })
  });

  useEffect(()=>{
    if(id) loadRevenue(id).then(revenue => setRevenue(new RevenueAddValues(revenue)))
  },[id, loadRevenue])

  function handleFormSubmit(revenue: RevenueAddValues){    
    if(!revenue.id) {
      revenue.id = uuid();
      addRevenue(revenue).then(() => navigate(`/revenues`))
    }else{
      updateRevenue(revenue).then(() => navigate(`/revenues/${revenue.id}`))
    }
  }

  if(loadingInitial) return <LoadingComponent content="Loading Revenue Register..."/>
  
  return (
  <Segment clearing>
    <Header content='Revenue Register' sub color='teal'/>
    <Formik enableReinitialize validationSchema={validationSchema}
      initialValues={revenue}
      onSubmit={values => handleFormSubmit(values)}>
      {({handleSubmit, isValid, isSubmitting, dirty}) => (
        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
          <MyDateInput name={'saleDate'} label="Sale Date"/>
          <MyTextInput placeholder="Sold Weight KG" name={'soldWeight'} label="Sale Weight"/>
          {/* <MyTextInput placeholder="Sample Distribution Weight KG" name={'sampleWeight'} label="Sample Weight"/> */}
          <MyTextInput placeholder="Donated Weight KG" name={'donateWeight'} label="Donation Weight"/>
          {/* <MyTextInput placeholder="Wastage Weight KG" name={'wastage'} label="Wastage"/> */}
          <MyTextInput placeholder="Cultivated Weight KG" name={'cultivatedWeight'} label="Cultivation Weight"/>
          {/* {isLoggedIn && (user?.isAdmin || user?.isSalesUser) &&
            <MyTextInput placeholder="Sale Price per KG" name={'salePrice'} label="Price" />
          } */}
          <MyTextArea placeholder="Remark" name={'remark'} rows={3} label="Remark"/>
          <Button
            disabled={isSubmitting || !dirty || !isValid}
            loading={isSubmitting}
            floated='right'
            positive
            type='submit'
            content='Submit'
          />
          <Button as={Link} to='/revenues' floated='right' type='button' content='Cancel'/>
        </Form>
      )}
    </Formik>
  </Segment>);
});

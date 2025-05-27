import { observer } from "mobx-react-lite";
import { Button, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingComponent from "../../../app/layout/loadingComponent";
import {v4 as uuid} from 'uuid';
import * as Yup from 'yup';
import { Form, Formik } from "formik";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MyDateInput from "../../../app/common/form/MyDateInput";
import MySelectDropDown from "../../../app/common/form/MyDropDown";
import { SaleRegisterAddValues } from "../../../app/models/saleRegister";

export default observer(function SaleRegister() {
  const {saleRegisterStore, userStore: {user, isLoggedIn}, dairyStore:{dairiesByName} } = useStore();
  const {addSaleRegister, updateSaleRegister, loadSaleRegister, loadingInitial} = saleRegisterStore;
  
  const {id} = useParams();
  const navigate = useNavigate();
  
  const [saleRegister, setSaleRegister] = useState<SaleRegisterAddValues>(new SaleRegisterAddValues());

  const customers = dairiesByName.map(({id, businessName}) => ({key:id, value: id,  text: businessName}))

  const validationSchema = Yup.object({
    saleDate: Yup.date().default(()=> new Date()).required('Sale Date is required'),
    soldWeight: Yup.number().typeError('Enter valid Sale Weight in KG').required('Sale Volume is required').max(18000, 'Enter valid Sale Weight in KG').min(10, 'Enter valid Sale Weight in KG'),
    salePrice: Yup.number().default(5).typeError('Price be a number').required('Per KG Sale Price is required').min(4, 'enter valid sale price').max(20, 'enter valid sale price'),
    remark: Yup.string().max(500, 'Max 500 characters'),
    dairyFarmId: Yup.string().required('Customer is required')
  });

  useEffect(()=>{
    if(id) loadSaleRegister(id).then(saleRegister => setSaleRegister(new SaleRegisterAddValues(saleRegister)))
  },[id, loadSaleRegister])

  function handleFormSubmit(saleRegister: SaleRegisterAddValues){    
    if(!saleRegister.id) {
      saleRegister.id = uuid();
      addSaleRegister(saleRegister).then(() => navigate(`/sales`))
    }else{
      updateSaleRegister(saleRegister).then(() => navigate(`/sales/${saleRegister.id}`))
    }
  }

  if(loadingInitial) return <LoadingComponent content="Loading Sale Register..."/>
  
  return (
  <Segment clearing>
    <Header content='Sale Register' sub color='teal'/>
    <Formik enableReinitialize validationSchema={validationSchema}
      initialValues={saleRegister}
      onSubmit={values => handleFormSubmit(values)}>
      {({handleSubmit, isValid, isSubmitting, dirty}) => (
        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
          <MyDateInput name={'saleDate'} label="Sale Date"/>
          <MySelectDropDown placeholder="Select Customer" name='dairyFarmId' label='Customer' options={customers}/>
          <MyTextInput placeholder="Sold Weight KG" name={'soldWeight'} label="Sale Weight"/>
          {isLoggedIn && (user?.isAdmin || user?.isSalesUser) &&
            <MyTextInput placeholder="Sale Price per KG" name={'salePrice'} label="Price" />
          }
          <MyTextArea placeholder="Remark" name={'remark'} rows={3} label="Remark"/>
          <Button
            disabled={isSubmitting || !dirty || !isValid}
            loading={isSubmitting}
            floated='right'
            positive
            type='submit'
            content='Submit'
          />
          <Button as={Link} to='/sales' floated='right' type='button' content='Cancel'/>
        </Form>
      )}
    </Formik>
  </Segment>);
});

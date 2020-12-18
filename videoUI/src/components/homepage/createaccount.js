import React, { useState } from 'react';
import {Form, Row, Col, InputGroup, FormControl, Button,Container} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../globalSass/variables.module.scss';
import styles from './styles/createaccount.module.scss';

 const CreateAccountForm  = () => {
   
const [changeForm,initChange] = useState(true);

    let toggleForm = () => {
        initChange(!changeForm);
    }


const WelcomeForm = () => {
    return (
    <>
    <h1 className = {styles.form__heading}>Weclome to videostream</h1>
    <p className = {styles.form__paragraph}>Here you can have one on one video chats with any user.</p>
    <Button type = "submit" variant = "light" onClick = {toggleForm}>Login</Button>
    </>
    )
}

const LoginForm = () => {
    return (
        <>
<h1>Create Account</h1>

<Form>
     <Form.Row className = {`${styles.form__row}`}>


<InputGroup className = {`${styles.input__group}`}>
 
 <InputGroup.Prepend>
     <InputGroup.Text>
         <FontAwesomeIcon icon = "user"/>   
     </InputGroup.Text>
 </InputGroup.Prepend>
 <FormControl id="inlineFormInputGroup" placeholder="Username" required />
</InputGroup>

 </Form.Row>
     
     <Form.Row className = {`${styles.form__row}`}>
     <InputGroup className = {`${styles.input__group}`}>
     <InputGroup.Prepend>
     <InputGroup.Text>
         <FontAwesomeIcon icon = "key"/>   
     </InputGroup.Text>
     </InputGroup.Prepend>
     <FormControl id="inlineFormInputGroup" placeholder="Password" required />
     </InputGroup>
     </Form.Row>
     <Form.Row className = {`${styles.form__row}`}>
     <InputGroup>
     <InputGroup.Prepend>
     <InputGroup.Text>
         <FontAwesomeIcon icon = "key"/>   
     </InputGroup.Text>
     </InputGroup.Prepend>
     <FormControl id="inlineFormInputGroup" placeholder="Confirm password" required />
     </InputGroup>
     </Form.Row>

     <Button type="submit" variant = "dark">Submit form</Button>

 </Form>
             </>
    )
}    
   
   
    return(
    <>
<Container className = {`${styles.testing}`}>
<Row>
    
    <Col className = {`${styles.form__column} ${changeForm && styles.toggled}`}>
        <div className = {`${styles.form__createaccount} ${changeForm && styles.toggled}`}> 
    <LoginForm/>
    </div>
    <div className = {`${styles.form__welcome__login} ${changeForm && styles.toggled}`}>
        <WelcomeForm/>
    </div>
    </Col>


    <Col className = {`${styles.form__column__welcome}`} lg = {6} center = "lg">

        <div className = {`${styles.form__login} ${!changeForm && styles.toggled}`}> 
        <LoginForm className = {`${styles.form__login} ${styles.toggled}`}/>
    </div>
    <div className = {`${styles.form__welcome} ${!changeForm  && styles.toggled}`}>
        <WelcomeForm/>
    </div>
    </Col>
    </Row> 
    </Container>
    </>   
   ) 
}
export default CreateAccountForm;

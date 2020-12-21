import React, { useState } from 'react';
import {Form, Row, Col, InputGroup, FormControl, Button,Container} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import '../globalSass/variables.module.scss';
import styles from './styles/createaccount.module.scss';

 const CreateAccountForm  = () => {
   
const [changeForm,initChange] = useState(true);
const [error, toggleError] = useState(false);
    let toggleForm = (e) => {
        e.preventDefault();
        initChange(!changeForm);
    }

let handleCreateAccount = async (e) => {
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value;
    let confirmPassword = e.target.confirmPassword.value;
    let config = {
        method: 'post',
        url : 'http://localhost:5000/',
        data: {
            username,
            password,
            confirmPassword
        }
    }
    if(password !== confirmPassword){
        toggleError(true);
        setTimeout(3000, () => {
            toggleError(false);
        });
    }   

    console.log(';creating account')
    console.log(username);

}    
let handleLogin = (e) => {
    console.log(';logging in')
}

const WelcomeForm = () => {
    return (
    <>
    <h1 className = {`${styles.form__heading} ${!changeForm && styles.toggled}`}>Weclome to videostream</h1>
    <p className = {`${styles.form__paragraph} ${!changeForm && styles.toggled}`}>Here you can have one on one video chats with any user.</p>
    <Button type = "submit" variant = {`${!changeForm ? "light" : "light"}`} onClick = {toggleForm}>{`${!changeForm ? "Create Account" : "Login"}`}</Button>
    </>
    )
}

const LoginForm = () => {
    return (
        <>
<h1>{changeForm ? "Create Account" : "Login"}</h1>

<Form onSubmit = {changeForm ? handleCreateAccount : handleLogin}>
     <Form.Row className = {`${styles.form__row}`}>


<InputGroup className = {`${styles.input__group}`}>
 
 <InputGroup.Prepend>
     <InputGroup.Text>
         <FontAwesomeIcon icon = "user"/>   
     </InputGroup.Text>
 </InputGroup.Prepend>
 <FormControl id="username" placeholder="Username" required />
</InputGroup>

 </Form.Row>
     
     <Form.Row className = {`${styles.form__row}`}>
     <InputGroup className = {`${styles.input__group}`}>
     <InputGroup.Prepend>
     <InputGroup.Text>
         <FontAwesomeIcon icon = "key"/>   
     </InputGroup.Text>
     </InputGroup.Prepend>
     <FormControl id="password" placeholder="Password" required />
     </InputGroup>
     </Form.Row>
     <Form.Row className = {`${styles.form__row}`}>
     <InputGroup className = {`${styles.form__input} ${!changeForm && styles.toggled}`}>
     <InputGroup.Prepend>
     <InputGroup.Text>
         <FontAwesomeIcon icon = "key"/>   
     </InputGroup.Text>
     </InputGroup.Prepend>

     <FormControl id="confirmPassword" placeholder="Confirm password" required />
        <br/>
     </InputGroup>
     <p class = {`${styles.error} ${styles.error && styles.toggled}`}>{error && "error"}</p>
     </Form.Row>

     <Button type="submit" variant = "dark">Submit form</Button>

 </Form>
             </>
    )
}    
   
   
    return(
    <>
<Container className = {`${styles.testing}`}>
<Row className = {`${styles.row} ${!changeForm && styles.toggled}`}>
    
    <Col className = {`${styles.form__column} ${!changeForm && styles.toggled}`}>
        <div className = {`${styles.form__createaccount} ${changeForm && styles.toggled}`}> 
    <LoginForm/>
    </div>
    <div className = {`${styles.form__welcome__login} ${changeForm && styles.toggled}`}>
        <WelcomeForm/>
    </div>
    </Col>


    <Col className = {`${styles.form__column__welcome} ${!changeForm && styles.toggled}`} lg = {6} center = "lg">

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

import React, { useState } from 'react';
import {Form, Row, Col, InputGroup, FormControl, Button,Container} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import axios from 'axios';
//import '../../globalSass/app.scss';
import styles from './createaccount.module.scss';

 const CreateAccountForm  = (props) => {
   
const [changeForm,initChange] = useState(true);
const [formError, toggleError] = useState(false);

    let toggleForm = (e) => {
        e.preventDefault();
        initChange(!changeForm);
    }

let handleError = (text) => {
    toggleError(text);
    setTimeout(() => {
        toggleError(false);
    }, 5000);
}

let handleCreateAccount = async (e) => {
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value;
    let confirmPassword = e.target.confirmPassword.value;
    let config = {
        method: 'post',
        url : 'http://localhost:5000/api/createaccount',
        data: {
            username,
            password,
            confirmPassword
        }
    }
    if(password !== confirmPassword){
        handleError('passwords dont match');

    } else if (false){
        
    } else {
        try{
            let response = await axios(config);
            let {token} = response.data;
            handleError('account successfully created');
            props.handleAuthentication(username, token, true);
        } catch (err) {
            let errorData = err.response.data;
            console.log(errorData);
            let errorMsg = errorData.data.error;
            handleError(errorMsg);
  
        }
    }
}    
let handleLogin = async (e) => {
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value;
    let config = {
        method: 'post',
        url : 'http://localhost:5000/api/login',
        data: {
            username,
            password,
        }
    }
    try {
        let response = await axios(config); 
        let {token} = response.data;
        console.log([username, token]);
        console.log(token);
        props.handleAuthentication(username, token, true);

    } catch (err) {
        console.log(props);
        handleError('couldnt login. Please re-enter your credentals and then try again');
    }

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
<p class = {`${styles.error} ${styles.error && styles.toggled}`}>{formError && formError}</p>

<Form onSubmit = {changeForm ? handleCreateAccount : handleLogin}>
     <Form.Row className = {`${styles.form__row}`}>


<InputGroup className = {`${styles.input__group}`}>
 
 <InputGroup.Prepend>
     <InputGroup.Text>
         <FontAwesomeIcon icon = "user"/>    
     </InputGroup.Text>
 </InputGroup.Prepend>
 <FormControl id="username" placeholder="Username" pattern = {"[a-zA-Z0-9-_]{5,24}"} title = "please enter a combination of only numbers, letters,dashes and underscores. Username must be a minimum of 7 characters" required ={true} minLength = {5} maxLength = {24} />
</InputGroup>

 </Form.Row>
     
     <Form.Row className = {`${styles.form__row}`}>
     <InputGroup className = {`${styles.input__group}`}>
     <InputGroup.Prepend>
     <InputGroup.Text>
         <FontAwesomeIcon icon = "key"/>   
     </InputGroup.Text>
     </InputGroup.Prepend>
     <Form.Control id="password" placeholder="Password" required = {true} />
     </InputGroup>
     </Form.Row>
     <Form.Row className = {`${styles.form__row}`}>
     <InputGroup className = {`${styles.form__input} ${!changeForm && styles.toggled}`}>
     <InputGroup.Prepend>
     <InputGroup.Text>
         <FontAwesomeIcon icon = "key"/>   
     </InputGroup.Text>
     </InputGroup.Prepend>

     <Form.Control id="confirmPassword" placeholder="Confirm password" minLength = {5} required = {!changeForm ? false : true} />
        <br/>
     </InputGroup>
     </Form.Row>

     <Button type="submit" variant = "dark">Submit form</Button>

 </Form>
             </>
    )
}    
   
   
    return(
    <>
<Container className = {`${styles.testing}`} fluid>
<Row className = {`${styles.row} ${!changeForm && styles.toggled}`}>

<Col lg = {8} className = {styles.column__one}>

    <Col className = {`${styles.form__column} ${!changeForm && styles.toggled}`} lg = {6}>
        
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
    </Col>
<Col lg = {4}>
    <h1>hello alex</h1>
</Col>

    </Row> 
    </Container>
    </>   
   ) 
}
export default CreateAccountForm;

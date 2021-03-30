import React, { useState } from 'react';
import {Form, Row, Col, InputGroup, FormControl, Button,Container} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import axios from 'axios';
//import '../../globalSass/app.scss';
import styles from './createaccount.module.scss';

 const CreateAccountForm  = ({handleAuthentication}) => {
   
const [changeForm,initChange] = useState(false);
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
        url :`${process.env.REACT_APP_SITE_URL}/api/createaccount`,
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
            let {token, user_id} = response.data;
            handleError('account successfully created');
            handleAuthentication(username, token, true, user_id);
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
        url : `${process.env.REACT_APP_SITE_URL}/api/login`,
        data: {
            username,
            password,
        }
    }
    try {
        console.log([username, password, 'hello world']);
        let response = await axios(config); 
        console.log(response);
        let {token,user_id} = response.data;
        console.log([user_id, token, 'moron']);
        handleAuthentication(username, token, true, user_id);

    } catch (err) {
        handleError('couldnt login. Please re-enter your credentals and then try again');
    }
}


const LoginForm = () => {

    let item = <Form.Row className = {`${styles.form__row}`}>
    <InputGroup>
    <InputGroup.Prepend>
    <InputGroup.Text>
        <FontAwesomeIcon icon = "key"/>   
    </InputGroup.Text>
    </InputGroup.Prepend>

    <Form.Control className = {`${styles.form__input}`} id="confirmPassword" placeholder="Confirm password" type = 'password' minLength = {5} required = {!changeForm ? false : true} />
       <br/>
    </InputGroup>
    </Form.Row>
    
    return (
        <>
<p class = {`${styles.error} ${styles.error && styles.toggled}`}>{formError && formError}</p>

<Form onSubmit = {changeForm ? handleLogin : handleCreateAccount } className = {`col align-self-center ${styles.container__formset}`}>
     <Form.Row className = {`${styles.form__row}`}>
<InputGroup className = {`${styles.input__group}`}>
 
 <InputGroup.Prepend>
     <InputGroup.Text>
         <FontAwesomeIcon icon = "user"/>    
     </InputGroup.Text>
 </InputGroup.Prepend>

 <FormControl className = {`${styles.form__input}`} id="username" placeholder="Username" pattern = {"[a-zA-Z0-9-_]{5,24}"} title = "please enter a combination of only numbers, letters,dashes and underscores. Username must be a minimum of 7 characters" required ={true} minLength = {5} maxLength = {24} />
</InputGroup>

 </Form.Row>
     
     <Form.Row className = {`${styles.form__row}`}>
     <InputGroup className = {`${styles.input__group}`}>
     <InputGroup.Prepend>
     <InputGroup.Text>
         <FontAwesomeIcon icon = "key"/>   
     </InputGroup.Text>
     </InputGroup.Prepend>

     <Form.Control className = {`${styles.form__input}`} id="password" placeholder="Password" type = 'password' required = {true} />
     </InputGroup>
     </Form.Row>
        {!changeForm && item}
     <Button type="submit" variant = "dark">{changeForm ? "Login" : 'Create Account'}</Button>
 
 </Form>
             </>
    )
}    
   
   
    return(
    <>
<Col xl = {6} className = {`col align-self-center justify-content-start align-content-center ${styles.container__section}`}>

<Col className = {`Col align-self-center ${styles.container__form}`} xl = {12} lg = {5}>
        <Col>
        <p className = {`${styles.form__title} ${styles.createaccount}`}>{changeForm ? 'Login' : 'Create Account'}</p>
        <p className = {styles.form__paragraph}>{changeForm ? 'Sign up Now' : 'Have An Account?'} <span className = {styles.form__textedit} onClick = {toggleForm}> {changeForm ? 'Register' : 'Login'}  </span></p>

        
        </Col>
        
        <Col className = {`row justify-content-center ${styles.rowaz}`} xl = {12}>

       
        <Col className = {`${styles.container__create} ${changeForm && styles.toggled}`} xl = {12}>
        <LoginForm/>  
            </Col>
       
        <Col className = {`${styles.container__login} ${changeForm && styles.toggled}`} xl = {12}>
        <LoginForm className = {styles.testing} xl = {12}/>  
        </Col>        
        
        </Col>

    </Col>

    </Col>    
        </>   
   ) 
}
export default CreateAccountForm;

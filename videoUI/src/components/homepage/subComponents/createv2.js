import React, { useState } from 'react';
import styles from './createv2.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
const Createv2 = ({handleAuthentication, loginStatus}) => {

let [username, getUsername] = useState('');
let [password, getPassword] = useState('');
let [confirmPassword, getConfirmPassword] = useState('');
let [isMatching, setMatchingError] = useState('');
let onUsernameChange = (e) => {
    let item = e.target.value;
    console.log(item);
    setMatchingError('');
    getUsername(item);
}

let onPasswordChange = (e) => {
    let pwd = e.target.value;
    console.log(pwd);
    setMatchingError('');

    getPassword(pwd);

}

let onConfirmPasswordChange = (e) => {
    let confirmPwd = e.target.value;
    console.log(confirmPwd);
    setMatchingError('');
    getConfirmPassword(confirmPwd);
}

let onLogin = async (e) => {

e.preventDefault();
try {   
    let response = await axios.post(`${process.env.REACT_APP_SITE_URL}/api/login`, {
        username: username,
        password: password
    });
    let {token, user_id} = await response.data;
        console.log(token,user_id, username);
    handleAuthentication(username, token, true, user_id);
    console.log([token, user_id, 'hello']);
} catch (err) {
    let loginErr = err.response.data.error;
    setMatchingError(loginErr);
}

}


let onFormSubmit = async (e) => {
    e.preventDefault();
let userPassword = password;
let userLogin = username;
let confirmUserPassword = confirmPassword;
const regex = /^[a-zA-Z0-9-_]{7,}$/;
const regexTestUsername = regex.test(userLogin);

if(password !== confirmPassword) {
 setMatchingError('passwords dont match');
} else if(userLogin.length >= 15) {
        setMatchingError('Username should not be longer than 15 characters')
    } else if(regexTestUsername !== true){
    setMatchingError('username must at least 7 characters only contain the characters a-z, 0-9, -_');
  } else {
    try{
       let getResponse =  await axios.post(`${process.env.REACT_APP_SITE_URL}/api/createaccount`, {
            username,
            password,
            confirmPassword
        });
       let {data} = getResponse;

        let {token, user_id} = data;
        console.log(data);
        console.log([token,user_id]);
        handleAuthentication(username, token, true, user_id);
    } catch (err) {
        if(err.response.data.data.error !== undefined) {

            let errorMsg = err.response.data.data.error;
            console.log(errorMsg);
            setMatchingError(errorMsg)
        }
    }
} 
};

    return (
        <>
  <form onSubmit = {loginStatus === true ? onLogin : onFormSubmit} className = {`${styles.form} ${loginStatus && styles.toggled}`}> 
        <div className = {`${styles.input__container}`}>
    <span className = {`${styles.input__logo__container}`}><FontAwesomeIcon icon = 'user' className = {`${styles.input__icon}`} /> </span>    
    <input type = 'text' value = {username} onChange = {onUsernameChange} placeholder = "Username" className = {`${styles.form__input}`}/>
    </div>  
    <div className = {`${styles.input__container}`}>
    <span className = {`${styles.input__logo__container}`}><FontAwesomeIcon icon = 'user' className = {`${styles.input__icon}`} /> </span>    
    <input required type = 'password' value = {password} onChange = {onPasswordChange} placeholder = "Password" className = {`${styles.form__input}`}/>
    </div>   
    {loginStatus !== true &&  
        <div className = {`${styles.input__container} ${loginStatus === true ? styles.toggled : ''}`}>
    <span className = {`${styles.input__logo__container}`}><FontAwesomeIcon icon = 'user' className = {`${styles.input__icon}`} /> </span>    
    <input  type = 'password' value = {confirmPassword} onChange = {onConfirmPasswordChange} placeholder = "Confirm Password" className = {`${styles.form__input}`}/>
    </div>}
    <div className = {`${styles.account__error}`}> {isMatching === "" ? '' : `${isMatching}`} </div>    
    <button type = 'submit' className = {`${styles.button}`} >{loginStatus ? 'login' : 'create'}</button>
        </form>        
    </>
    );

}

export default Createv2
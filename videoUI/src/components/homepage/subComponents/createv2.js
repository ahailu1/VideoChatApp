import React, { useState } from 'react';
import styles from './createv2.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Createv2 = () => {

let [username, getUsername] = useState('');
let [password, getPassword] = useState('');
let [confirmPassword, getConfirmPassword] = useState('');

let onUsernameChange = (e) => {
    let item = e.target.value;
    console.log(item);
    getUsername(item)
}
let onPasswordChange = () => {

}
let onConfirmPasswordChange = () => {

}
let onFormSubmit = () => {

};

let LoginForm = ({onInputChange}) => {
    let FormItems = (
    <div className = {`${styles.input__container}`}>
    <span className = {`${styles.input__logo__container}`}><FontAwesomeIcon icon = 'user' className = {`${styles.input__icon}`} /> </span>    
    <input type = 'text' value = {username} onChange = {onInputChange} placeholder = "Username" className = {`${styles.form__input}`}/>
    </div>   
    )
    return (
        FormItems
    )
}

let FinalRender = ({getUsername}) => {

return (
    <>
    <form onSubmit = {onFormSubmit}> 
    <LoginForm onInputChange = {onUsernameChange} />
    <LoginForm onInputChange = {onPasswordChange} />
    <LoginForm onInputChange = {onConfirmPasswordChange}/>
    </form>
    </>
)

}

    return (
        <>
        </>

    );

}

export default Createv2
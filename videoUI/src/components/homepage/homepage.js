import React, { useState } from 'react';
import AppNavbar from './subComponents/navigation';
import CreateAccountForm from './subComponents/createaccount';
let SectionOne = (props) => {
console.log(props.handleAuthentication);
    return (
        <div>
        <AppNavbar/>
        <CreateAccountForm handleAuthentication = {props.handleAuthentication}/>
            hello world
        </div>
    )
}
export default SectionOne
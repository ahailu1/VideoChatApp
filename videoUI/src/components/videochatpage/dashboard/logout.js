import React, {useState} from 'react';
import styles from './logout.module.scss';
import {Col, Dropdown, DropdownButton, ButtonGroup} from 'react-bootstrap';
const Logout = (props) => {

  


return (
    <>
<div>
<DropdownButton className = {styles.dropdown__container} lg = {12} as = {ButtonGroup} title = "Logout">


<Dropdown.Item onClick = {props.handleLogout}>
Logout
</Dropdown.Item>

</DropdownButton>

</div>
</>
)

}

export default Logout
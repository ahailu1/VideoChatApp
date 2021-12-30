import React, {useState} from 'react';
import styles from './logout.module.scss';
import {Col,Button, Dropdown, DropdownButton, ButtonGroup} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
const Logout = (props) => {

  let [text, toggleText] = useState(false);

    let toggleOption = () => {
        toggleText(!text);
    }

return (
    <>
    <Col className = {styles.container__button}>
        { props.arrow ?
        <Button className = {styles.logout__button} onClick = {toggleOption}>
            <FontAwesomeIcon icon = 'sign-out-alt' className = {styles.logout__icon}/>
        'Logout'
        </Button>   
        : 
 <Button className = {`${styles.logout__button} ${!props.arrow && styles.toggled}`} onClick = {toggleOption}>
                 <FontAwesomeIcon icon = 'sign-out-alt' className = {`${styles.logout__icon} ${!props.arrow && styles.toggled}`}/>
 </Button>
}
    </Col>
<Col className = {`${styles.container__logout} ${text && styles.toggled}`}>
    <p className = {styles.logout__text} onClick = {props.handleLogout}>Yes</p>
    <p className = {styles.logout__text} onClick = {toggleOption}>No</p>
</Col>

</>
)

}

export default Logout
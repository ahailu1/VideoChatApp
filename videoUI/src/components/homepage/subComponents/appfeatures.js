import React, { useState } from 'react';
import {Form, Row, Col, Card, InputGroup, FormControl, Button,Container} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './appfeatures.module.scss';
import Cookies from 'js-cookie';
import axios from 'axios';


const AppFeatures = (props) => {

let CardTemplate = () => {

    return (
        <>
        <Col className = {`row align-items-center ${styles.container__card}`} xl = {12}>
        
        <Col className = {`row justify-content-center ${styles.container__icon}`} xl = {2}>
            <FontAwesomeIcon icon = {props.icon} className = {styles.icon}/>
        </Col>

        <Col className = {`col justify-content-center  ${styles.container__paragraph}`} xl = {10}>
        <p className = {styles.title}>{props.title}</p>
        <p className = {styles.paragraph}>{props.paragraph}</p>
        </Col>
        
        </Col>
        </>
    )
}

return (
    <>
    <CardTemplate/>    
    </>
)

}

export default AppFeatures
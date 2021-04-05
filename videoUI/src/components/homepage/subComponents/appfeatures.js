import React, { useState } from 'react';
import {Form, Row, Col, Card, InputGroup, FormControl, Button,Container} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './appfeatures.module.scss';
import Cookies from 'js-cookie';
import axios from 'axios';


const AppFeatures = ({activate = false, ...props}) => {

let CardTemplate = () => {

    return (
        <>
        <Col className = {`row align-items-center ${styles.container__card} ${activate && styles.toggled}`} xl = {12}>
        
        <Col className = {`row justify-content-center ${styles.container__icon}`} xl = {2}>
            <FontAwesomeIcon icon = {props.icon} className = {`${styles.icon} ${activate && styles.toggled}`}/>
        </Col>

        <Col className = {`col justify-content-center  ${styles.container__paragraph} ${activate && styles.toggled}`} xl = {10}>
        <p className = {`${styles.title} ${activate && styles.toggled}`}>{props.title}</p>
        <p className = {`${styles.paragraph} ${activate && styles.toggled}`}>{props.paragraph}</p>
        </Col>
        
        </Col>
        </>
    )
}

return (
    <>
    {CardTemplate()}
    </>
)

}

export default AppFeatures
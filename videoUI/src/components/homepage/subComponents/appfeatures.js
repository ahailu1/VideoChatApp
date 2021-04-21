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
        <Col className = {`d-sm-flex d-xs-flex flex-xl-row flex-lg-row flex-md-row flex-xs-row justify-content-md-center align-items-md-center ${styles.container__card} ${activate && styles.toggled}`} xl = {10} lg = {10} md = {10} sm = {10} xs = {11}>
        
        <Col className = {`d-flex align-items-center justify-content-lg-center ${styles.container__icon}`} xl = {2} lg = {1} md = {1} sm = {1} xs = {1}>
            <FontAwesomeIcon icon = {props.icon} className = {`${styles.icon} ${activate && styles.toggled}`}/>
        </Col>

        <Col className = {`col justify-content-center  ${styles.container__paragraph} ${activate && styles.toggled}`} xl = {10} lg = {10} md = {9} sm = {9} xs = {0}>
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
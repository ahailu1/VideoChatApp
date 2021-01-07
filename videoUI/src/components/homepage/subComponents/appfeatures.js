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
        <div className = {styles.container__card}>
        <div className = {styles.container__icon}>
            <FontAwesomeIcon icon = {props.icon} className = {styles.icon}/>
        </div>
        <div className = {styles.container__title}>
            <p className = {styles.title}>{props.title}</p>
        </div>
        <div className = {styles.container__paragraph}>
        <p className = {styles.paragraph}>{props.paragraph}</p>
        </div>
        </div>
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
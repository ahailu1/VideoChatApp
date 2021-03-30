import React, { useState } from 'react';
import {Form, Row, Col, Card, InputGroup, FormControl, Button,Container} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

import styles from './footer.module.scss';
import Cookies from 'js-cookie';
import axios from 'axios';
import { faLink } from '@fortawesome/free-solid-svg-icons';


const FooterPage = () => {




    return (
        <Col className = {`col ${styles.container__footer}`} xl = {12}>

        <Col className = {`row justify-content-center ${styles.container__row}`} xl = {12}>

        <Col className = {`col align-items-center ${styles.container__link}`} xl = {2}>
        
        <a href = 'https://github.com/ahailu1/VideoChatApp' className = {styles.text__anchor} target = "_blank">
        <FontAwesomeIcon icon = {faGithub} className = {styles.icon}/>
       </a>
        <p className = {styles.text__paragraph}>Source Code</p>
        </Col>

        <Col className = {`col align-items-center ${styles.container__link}`} xl = {2}>
        
        <a href = 'https://linkedin.com/ahailu1/VideoChatApp' target = "_blank">
        <FontAwesomeIcon icon = {faLinkedinIn} className = {styles.icon}/>
       </a>
        <p className = {styles.text__paragraph}>Contact</p>

        </Col>

        </Col>
        

        <Col xl = {{span: 12, offset: 0}} className = {`row justify-content-center ${styles.container__about}`}>
       
        <Col className = {`col align-self-center`} xl = {9}>
        <p className = {styles.text__about}>Hello and Welcome to my application. For the front-end, I used ReactJs, Javascript, HTML, SCSS, and React-Bootstrap.
        <br/>
        For the back-end I used NodeJs w/ Express and PostgreSQL. For my development environment, I used docker, Visual-Studio-Code, and Jest for testing.    
        </p> 
        </Col>
       
    
        </Col>

        </Col>
    )
}

export default FooterPage
import React, { useState } from 'react';
import {Form, Row, Col, Card, InputGroup, FormControl, Button,Container} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

import styles from './footer.module.scss';
import Cookies from 'js-cookie';
import axios from 'axios';


const FooterPage = () => {




    return (
        <Col className = {`col ${styles.container__footer}`} xl = {12}>

        <Col className = {`row justify-content-center ${styles.container__link}`} xl = {12}>

        <Col className = {`col align-items-center justify-content-center ${styles.container__link__item}`} xl = {1}>
        
        <a href = 'https://github.com/ahailu1/VideoChatApp' className = {styles.text__anchor} target = "_blank">
        <FontAwesomeIcon icon = {faGithub} className = {styles.icon}/>
       </a>
        <p className = {styles.text__paragraph}>Source Code</p>
        </Col>

        <Col className = {`col align-items-center ${styles.container__link__item}`} xl = {1}>
        <a href = 'https://linkedin.com/ahailu1/VideoChatApp' target = "_blank">
        <FontAwesomeIcon icon = {faLinkedinIn} className = {styles.icon}/>
       </a>
        <p className = {styles.text__paragraph}>LinkedIn</p>
        </Col>

        <Col className = {`col align-items-center ${styles.container__link__item}`} xl = {1}>

        <a href = 'https://linkedin.com/ahailu1/VideoChatApp' target = "_blank">
        <FontAwesomeIcon icon = 'envelope' className = {styles.icon}/>
       </a>

        <p className = {styles.text__paragraph}>Email</p>
        </Col>
        
        </Col>


        <Col xl = {{span: 12, offset: 0}} className = {`row justify-content-center ${styles.container__about}`}>
    
        </Col>

        <Col className = {styles.container__design} xl = {12}>
       </Col>
        </Col>
    )
}

export default FooterPage
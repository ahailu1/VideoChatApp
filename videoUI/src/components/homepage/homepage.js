import React, { useState } from 'react';
import AppNavbar from './subComponents/navigation';
import CreateAccountForm from './subComponents/createaccount';
import {Col, Row, Container} from 'react-bootstrap';
import styles from './homepage.module.scss';
import LandingPage from './subComponents/landingpage';
import AppFeatures from './subComponents/appfeatures';
import image from '../images/drawing.svg';
let SectionOne = (props) => {

    let appfeatures = {
        title: 'video chat',
        paragraph: 'video chat with complete stranger. Make fun of him for 30 seconds',
        lg : 4,
        icon: 'video'
    }
    let appfeatures2 = {
        title: 'Invite Friends',
        paragraph: 'video will be saved to your profile and uploaded',
        icon: 'user-plus'
    }

    return (
        <Container fluid className = {styles.container__homepage} fluid noGutters = {true}>
        <Row className = {`${styles.container__row}`}>
        <LandingPage/>
        </Row>

        <Row className = {`row justify-content-start ${styles.container__forms}`}>
            <CreateAccountForm />            
        </Row>
    <Row className = {styles.container__features}>
        <AppFeatures {...appfeatures}/>
        <AppFeatures {...appfeatures2}/>
        <AppFeatures {...appfeatures}/>
        <svg className = {styles.svg__divider} height="100%" width="100%" id="bg-svg" viewBox="0 100 1440 400" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150"><path d="M 0,400 C 0,400 0,200 0,200 C 257,226.5 514,253 754,253 C 994,253 1217,226.5 1440,200 C 1440,200 1440,400 1440,400 Z" stroke="#003c96" stroke-width="0" fill="#003c96" class="transition-all duration-300 ease-in-out delay-150"></path></svg>    
        </Row>

        <Row className = {styles.container__signup}>
            <Col>
            <CreateAccountForm handleAuthentication = {props.handleAuthentication}/>
            
            </Col>
        </Row>
        </Container>

    )
}
export default SectionOne
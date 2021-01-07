import React, { useState } from 'react';
import AppNavbar from './subComponents/navigation';
import CreateAccountForm from './subComponents/createaccount';
import {Col, Row, Container} from 'react-bootstrap';
import styles from './homepage.module.scss';
import LandingPage from './subComponents/landingpage';
import AppFeatures from './subComponents/appfeatures';
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
        <Container fluid>
        <Row className = {styles.container__row}>
        <LandingPage/>
        <svg height="100%" width="100%" id="bg-svg" viewBox="0 0 1440 400" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150"><path d="M 0,400 C 0,400 0,200 0,200 C 105.39285714285714,185.75 210.78571428571428,171.5 321,183 C 431.2142857142857,194.5 546.2499999999999,231.75 672,253 C 797.7500000000001,274.25 934.2142857142858,279.5 1064,268 C 1193.7857142857142,256.5 1316.892857142857,228.25 1440,200 C 1440,200 1440,400 1440,400 Z" stroke="none" stroke-width="0" fill="#f5f5f5ff" class="transition-all duration-300 ease-in-out delay-150"></path></svg>
        </Row>

        <Row className = {styles.row__container__heading}>
            <Col lg = {12} className = {styles.row__container__column}>
                <h1 className = {styles.row__header}>Welcome to video chat
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <path fill="#003C96" d="M40.9,-69C54.6,-63,68.3,-55.2,77.1,-43.4C86,-31.6,89.9,-15.8,87.7,-1.2C85.6,13.3,77.3,26.6,68.3,38.1C59.3,49.6,49.6,59.3,38.1,67.9C26.6,76.6,13.3,84.1,-1.3,86.3C-15.8,88.5,-31.6,85.3,-45.6,78.1C-59.5,70.9,-71.7,59.6,-80,45.9C-88.4,32.3,-92.9,16.1,-90.5,1.4C-88.1,-13.3,-78.7,-26.7,-69.1,-38.1C-59.4,-49.6,-49.6,-59.2,-38,-66.4C-26.5,-73.7,-13.2,-78.5,0.2,-78.8C13.6,-79.2,27.2,-75,40.9,-69Z" transform="translate(100 100)" />
</svg>
                </h1>
                <br/>
                <p className = {styles.row__paragraph}>Welcome to video chat</p>

            </Col>
        </Row>
    <Row className = {styles.container__row__features}>
        <AppFeatures {...appfeatures}/>
        <AppFeatures {...appfeatures2}/>
        <AppFeatures {...appfeatures}/>

        <svg className = {styles.svg__divider} height="100%" width="100%" id="bg-svg" viewBox="0 100 1440 400" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150"><path d="M 0,400 C 0,400 0,200 0,200 C 257,226.5 514,253 754,253 C 994,253 1217,226.5 1440,200 C 1440,200 1440,400 1440,400 Z" stroke="#003c96" stroke-width="0" fill="#003c96" class="transition-all duration-300 ease-in-out delay-150"></path></svg>    
        </Row>

        <Row className = {styles.container__signup}>
        <CreateAccountForm handleAuthentication = {props.handleAuthentication}/>

        </Row>
        </Container>

    )
}
export default SectionOne
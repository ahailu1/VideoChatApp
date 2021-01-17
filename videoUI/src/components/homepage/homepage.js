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
                <svg className = {styles.row__svg} viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
  <path fill="#003C96" d="M47.1,-66.6C61.5,-63.9,74.2,-51.8,77.7,-37.5C81.2,-23.1,75.5,-6.5,67.8,5.9C60,18.3,50.1,26.6,42.2,37.6C34.3,48.6,28.3,62.4,17.5,70.7C6.6,78.9,-9.1,81.6,-23.9,78.6C-38.7,75.5,-52.6,66.6,-57.6,53.8C-62.7,41.1,-58.8,24.5,-58.7,9.8C-58.6,-4.8,-62.4,-17.5,-59.9,-29.1C-57.4,-40.8,-48.6,-51.4,-37.6,-55.7C-26.6,-60,-13.3,-58,1.5,-60.3C16.3,-62.6,32.6,-69.3,47.1,-66.6Z" transform="translate(100 100)" />
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
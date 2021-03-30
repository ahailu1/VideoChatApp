import React, { useState } from 'react';
import AppNavbar from './subComponents/navigation';
import CreateAccountForm from './subComponents/createaccount';
import {Col, Row, Container} from 'react-bootstrap';
import styles from './homepage.module.scss';
import FooterPage from './subComponents/footer';
import LandingPage from './subComponents/landingpage';
import formdesign from '../images/noemail.svg';
import AppFeatures from './subComponents/appfeatures';
let SectionOne = ({handleAuthentication}) => {

    let appfeatures = {
        title: 'video chat',
        paragraph: 'video chat with complete stranger. Make fun of him for 30 seconds',
        lg : 4,
        icon: 'video'
    }
    let appfeatures2 = {
        title: 'Invite Friends',
        paragraph: 'Search for users under the search section, follow them and then go to your friends list to make a request.',
        icon: 'user-plus'
    }
    let appfeatures3 = {
        title: 'Invite Friends',
        paragraph: 'Search for users under the search section, follow them and then go to your friends list to make a request.',
        icon: 'comment'
    }

    return (
        <Container fluid className = {styles.container__homepage} fluid>
        <Row className = {`row justify-content-center ${styles.container__row}`}>
        <LandingPage/>
        </Row>

        <Row className = {`row justify-content-start ${styles.container__forms}`}>
            <CreateAccountForm handleAuthentication = {handleAuthentication} />  
            <Col lg = {6} className = {`col`}>
        <h1 className = {styles.page__heading}>How it works</h1>
        <p className = {styles.page__paragraph}>  lorsadldaks kjasdklsadjk lasjdkdsajl kajsdndsakjdsajk hasdkjdjsdakssda hjksadjkdsakjdahsks hjdaskjdasjhdajdsakjdsa
            sdajkadshksdaj hasdkjhasjdk hsakjdhjaksdh kjsahdksajhd kjadhss
        </p>

        <AppFeatures {...appfeatures} />        
            <AppFeatures {...appfeatures2} />          
            <AppFeatures {...appfeatures3} />          


            </Col>
        </Row>
       
      
        <Row className = {styles.container__footer}>
        <FooterPage />

        </Row>

        </Container>

    )
}
export default SectionOne
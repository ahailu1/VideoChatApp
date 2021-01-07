import React, {useState} from 'react';
import {Col, Row, Container, Button} from 'react-bootstrap';
import styles from './landingpage.module.scss';
import Laughter from '../../images/laughing.png';

const LandingPage = (props) => {

let Front = () => {

  return(
      <>
        <Col xl = {6} lg = {6} className = {styles.columnaz} md = {6}>
                <p className = {styles.text__header}>
                hello world
                </p>
            <p className = {styles.text__paragraph}>
                welcome to my video chat site where you can video chat with friends and make phone calls to their browsers.
                Just create a user name and password and you will be on your way.
                </p>
                <Button variant = "light" className = {styles.text__button}>Login</Button>
                <Button variant = "light" className = {styles.text__button}>Create Account</Button>
        </Col>  
        <Col xl = {5} lg = {5} md = {6} className = {styles.container__column} noGutters = {true}>
        <img src = {Laughter} className = {styles.image} />
        </Col> 
        </>
        )  
}    

return (
 <Front/>
)

}

export default LandingPage
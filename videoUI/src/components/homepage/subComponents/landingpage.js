import React, {useState} from 'react';
import {Col, Row, Container, Button} from 'react-bootstrap';
import styles from './landingpage.module.scss';
import landingimage from '../../images/workaz.svg';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import CreateAccountForm from './createaccount';
const LandingPage = (props) => {

let Front = () => {

  return(
      <>
        <Col xl = {5} lg = {4} md = {6} className = {`col align-self-center ${styles.columnaz}`} noGutters = {true}>
                <Col xl = {12} className = {styles.container__text}>
            <p className = {styles.text__header}>
              Welcome to Online Video Chatter
            </p>
            <p className = {styles.text__paragraph}>
                welcome to my video chat site where you can video chat with friends and make phone calls to their browsers.
                Just create a user name and password and you will be on your way.
            </p> 
                </Col>


                <Col xl = {12} className = {`row justify-content-center ${styles.container__signup}`}>
                  <div className = {`${styles.icon__container}`}>
                  <FontAwesomeIcon icon = 'angle-double-down' className = {styles.icon}/>
                  </div>
                  <span>get Started</span>

                </Col>
        
        </Col>  
        <Col xl = {7} lg = {8} md = {6} className = {styles.container__column} noGutters = {true}>
          <img src = {landingimage} alt = '' className = {styles.image}/> 
        </Col> 
        </>
        )  
}    

return (
 <Front/>
)

}

export default LandingPage
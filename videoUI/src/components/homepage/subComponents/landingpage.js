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
        <Col xl = {5} lg = {4} md = {6} className = {`col align-self-center ${styles.columnaz}`}>
                
                <Col xl = {12} className = {styles.container__text}>
            <p className = {styles.text__header}>
              Welcome to Online Video Chatter
            </p>
            <p className = {styles.text__paragraph}>
                Here you can have real-time high-definition video chat for personal use. No email registration or account verification required. Simply create an
                account, search for and follow users, and then make a video-chat request.
            </p> 
                </Col>
                <Col xl = {12} className = {`row justify-content-center align-items-center ${styles.container__signup}`}>
                  <div className = {`${styles.icon__container}`}>
                  <FontAwesomeIcon icon = 'angle-double-down' className = {styles.icon}/>
                  </div>

                  <span className = {styles.icon__text}>get Started</span>
                </Col>     
        </Col>  


        <Col xl = {7} lg = {8} md = {6} className = {` row justify-content-center ${styles.container__column}`}>
          <img src = {landingimage} alt = '' className = {styles.image} />
        </Col> 

        </>
        )  
}    

return (
 <Front/>
)

}

export default LandingPage
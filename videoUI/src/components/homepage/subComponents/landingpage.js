import React, {useState, useEffect} from 'react';
import {Col, Row, Container, Button} from 'react-bootstrap';
import styles from './landingpage.module.scss';
import landingimage from '../../images/frontpg.svg';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import CreateAccountForm from './createaccount';
const LandingPage = (props) => {


let initScroll = () => {
  let target = document.getElementById('form__target');
  console.log(target);
  target.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
}

let Front = () => {

  return(
      <>
        <Col xl = {5} lg = {5} md = {6} sm = {12} className = {`flex-sm-column-reverse flex-xs-column-reverse flex-lg-column align-items-xl-center align-items-lg-center ${styles.columnaz}`}>
                
                <Col xl = {12} sm = {12} className = {`d-flex flex-column align-items-center justify-content-center ${styles.container__text}`}>
            <p className = {styles.text__header}>
               Peer to Peer Video Chat
            </p>
            <p className = {styles.text__paragraph}>
                Here you can have real-time high-definition video chat for personal use. No email registration or account verification required. Simply create an
                account, search for and follow users, and then make a video-chat request.
            </p> 
                </Col>

                <Col xl = {12} sm = {12} className = {`d-flex flex-row justify-content-center ${styles.container__signup}`}>
                  <div id = 'icon__button' onClick = {initScroll} className = {`${styles.icon__container}`}>
                  <FontAwesomeIcon icon = 'angle-double-down' id = "form__target" className = {styles.icon}/>
                  </div>
                </Col>   

        </Col>  


        <Col xl = {7} lg = {7} md = {6} className = {`d-flex justify-content-center align-items-center ${styles.container__column}`}>
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
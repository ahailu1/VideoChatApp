import React, { useState } from 'react';
import AppNavbar from './subComponents/navigation';
import CreateAccountForm from './subComponents/createaccount';
import Createv2 from './subComponents/createv2';
import {Col, Row, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './homepage.module.scss';
import FooterPage from './subComponents/footer';
import LandingPage from './subComponents/landingpage';
import AppFeatures from './subComponents/appfeatures';
let SectionOne = ({handleAuthentication}) => {

    let [loginStatus, setLoginStatus] = useState(false);

    let toggleLogin = () => {
        if(loginStatus === true)  {
            setLoginStatus(false);
        } else {
            setLoginStatus(true)
        }
    }


    let appfeatures = {
        title: 'video chat',
        paragraph: 'Have high-definition video chat with minimal interruption and high-quality sound. Screen and microphone toggle available, allowing you to mute yourself or prevent video sharing. ',
        lg : 4,
        icon: 'video'
    }
    let appfeatures2 = {
        title: 'Follow Friends',
        paragraph: 'Search for users under the search section, follow them and then go to your friends list to make a request.',
        icon: 'user-plus'
    }
    let appfeatures3 = {
        title: 'Android Comptable',
        paragraph: 'Users can videochat with other android devices that use the latest version of google chrome for android',
        icon: 'mobile-alt'
    }
  

    return (
        <Container fluid className = {styles.container__homepage}>
        
        <Row className = {`row justify-content-center ${styles.container__row}`}>
        <LandingPage/>
        </Row>

        <Row className = {`flex-xs-column flex-sm-column flex-md-row-reverse flex-lg-row-reverse flex-xl-row-reverse justify-content-xl-between align-items-xl-start align-items-md-center ${styles.container__forms}`} xl = {12} xs = {12}>
            
        <Col xl = {6} lg = {6} className = {`d-flex flex-column align-items-center justify-content-center align-self-center ${styles.container__introduction}`} md = {12} sm = {12} xs = {12}>
        <h1 className = {styles.page__heading}>How it works</h1>
        <p className = {styles.page__paragraph}> 
        Real-time video chat with custom options to enhance the user experience.
        </p>
        <AppFeatures {...appfeatures} />        
            <AppFeatures {...appfeatures2} activate = {true} />          
            <AppFeatures {...appfeatures3} />     
            </Col>
        <Col xl = {5} lg = {6} md = {12} className = {` d-flex flex-column align-items-center ${styles.account}`}>
            <div className = {`${styles.account__header__container}`}>
            {     
                  loginStatus === true ? <h1 class = {`${styles.account__header} ${loginStatus === false && styles.toggled}`}> Login </h1> :
                    <h1 className = {`${styles.account__header__create}`}>Create Account</h1>
                   
                }
                <h1 className = {`${styles.account__question}`}> {loginStatus === false ? 'Have an Account?' : 'Dont Have an Account?'} <span className = {`${styles.account__question__link}`} onClick = {toggleLogin} >{`${loginStatus === false ? 'Login' : 'Create' }`}</span> </h1>
               </div> 
               <Col xl  = {12}>
               <Createv2 handleAuthentication = { handleAuthentication } loginStatus = {loginStatus} />
               </Col>
            </Col>
        </Row>
       
      
        <Row className = {`row align-items-center ${styles.container__footer}`} xl = {12}>
        <FooterPage />

        </Row>

        </Container>

    )
}
export default SectionOne
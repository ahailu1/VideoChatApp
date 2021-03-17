import React, { useState, useEffect } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styles from './requestnotification.module.scss';
import {Container, Row, Col, Image, Button} from 'react-bootstrap';
import axios from 'axios';
import DisplayProfile from './displayProfile';
import RenderButton from '../utilities/addbutton';
const RequestNotification =  ({userdata, myFollowers, myFollowing, dispatch}) => {

    useEffect (() => {
        fetchRequests(userdata);
    }, []);


    let [getFriendRequests, setFriendRequests] = useState([]);

let fetchRequests = async ({user_id}) => {
    let friendRequests = await axios.get(`${process.env.REACT_APP_SITE_URL}/api/getrequests/${user_id}`);
    let friends = friendRequests.data;
    setFriendRequests(friends);
}

return (
    <Container fluid className = {styles.container}>
    <Row className = {styles.notification__row} noGutters = {true}>
        <Col xl =  {{span:12 , offset: 0}} className = {styles.notification__header}>
            <div className = {styles.notification__header__container}>

            <p className = {styles.page__header}>Notifications</p>
        <FontAwesomeIcon icon = 'cog' className = {styles.page__icon} />        

            </div>

        </Col>
    </Row>
    <Row className = {styles.notification__list} noGutters = {true}>
    <Col xl = {{span: 9, offset: 1}} className = {styles.container__list}>
            {getFriendRequests.length > 0 && getFriendRequests.map(el => {
        if(myFollowers.includes(el.requester_id) && myFollowing.includes(el.requester_id)){
            return <DisplayProfile myFollowers = {myFollowers} myFollowing = {myFollowing} date = {el.creation_date} username = {el.username} user_id = {el.requester_id} userdata = {userdata} render = {() => {
                return <RenderButton userdata = {userdata} user_id = {el.requester_id} callback = {dispatch} callbackData = 'unfollow' loading = {true} text = 'follow back' />
            }}/>  
        } else if (myFollowers.includes(el.requester_id) && !myFollowing.includes(el.requester_id)){
            return <DisplayProfile date = {el.creation_date} username = {el.username} user_id = {el.requester_id} userdata = {userdata} render = {() => {
                return <RenderButton userdata = {userdata} user_id = {el.requester_id} loading = {null} callback = {dispatch} callbackData = 'follow' text = 'follow back' />
            }}/> 
        } else if (!myFollowers.includes(el.requester_id) && myFollowing.includes(el.requester_id)) {
               return null
        } else {
            return null
        }
        
    })}      
        </Col>
    </Row>
  
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className = {styles.svg}>
  <path fill="#272727" d="M44.5,-55C59.1,-50.7,73.3,-39.5,75.4,-26.1C77.5,-12.7,67.4,3,58.4,15.3C49.3,27.6,41.2,36.6,31.6,48C22.1,59.5,11,73.5,-2,76.2C-14.9,78.9,-29.9,70.3,-45,60.6C-60.1,50.9,-75.4,40.2,-81.1,25.6C-86.9,11.1,-83,-7.3,-73.7,-20.1C-64.3,-32.9,-49.4,-40.2,-36.1,-44.9C-22.9,-49.7,-11.5,-52.1,1.7,-54.5C15,-56.9,29.9,-59.3,44.5,-55Z" transform="translate(100 100)" />
</svg>
    </Container>
)

}

export default RequestNotification;
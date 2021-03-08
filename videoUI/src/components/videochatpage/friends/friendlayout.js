import React, { useState, useEffect } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styles from './friendlayout.module.scss';
import {Container, Row, Col, Image, Button, Tabs, Tab} from 'react-bootstrap';
import axios from 'axios';
import DisplayProfile from '../notifications/displayProfile';
import RenderButton from '../utilities/addbutton';

const FriendLayout = ({userdata,myFollowers, myFollowing,dispatch, ...props}) => {

  useEffect(() => {
      fetchFriendsList();
  }, [myFollowers, myFollowing]);
    let [friendsList, setAllFriends] = useState([]);

  let fetchFriendsList = async () => {
    let {user_id} = userdata;
    
    let following = [];
    let followers = [];
    try{
      console.log('trying phaggot')
      let {data} = await axios.get(`${process.env.REACT_APP_SITE_URL}/api/friendinfo/${user_id}`);
      console.log(data);
      setAllFriends(data);
    } catch (err) {
      throw new Error(err)
    }
  }


    return(
        <Container className = {styles.container} fluid>
               <Row>
          <Col xl = {{span: 10, offset: 1}} className = {styles.container__header}>
          <h1>Friends</h1>
          </Col>
      </Row>

      <Row className = {styles.row}>
      <Col xl = {{span: 10, offset: 1}}>
            
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className = {styles.container__tabs} >
  
  <Tab eventKey="home" title="Followers">
    <Row>
<Col xl = {{span: 9, offset: 0}} >
{friendsList.length > 0 && friendsList.map(el => {
        if(el.followers !== null){
          return <DisplayProfile callback = {dispatch} user_id = {el.followers} myFollowing = {myFollowing} myFollowers = {myFollowers} friendsList = {true} username = {el.username} date = {el.creation_date} render = { () => {return null}} />
        }
      })}
</Col>




    </Row>
      
  </Tab>

  <Tab eventKey="profile" title="Following">
    <Row>
      <Col lg = {10} xl = {{span: 10, offset: 0}}>
      {friendsList.length > 0 && friendsList.map(el => {
        if(el.following !== null){
          return <DisplayProfile myFollowers = {myFollowers} myFollowing = {myFollowing} user_id = {el.following} username = {el.username} date = {el.creation_date} render = { () => {
            return <RenderButton userdata = {userdata} user_id = {el.following} callback = {dispatch} callbackData = 'unfollow' loading = {true} />}} friendsList = {true} />
        }
      })}     
      
      </Col>
 

    </Row>


  </Tab>
  </Tabs>
  </Col>

  </Row>
  </Container>
    )

}

export default FriendLayout
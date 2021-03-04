import React, { useState, useEffect } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styles from './displayprofile.module.scss';
import {Container, Row, Col, Image, Button, Dropdown, DropdownButton, ButtonGroup} from 'react-bootstrap';
import axios from 'axios';

let DisplayProfile = ({userdata,user_id,bio,myFollowers, myFollowing,friendsList = false, ...props}) => {

    //fetch followers and following of the user
        useEffect(async () => {
            await fetchFriendsList(user_id);
        }, [myFollowers,myFollowing]);

        let [theseFollowing, setFollowing] = useState([]);
        let [theseFollowers, setFollowers] = useState([]);

        let displayList = (followers, title) => {
            return (
<Dropdown>
         <span className = {styles.friends__heading}>{title}</span>
  <Dropdown.Toggle split variant="success" id="dropdown-split-basic" className = {styles.container__dropdown}>
      {followers.length}
    </Dropdown.Toggle>
  <Dropdown.Menu className = {styles.testingaa}>
      {followers.length > 0 && followers.map(el => {
          return <Dropdown.Item href="#/action-1">{el}</Dropdown.Item>
      })}
  </Dropdown.Menu>
</Dropdown>
            )
        }


    let fetchFriendsList = async (user_id) => {
            try{
                let friendsList = await axios.get(`http://localhost:5000/api/friendslist/${user_id}`);
                let sortList = friendsList.data;    
                console.log(friendsList)
                if(sortList.length > 0){
                    let followers = [];
                    let following = [];
                    let followerCount = 0;
                    let followingCount = 0;
                    sortList.map(el => {
                        
                        if(el.followers !== null){
                        followers.push(el.username);
                        }
                        if(el.following !== null){
                            following.push(el.username);
                        }
                    });
                    setFollowers(followers);
                    setFollowing(following);
                }                

            } catch (err) {
                console.log(err);
            }            
    }
let DisplayNotification = ({username, date, bio}) => {
    let newDate = new Date(date);
    let thisDate = newDate.toLocaleDateString();
    return (
        <>
    <Col className = {styles.mycolumn} lg = {12} xl = {12}>
    
    <Col className = {styles.container__image} lg = {2}>
    <img src = '/test123--profilepicture.jpg' className = {styles.notification__image} alt = 'profile'/>
    </Col>
    
    <Col lg = {5} xl = {{span: 5, offset: 1}}>

        <div className = {styles.columnaz}>
         {displayList(theseFollowers, 'Followers')}
         {displayList(theseFollowing, 'Following')}
        </div>
       
    <Col lg = {12}>
    <span className = {styles.request__header}>{username} </span> 
    {friendsList !== true &&
    <span className = {styles.request__text}>has followed you!</span>
        }
    </Col>

    <Col lg = {12}>
    <span className = {styles.request__date}>{thisDate}</span>
    </Col>  

    <Col lg = {2}>

    {bio}
    </Col>

    </Col>
    
    <Col lg = {{span: 2, offset: 2}}>
    
    {props.render()}


    </Col>
    </Col>  
    </>
    )  
    }   

    return (
        DisplayNotification(props)
    )
}
export default DisplayProfile;
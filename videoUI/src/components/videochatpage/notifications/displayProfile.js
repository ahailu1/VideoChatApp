import React, { useState, useEffect } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styles from './displayprofile.module.scss';
import {Row, Col, Image, Button, Dropdown, DropdownButton, ButtonGroup, Spinner} from 'react-bootstrap';
import axios from 'axios';

let DisplayProfile = ({userdata,user_id,bio,myFollowers, myFollowing,friendsList = false,onlineStatus, ...props}) => {

    //fetch followers and following of the user
        useEffect(async () => {
            await fetchFriendsList(user_id);
        }, [myFollowers,myFollowing]);

        let [theseFollowing, setFollowing] = useState();
        let [theseFollowers, setFollowers] = useState();
                
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
                let {data} = await axios.get(`${process.env.REACT_APP_SITE_URL}/api/friendcount/${user_id}`);
                console.log(data);
                let friendsList = await axios.get(`${process.env.REACT_APP_SITE_URL}/api/friendslist/${user_id}`);
                let sortList = friendsList.data;    
                
                if(data.length > 0){
                    let {followers, following} = data[0];
                    console.log(following + 'hello');
                    setFollowers(followers);
                    setFollowing(following);
                } else {
                    setFollowers(0);
                    setFollowers(0);

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
    
    <Col className = {styles.container__image} lg = {2} xl = {2}>
    
    <div className = {styles.profile__image__container}>

    <img src = '/test123--profilepicture.jpg' className = {styles.profile__image} alt = 'profile'/>    
    <div className = {`${styles.profile__onlinestatus} ${onlineStatus && styles.toggled}`}>
       {onlineStatus === true ? 
        <>
        <Spinner animation = 'grow' variant = 'success' size = 'sm' className = {styles.spinner}/>
        <span className = {`${styles.profile__onlinetext} ${onlineStatus && styles.toggled}`}>online</span>
          </>
           : 
           <>
           <span className = {styles.profile__onlinetext}></span>
           <p className = {styles.profile__onlinetext}>offline</p>
           </>
           }
    </div>
    </div>
    </Col>
    <Col lg = {6} xl = {{span: 7, offset: 0}} md = {7} className = {styles.container__information}>
        
        <Col className = {styles.container__followstatus} lg = {12} xl = {12}>
    
        <Col xl = {2} className = {styles.container__username}>
    <p className = {styles.profile__username}>{username}</p>        
    <p className = {styles.profile__heading}></p>
           </Col>

    <Col className = {styles.container__follow} lg = {4} xl = {5}>
    <p className = {styles.profile__count}>{theseFollowers}</p>        
    <p className = {styles.profile__heading}>Followers</p>
    </Col>
    
    <Col className = {styles.container__follow} lg = {4} xl = {5}>
    <p className = {styles.profile__count}>{theseFollowing}</p>        
    <p className = {styles.profile__heading}>Following</p>
    </Col>

    </Col>

    <Col lg = {12}>
    {friendsList !== true &&
    <>
        <span className = {styles.request__header}>{username} </span> 
    <span className = {styles.request__text}>has followed you!</span>
    </>
        }
    </Col>

    <Col xl = {1} lg = {2}>
    {bio}
    </Col>

    </Col>
    
    <Col className = {styles.column__testing} lg = {2} xl = {2}>  
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
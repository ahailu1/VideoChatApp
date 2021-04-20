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
    <Col className = {styles.mycolumn} lg = {12} xl = {12} md = {12} sm = {12}>
    
    <Col className = {styles.container__image} lg = {2} xl = {2} md = {2} sm = {2} xs = {2}>
    
    <div className = {styles.profile__image__container}>

    <img src = {`/srv/images/${username}--profilepicture.jpg`} className = {styles.profile__image} alt = 'profile'/>    
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

    <Col lg = {6} xl = {{span: 7, offset: 0}} md = {7} sm = {7} className = {`d-flex flex-direction-column align-items-center ${styles.container__information}`} xs = {6}>
        
        <Col  className = {styles.container__username} xl = {3} lg = {3} md = {2} sm = {2}>
    <p className = {styles.profile__username}>{username}</p>        
    <p className = {styles.profile__heading}></p>
           </Col>

    <Col className = {styles.container__follow}xl = {3} lg = {4} md = {5} sm = {4}>
    <p className = {styles.profile__count}>{theseFollowers}</p>        
    <p className = {styles.profile__heading}>Followers</p>
    </Col>
    
    <Col className = {styles.container__follow} xl = {3} lg = {4} md = {5} sm = {4}>
    <p className = {styles.profile__count}>{theseFollowing}</p>        
    <p className = {styles.profile__heading}>Following</p>
    </Col>


    {
    friendsList !== true &&
        <Col lg = {2} xl = {3} classNamae = {`d-flex flex-direction-row`}>

        <span className = {styles.request__header}>{username} </span> 
    <span className = {styles.request__text}>has followed you!</span>
    </Col>
        }

    </Col>
    
    <Col className = {styles.column__testing} lg = {3} xl = {3} md = {3} sm = {3} xs = {2}>  
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
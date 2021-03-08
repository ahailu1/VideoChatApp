import React, {useState, useEffect, useReducer} from 'react';
import {Row,Nav, Col, Container,ListGroup, Collapse, Tab} from 'react-bootstrap';
import VideoUi from './videodesign/myvideo';
import Bio from '../videochatpage/dashboard/bio';
import FriendLayout from './friends/friendlayout';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Profilepicture from './dashboard/profilepicture';
import Userbar from './rightsidebar/userbar';
import Searchbar from './searchbar/search';
import styles from './videochat.module.scss';
import Logout from './dashboard/logout';
import ListBar from './dashboard/listgroup';
import RequestNotification from './notifications/Requestnotification';
const Initvideo = ({userdata,handleLogout, ...props}) => {

useEffect(() => {
  console.log(props);
    fetchFriendsList(userdata);
}, []);



let modifyState = (myFriendsList, action) => {
  console.log([action, myFriendsList]);
  switch(action.type){
    case 'follow' :
      let id = myFriendsList.followers.concat(action.data);
      console.log(id);
      console.log(myFriendsList, action);
      console.log('i am trying to follow');
      return {
        following: myFriendsList.following.concat(action.data),
        followers: myFriendsList.followers
      }
    case 'initFriendsList' : 
    console.log('its working moron');
    console.log(process.env.REACT_APP_SITE_URL + 'IM A PHAGGOT');
    return {
      followers: action.followers,
      following: action.following
    }
    case 'unfollow' : 
    console.log(myFriendsList.following);
    let newList = myFriendsList.following.filter(el => {
      return el !== action.data
    })
    console.log(newList)
    return {
      following: newList,
      followers: myFriendsList.followers
    }
  }
}
let friendsList = {
  following: [],
  followers: []
}
  let [arrow, setArrow] = useState(true);
  let [myFriendsList, dispatch] = useReducer(modifyState, friendsList)
let toggleSidebar = () => {
  setArrow(!arrow);
}

let fetchFriendsList = async ({user_id}) => {
    try {
        let {data} = await axios.get(`${process.env.REACT_APP_SITE_URL}/api/friendsId/${user_id}`);
        let following  = [];
        let followers  = [];
        console.log(data);
        if(data.length > 0) {
          data.forEach(el => {
            if(el.followers !== null){
              followers.push(el.followers);
            }
            if(el.following !== null){
              following.push(el.following)
            }
          });
        }
        console.log([following, followers]);
        dispatch({type: 'initFriendsList', followers:followers, following:following});
    } catch (err) {
      console.log(err);
    }
}

return(
    <Tab.Container defaultActiveKey="#link3" className = {styles.container__alltabs}>

 <Row className = {styles.container__row} noGutters = {true}>
   {console.log(myFriendsList)}
    <Col lg = {arrow ? 2 : 1} className = {styles.container__first}>
  
    
    <Col sm = {2} xs = {4} lg = {12} className = {styles.container__image}>
      {    arrow ? <>
              <Profilepicture userdata = {userdata}/>  
              <Bio userdata = {userdata} />  
              </>
              :  null
      }
    </Col> 
    <Col lg = {12} className = {`${styles.container__icon} ${!arrow && styles.toggled}`} onClick = {toggleSidebar}>
      <div className = {`${styles.icon__div} ${!arrow && styles.toggled}`}>

      {arrow ?   <FontAwesomeIcon icon = 'arrow-left' className = {`${styles.icon} `}/>
:   <FontAwesomeIcon icon = 'arrow-right' className = {`${styles.icon} ${!arrow && styles.toggled}`}/>
}
    </div>

    </Col>

    <Col lg = {12} className = {styles.container__columnaz}>
    <ListBar arrow = {arrow}/>
    </Col>
    <Logout lg = {12} handleLogout = {handleLogout} arrow = {arrow}/>
    </Col>

    <Col className = {styles.container__column__tabcontent} lg = {10}>
    <Tab.Content className = {styles.container__tabcontent}>
        <Tab.Pane eventKey="#link1" className = {styles.container__tabpane}>
         <Row noGutters = {true}>
          <Col lg = {9} className = {styles.container__column__ui}>
          <VideoUi userdata = {userdata}/>
          </Col>
        <Col lg = {3} className = {styles.container__column__userbar}>
  <Userbar/>
        </Col>
        </Row>
        </Tab.Pane>
        
        <Tab.Pane eventKey="#link2" className = {styles.container__tabpane__friends}>
        <FriendLayout userdata = {userdata} myFollowers = {myFriendsList.followers} myFollowing = {myFriendsList.following} dispatch = {dispatch}/>
        </Tab.Pane>

        <Tab.Pane eventKey="#link3" className = {styles.container__tabpane__notifications}>
          <RequestNotification userdata = {userdata} myFollowers = {myFriendsList.followers} myFollowing = {myFriendsList.following} dispatch = {dispatch} />
        </Tab.Pane>

        <Tab.Pane eventKey="#link">
        </Tab.Pane>
        <Tab.Pane eventKey="#search" className = {styles.container__tabpane__search}>
          <Searchbar userdata = {userdata} myFollowers = {myFriendsList.followers} myFollowing = {myFriendsList.following} dispatch = {dispatch} />
        </Tab.Pane>
        </Tab.Content>
    </Col>
    </Row>
    </Tab.Container>
)

}
export default Initvideo;
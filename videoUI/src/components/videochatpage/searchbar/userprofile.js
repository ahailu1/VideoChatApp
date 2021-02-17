import React,{useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styles from './userprofile.module.scss';
import {Container, Row, Col,ListGroup, Image, Button} from 'react-bootstrap';
import axios from 'axios';

const Profile = (props) => {
    
    let [myFollowers, setFollowers] = useState(0);
    let [myFollowing, setFollowing] = useState(0);


    useEffect(() => {
        let tryme = async () => {
                let {followers, following} = await getFollowers();
                setFollowers(followers);
                setFollowing(following)
        }
        tryme();
    }, [])
    
    let getFollowers = async() => {
        let res = await axios.get(`http://localhost:5000/api/friendcount/${props.user_id}`);
        let data = res.data;
        if(data.length === 0){
          let following = 0;
          let followers = 0;
          return {
            followers,
            following
          }
        } else {
          let {friends, followers, following} = data[0];
      
          if(friends === null || friends === 'null'){
            friends = 0;
          }
          if(followers === null || followers === 'null'){
            followers = 0;
          } if (following === null || following === 'null'){
            following = 0;
          }
          followers = parseInt(followers) + parseInt(friends);
          following = parseInt(following) + parseInt(friends);
          return {
            followers,
            following
          }
        }
      };

      let ReturnProfile = React.memo(() => {

        return (
            <Col className = {styles.container__userprofile} lg = {3}>
                   <Col className = {styles.container__image}>
                   <img src = {`/test123--profilepicture.jpg`} alt = "" className = {styles.images}/> 
                   {props.username}
                </Col>
                    <Col lg = {12}>
                        <div className = {styles.container__followers}>
                        <span className = {styles.profile__header}>Followers </span><span className = {styles.profile__text}>{myFollowers} </span>
    
                    <span className = {styles.profile__header}>Following </span><span className = {styles.profile__text}> {myFollowing} </span>
    
                        </div>
                    </Col>
                <Col lg = {12} className = {styles.container__text}>
                    <span className = {styles.profile__text}>{props.friendname}</span>
                </Col>
                
                <Col lg = {12} className = {styles.container__bio}>  
                    { props.bio !== null && <><span className = {styles.profile__header}> Bio:</span> <span  className = {styles.profile__bio}> {props.bio}</span> </> }
                </Col>
    
                <Col lg = {12} className = {styles.container__date}>
                    <span className = {styles.profile__header}>Created</span>
                    <span className = {styles.profile__text}>{props.date}</span>
                </Col>
                
                <Col className = {styles.container__button} lg = {12}>
                    <ListGroup horizontal className = {styles.container__listgroup}>
                    <ListGroup.Item action onClick = {() => {props.addFriend(props.user_id)}} className = {styles.listgroup__item}>
    
                            Follow
                    <FontAwesomeIcon icon = 'plus' className = {styles.icon}></FontAwesomeIcon>
    
                    </ListGroup.Item>
    
                    </ListGroup>
                </Col>
            </Col>
        )
      }
      )


    return (
        <>
        <ReturnProfile/>
        </>
    )
}

export default Profile